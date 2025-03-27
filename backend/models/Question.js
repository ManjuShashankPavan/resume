import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questions: [{
    id: Number,
    question: String,
    options: [String],
    answer: String
  }]
}, { timestamps: true });

export const BasicQuestion = mongoose.model('BasicQuestion', questionSchema, 'basic_aptitude');
export const IntermediateQuestion = mongoose.model('IntermediateQuestion', questionSchema, 'intermediate_aptitude ');
export const AdvancedQuestion = mongoose.model('AdvancedQuestion', questionSchema, 'advanced_aptitude');