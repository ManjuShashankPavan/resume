import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['basic', 'intermediate', 'advanced'],
    required: true,
    lowercase: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: options => options.length === 4,
      message: 'Must provide exactly 4 options'
    }
  },
  answer: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);