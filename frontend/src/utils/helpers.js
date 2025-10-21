/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Format time in seconds to readable format
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
};

/**
 * Calculate percentage with specified decimal places
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {number} - Percentage
 */
export const calculatePercentage = (value, total, decimals = 0) => {
  if (total === 0) return 0;
  return Number(((value / total) * 100).toFixed(decimals));
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate quiz answer format
 * @param {string} answer - Answer to validate
 * @returns {boolean} - Is valid answer
 */
export const isValidAnswer = (answer) => {
  return typeof answer === 'string' && answer.trim().length > 0;
};

/**
 * Generate a random ID
 * @returns {string} - Random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Sanitize user input
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Check if device is mobile
 * @returns {boolean} - Is mobile device
 */
export const isMobile = () => {
  return window.innerWidth <= 768;
};

/**
 * Get grade based on percentage
 * @param {number} percentage - Score percentage
 * @returns {Object} - Grade object with letter and description
 */
export const getGrade = (percentage) => {
  if (percentage >= 90) return { letter: 'A+', description: 'Outstanding' };
  if (percentage >= 85) return { letter: 'A', description: 'Excellent' };
  if (percentage >= 80) return { letter: 'A-', description: 'Very Good' };
  if (percentage >= 75) return { letter: 'B+', description: 'Good' };
  if (percentage >= 70) return { letter: 'B', description: 'Above Average' };
  if (percentage >= 65) return { letter: 'B-', description: 'Average' };
  if (percentage >= 60) return { letter: 'C+', description: 'Below Average' };
  if (percentage >= 55) return { letter: 'C', description: 'Poor' };
  if (percentage >= 50) return { letter: 'C-', description: 'Very Poor' };
  return { letter: 'F', description: 'Fail' };
};

/**
 * Local storage helpers with error handling
 */
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }
};

/**
 * Session storage helpers
 */
export const sessionStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to sessionStorage:', error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
      return false;
    }
  }
};