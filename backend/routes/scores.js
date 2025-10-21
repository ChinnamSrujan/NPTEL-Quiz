const express = require('express');
const router = express.Router();

// In-memory storage for scores (no database needed)
let scores = [];

// @route   POST /api/scores
// @desc    Save a new quiz score
// @access  Public
router.post('/', (req, res) => {
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
    const newScore = {
      id: Date.now().toString(),
      name: name.trim(),
      score,
      percentage,
      timeTaken: timeTaken || 0,
      totalQuestions,
      timestamp: new Date()
    };

    scores.push(newScore);

    res.status(201).json({
      message: 'Score saved successfully',
      data: newScore
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
router.get('/', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'timestamp';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    // Sort scores
    let sortedScores = [...scores];
    sortedScores.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === 'timestamp') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      return sortOrder === 1 ? aVal - bVal : bVal - aVal;
    });

    // Get paginated scores
    const paginatedScores = sortedScores.slice(skip, skip + limit);
    const totalScores = scores.length;
    const totalPages = Math.ceil(totalScores / limit);

    // Calculate statistics
    const stats = scores.length > 0 ? {
      averageScore: (scores.reduce((sum, s) => sum + s.score, 0) / scores.length).toFixed(2),
      averagePercentage: (scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length).toFixed(2),
      highestScore: Math.max(...scores.map(s => s.score)),
      lowestScore: Math.min(...scores.map(s => s.score)),
      totalAttempts: scores.length
    } : {
      averageScore: 0,
      averagePercentage: 0,
      highestScore: 0,
      lowestScore: 0,
      totalAttempts: 0
    };

    res.json({
      message: 'Scores retrieved successfully',
      data: {
        scores: paginatedScores,
        pagination: {
          currentPage: page,
          totalPages,
          totalScores,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        statistics: stats
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
router.get('/leaderboard', (req, res) => {
  try {
    const topScores = [...scores]
      .sort((a, b) => {
        if (b.percentage !== a.percentage) {
          return b.percentage - a.percentage;
        }
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return new Date(a.timestamp) - new Date(b.timestamp);
      })
      .slice(0, 10)
      .map(s => ({
        name: s.name,
        score: s.score,
        percentage: s.percentage,
        timestamp: s.timestamp
      }));

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
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const scoreIndex = scores.findIndex(s => s.id === id);

    if (scoreIndex === -1) {
      return res.status(404).json({
        message: 'Score not found'
      });
    }

    const deletedScore = scores.splice(scoreIndex, 1)[0];

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