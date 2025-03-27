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

// Enhanced Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aptitude_q', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected');
    
    // Verify collections exist
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};
await connectDB();

// Routes
app.use('/api/questions', questionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Try these endpoints:
  - Basic: http://localhost:${PORT}/api/questions/basic
  - Intermediate: http://localhost:${PORT}/api/questions/intermediate
  - Advanced: http://localhost:${PORT}/api/questions/advanced`);
});