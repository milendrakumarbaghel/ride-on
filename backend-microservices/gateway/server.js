const express = require('express');
const expressProxy = require('express-http-proxy');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use('/users', expressProxy('http://localhost:3001'));
app.use('/captains', expressProxy('http://localhost:3002'));

app.listen(process.env.PORT, () => {
  console.log(`Gateway service listening on port ${process.env.PORT}`);
});

module.exports = app;
