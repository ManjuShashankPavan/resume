import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import questionRoutes from './routes/questions.js';

// Configuration
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ Connection Error:', err.message);
    process.exit(1);
  }
};
await connectDB();

// Routes
app.use('/api/questions', questionRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});