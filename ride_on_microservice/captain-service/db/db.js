// db/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const options = {
  connectTimeoutMS: 10000,
  retryWrites: true,
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL, options);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectToDatabase, 5000);
  }
};

export default connectToDatabase;
