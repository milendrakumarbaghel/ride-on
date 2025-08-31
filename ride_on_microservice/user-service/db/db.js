import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/ride_on_micro';

export async function connectToDatabase() {
    const options = { connectTimeoutMS: 10000, retryWrites: true };
    try {
        await mongoose.connect(MONGODB_URL, options);
        console.log('✅ [user-service] connected to MongoDB');
    } catch (err) {
        console.error('❌ [user-service] MongoDB error:', err.message);
        setTimeout(connectToDatabase, 5000);
    }
}

export default mongoose;
