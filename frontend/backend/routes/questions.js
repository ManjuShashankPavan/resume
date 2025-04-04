import express from 'express';
import { 
  BasicQuestion, 
  IntermediateQuestion, 
  AdvancedQuestion 
} from '../models/Question.js';

const router = express.Router();

const getRandomQuestions = async (model, limit) => {
  try {
    console.log(`Attempting to fetch ${limit} questions from ${model.collection.name}`);
    
    const result = await model.aggregate([
      { $unwind: "$questions" },
      { $sample: { size: limit } },
      { $project: {
          _id: 0,
          id: "$questions.id",
          question: "$questions.question",
          options: "$questions.options",
          answer: "$questions.answer"
        }
      }
    ]);

    console.log(`Found ${result.length} questions in ${model.collection.name}`);
    return result;
  } catch (error) {
    console.error(`Error fetching from ${model.collection.name}:`, error);
    return [];
  }
};

router.get('/:level', async (req, res) => {
  try {
    const level = req.params.level.toLowerCase();
    const limit = parseInt(req.query.limit) || 10;

    console.log(`\n=== New Request: ${level.toUpperCase()} ===`);
    console.log(`Requested level: ${level}`);
    console.log(`Requested limit: ${limit}`);

    let model;
    switch(level) {
      case 'basic': 
        model = BasicQuestion;
        break;
      case 'intermediate': 
        model = IntermediateQuestion;
        break;
      case 'advanced': 
        model = AdvancedQuestion;
        break;
      default:
        console.error(`Invalid level requested: ${level}`);
        return res.status(400).json({ 
          error: 'Invalid level specified',
          validLevels: ['basic', 'intermediate', 'advanced']
        });
    }

    // Debug: Check collection exists
    const collections = await model.db.db.listCollections({ name: model.collection.name }).toArray();
    if (collections.length === 0) {
      console.error(`Collection ${model.collection.name} does not exist`);
      return res.status(404).json({
        error: 'Collection not found',
        collection: model.collection.name,
        suggestion: '1. Check collection name spelling\n2. Verify database connection'
      });
    }

    // Debug: Check document count
    const docCount = await model.countDocuments({});
    console.log(`Found ${docCount} documents in ${model.collection.name}`);

    // Debug: Check sample document structure
    if (docCount > 0) {
      const sampleDoc = await model.findOne();~
      console.log('Sample document structure:', {
        hasQuestionsArray: Array.isArray(sampleDoc?.questions),
        questionsCount: sampleDoc?.questions?.length || 0
      });
    }

    const questions = await getRandomQuestions(model, limit);
    
    if (questions.length === 0) {
      console.error('No questions found after aggregation');
      const sampleAggregation = await model.aggregate([
        { $unwind: "$questions" },
        { $limit: 1 }
      ]);
      console.log('Sample aggregation result:', sampleAggregation);
      
      return res.status(404).json({
        error: 'No questions found',
        collection: model.collection.name,
        documentCount: docCount,
        hasQuestionsArray: docCount > 0 ? Array.isArray((await model.findOne()).questions) : false,
        sampleAggregationResult: sampleAggregation,
        suggestion: 'Check if documents have valid "questions" array with question objects'
      });
    }

    console.log(`Successfully returning ${questions.length} questions`);
    res.json(questions);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

export default router;