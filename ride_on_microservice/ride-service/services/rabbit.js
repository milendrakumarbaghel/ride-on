import amqp from 'amqplib';

const DEFAULT_URL = 'amqp://localhost';

function withParams(urlString) {
    try {
        const u = new URL(urlString);
        if (!u.searchParams.has('heartbeat')) u.searchParams.set('heartbeat', '60');
        return u.toString();
    } catch {
        return urlString;
    }
}

function getRabbitUrl() {
    const raw = process.env.RABBIT_URL || DEFAULT_URL;
    return withParams(raw);
}

let connection;
let channel;
let connecting = false;
let retryDelayMs = 2000; // backoff up to ~30s

async function createConnection() {
    const url = getRabbitUrl();
    try {
        const safe = (() => { try { const u = new URL(url); if (u.password) u.password = '***'; return u.toString(); } catch { return 'amqp(s)://<redacted>'; } })();
        console.log('RabbitMQ connecting to', safe);
    } catch { /* ignore */ }
    let socketOptions = {};
    try {
        const u = new URL(url);
        if (u.protocol === 'amqps:') {
            socketOptions = { servername: u.hostname };
            if (process.env.RABBIT_TLS_INSECURE === 'true') {
                socketOptions.rejectUnauthorized = false;
            }
        }
    } catch { /* ignore */ }
    const conn = await amqp.connect(url, socketOptions);
    conn.on('error', (err) => {
        console.error('RabbitMQ connection error:', err.message);
    });
    conn.on('close', () => {
        console.warn('RabbitMQ connection closed. Will retry...');
        channel = undefined;
        connection = undefined;
        scheduleReconnect();
    });
    return conn;
}

async function createChannel(conn) {
    const ch = await conn.createChannel();
    ch.on('error', (err) => console.error('RabbitMQ channel error:', err.message));
    ch.on('close', () => {
        console.warn('RabbitMQ channel closed. Will retry...');
        channel = undefined;
        scheduleReconnect();
    });
    try { await ch.prefetch(1); } catch { /* ignore */ }
    return ch;
}

function scheduleReconnect() {
    if (connecting) return;
    setTimeout(() => {
        connect().catch(() => { /* already logged */ });
    }, retryDelayMs);
    retryDelayMs = Math.min(retryDelayMs * 2, 30000);
}

export async function connect() {
    if (channel) return channel;
    if (connecting) {
        await new Promise((r) => setTimeout(r, 250));
        if (channel) return channel;
    }
    connecting = true;
    try {
        connection = await createConnection();
        channel = await createChannel(connection);
        retryDelayMs = 2000;
        console.log('Connected to RabbitMQ');
        return channel;
    } catch (err) {
        console.error('RabbitMQ connect failed:', err.message);
        scheduleReconnect();
        throw err;
    } finally {
        connecting = false;
    }
}

export async function subscribeToQueue(queueName, callback) {
    const ch = channel || await connect();
    await ch.assertQueue(queueName, { durable: true });
    ch.consume(queueName, (message) => {
        if (!message) return;
        try {
            callback(message.content.toString());
        } catch (err) {
            console.error('Error in queue callback:', err);
        } finally {
            try { ch.ack(message); } catch { /* ignore */ }
        }
    });
}

export async function publishToQueue(queueName, data) {
    const ch = channel || await connect();
    await ch.assertQueue(queueName, { durable: true });
    const payload = Buffer.isBuffer(data) ? data : Buffer.from(typeof data === 'string' ? data : JSON.stringify(data));
    const ok = ch.sendToQueue(queueName, payload, { persistent: true });
    if (!ok) await new Promise((r) => ch.once('drain', r));
}

const rabbit = { connect, subscribeToQueue, publishToQueue };
export default rabbit;
