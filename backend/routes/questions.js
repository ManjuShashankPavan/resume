import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

router.get('/:level', async (req, res) => {
  try {
    const { level } = req.params;
    const limit = parseInt(req.query.limit) || 25;

    if (!['basic', 'intermediate', 'advanced'].includes(level)) {
      return res.status(400).json({ error: 'Invalid level specified' });
    }

    const questions = await Question.aggregate([
      { $match: { level } },
      { $sample: { size: limit } },
      { $project: { _id: 0, __v: 0 } }
    ]);

    res.json(questions);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;