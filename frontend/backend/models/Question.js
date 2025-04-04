import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questions: [{
    id: { 
      type: Number, 
      required: true,
      unique: true 
    },
    question: { 
      type: String, 
      required: true,
      trim: true
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function(opts) {
          // Ensure at least 2 options and no empty strings
          return opts.length >= 2 && !opts.some(opt => opt.trim() === '');
        },
        message: 'Each question must have at least 2 non-empty options'
      }
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function(answer) {
          return this.options.includes(answer);
        },
        message: 'Answer must exactly match one of the options'
      }
    }
  }]
}, { timestamps: true });

// Create index for better performance
questionSchema.index({ 'questions.id': 1 }, { unique: true });

export const BasicQuestion = mongoose.model('BasicQuestion', questionSchema, 'basic_aptitude');
export const IntermediateQuestion = mongoose.model('IntermediateQuestion', questionSchema, 'intermediate_aptitude ');
export const AdvancedQuestion = mongoose.model('AdvancedQuestion', questionSchema, 'advanced_aptitude');