const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// @route   POST /api/scores
// @desc    Save a new quiz score
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, score, percentage, timeTaken, totalQuestions } = req.body;

    // Validation
    if (!name || score === undefined || percentage === undefined || !totalQuestions) {
      return res.status(400).json({
        message: 'Name, score, percentage, and totalQuestions are required'
      });
    }

    // Validate totalQuestions
    const validQuestionCounts = [20, 50, 80, 120];
    if (!validQuestionCounts.includes(totalQuestions)) {
      return res.status(400).json({
        message: 'Total questions must be one of: 20, 50, 80, 120'
      });
    }

    if (score < 0 || score > totalQuestions) {
      return res.status(400).json({
        message: `Score must be between 0 and ${totalQuestions}`
      });
    }

    if (percentage < 0 || percentage > 100) {
      return res.status(400).json({
        message: 'Percentage must be between 0 and 100'
      });
    }

    // Create new score record
    const newScore = new Score({
      name: name.trim(),
      score,
      percentage,
      timeTaken: timeTaken || 0,
      totalQuestions
    });

    const savedScore = await newScore.save();

    res.status(201).json({
      message: 'Score saved successfully',
      data: savedScore
    });

  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({
      message: 'Error saving score',
      error: error.message
    });
  }
});

// @route   GET /api/scores
// @desc    Get all quiz scores with pagination and sorting
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'timestamp';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder;

    // Get scores with pagination
    const scores = await Score.find()
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-__v');

    // Get total count for pagination
    const totalScores = await Score.countDocuments();
    const totalPages = Math.ceil(totalScores / limit);

    // Calculate statistics
    const stats = await Score.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: '$score' },
          averagePercentage: { $avg: '$percentage' },
          highestScore: { $max: '$score' },
          lowestScore: { $min: '$score' },
          totalAttempts: { $sum: 1 }
        }
      }
    ]);

    res.json({
      message: 'Scores retrieved successfully',
      data: {
        scores,
        pagination: {
          currentPage: page,
          totalPages,
          totalScores,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        statistics: stats[0] || {
          averageScore: 0,
          averagePercentage: 0,
          highestScore: 0,
          lowestScore: 0,
          totalAttempts: 0
        }
      }
    });

  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({
      message: 'Error fetching scores',
      error: error.message
    });
  }
});

// @route   GET /api/scores/leaderboard
// @desc    Get top 10 scores for leaderboard
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const topScores = await Score.find()
      .sort({ percentage: -1, score: -1, timestamp: 1 })
      .limit(10)
      .select('name score percentage timestamp -_id');

    res.json({
      message: 'Leaderboard retrieved successfully',
      data: topScores
    });

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      message: 'Error fetching leaderboard',
      error: error.message
    });
  }
});

// @route   DELETE /api/scores/:id
// @desc    Delete a specific score (optional admin feature)
// @access  Public (in production, this should be protected)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedScore = await Score.findByIdAndDelete(id);

    if (!deletedScore) {
      return res.status(404).json({
        message: 'Score not found'
      });
    }

    res.json({
      message: 'Score deleted successfully',
      data: deletedScore
    });

  } catch (error) {
    console.error('Error deleting score:', error);
    res.status(500).json({
      message: 'Error deleting score',
      error: error.message
    });
  }
});

module.exports = router;