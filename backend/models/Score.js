const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: [0, 'Score cannot be negative']
  },
  percentage: {
    type: Number,
    required: [true, 'Percentage is required'],
    min: [0, 'Percentage cannot be negative'],
    max: [100, 'Percentage cannot exceed 100']
  },
  totalQuestions: {
    type: Number,
    required: [true, 'Total questions is required'],
    enum: [20, 50, 80, 120],
    default: 120
  },
  timeTaken: {
    type: Number, // in seconds
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
scoreSchema.index({ timestamp: -1 });
scoreSchema.index({ percentage: -1 });

// Virtual for formatted date
scoreSchema.virtual('formattedDate').get(function() {
  return this.timestamp.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Ensure virtual fields are serialized
scoreSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Score', scoreSchema);