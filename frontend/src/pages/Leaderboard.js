import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getScores } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [selectedQuizType, setSelectedQuizType] = useState('all');

  useEffect(() => {
    fetchScores(currentPage);
  }, [currentPage]);

  const fetchScores = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getScores(page, 10, 'percentage', 'desc');
      setScores(response.data.scores);
      setStatistics(response.data.statistics);
      setPagination(response.data.pagination);
      setError('');
    } catch (err) {
      setError('Failed to load leaderboard. Please try again.');
      console.error('Error fetching scores:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getPerformanceBadge = (percentage) => {
    if (percentage >= 90) return { text: 'Excellent', color: 'bg-yellow-100 text-yellow-800' };
    if (percentage >= 80) return { text: 'Great', color: 'bg-green-100 text-green-800' };
    if (percentage >= 70) return { text: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (percentage >= 60) return { text: 'Fair', color: 'bg-purple-100 text-purple-800' };
    return { text: 'Needs Work', color: 'bg-gray-100 text-gray-800' };
  };

  if (loading && scores.length === 0) {
    return <LoadingSpinner size="xl" text="Loading leaderboard..." />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
          <span className="text-2xl">🏆</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">Top performers in Conservation Geography</p>
        
        {/* Quiz Type Filter */}
        <div className="mt-6 flex justify-center">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedQuizType('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedQuizType === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Quizzes
            </button>
            <button
              onClick={() => setSelectedQuizType('20')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedQuizType === '20'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🚀 Quick (20)
            </button>
            <button
              onClick={() => setSelectedQuizType('50')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedQuizType === '50'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📚 Standard (50)
            </button>
            <button
              onClick={() => setSelectedQuizType('80')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedQuizType === '80'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🎯 Extended (80)
            </button>
            <button
              onClick={() => setSelectedQuizType('120')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedQuizType === '120'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏆 Complete (120)
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-primary-600">{statistics.totalAttempts}</div>
            <div className="text-sm text-gray-600">Total Attempts</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-success-600">{Math.round(statistics.averagePercentage)}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{statistics.highestScore}</div>
            <div className="text-sm text-gray-600">Highest Score</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{Math.round(statistics.averageScore)}</div>
            <div className="text-sm text-gray-600">Avg Correct</div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="card p-6 mb-8 border-l-4 border-danger-500 bg-danger-50">
          <p className="text-danger-700">{error}</p>
          <button 
            onClick={() => fetchScores(currentPage)}
            className="btn-primary mt-4"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Leaderboard Table */}
      {scores.length > 0 ? (
        <div className="card overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quiz Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scores
                  .filter(score => selectedQuizType === 'all' || score.totalQuestions.toString() === selectedQuizType)
                  .map((score, index) => {
                    const rank = (currentPage - 1) * 10 + index + 1;
                    const badge = getPerformanceBadge(score.percentage);
                    
                    return (
                      <tr key={score._id} className={rank <= 3 ? 'bg-yellow-50' : 'hover:bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-lg font-medium">
                              {getRankIcon(rank)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {score.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-xs">
                            {score.totalQuestions === 20 && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                🚀 Quick
                              </span>
                            )}
                            {score.totalQuestions === 50 && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                📚 Standard
                              </span>
                            )}
                            {score.totalQuestions === 80 && (
                              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                                🎯 Extended
                              </span>
                            )}
                            {score.totalQuestions === 120 && (
                              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                                🏆 Complete
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {score.score}/{score.totalQuestions}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {score.percentage}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badge.color}`}>
                            {badge.text}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {score.formattedDate}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing page {pagination.currentPage} of {pagination.totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={!pagination.hasPrevPage}
                    className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={!pagination.hasNextPage}
                    className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : !loading && (
        <div className="card p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Scores Yet</h3>
          <p className="text-gray-600 mb-6">Be the first to take the quiz and appear on the leaderboard!</p>
          <Link to="/quiz" className="btn-primary">
            Take Quiz Now
          </Link>
        </div>
      )}

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <Link
          to="/quiz"
          className="btn-primary px-8 py-3 mr-4"
        >
          <span className="mr-2">🚀</span>
          Take Quiz
        </Link>
        <Link
          to="/"
          className="btn-secondary px-8 py-3"
        >
          <span className="mr-2">🏠</span>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Leaderboard;