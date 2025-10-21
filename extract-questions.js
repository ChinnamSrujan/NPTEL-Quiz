/**
 * PDF Question Extraction Helper Script
 * 
 * This script helps you extract questions from your PDF and format them for the quiz.
 * 
 * Instructions:
 * 1. First, convert your PDF to text using an online tool or PDF reader
 * 2. Copy the text content and paste it into a file called 'pdf-content.txt'
 * 3. Run this script: node extract-questions.js
 * 4. The script will generate a properly formatted questions.json file
 */

const fs = require('fs');
const path = require('path');

// Function to parse questions from text content
function parseQuestions(textContent) {
  const questions = [];
  let currentId = 1;
  
  // Split content by question numbers or patterns
  // This is a basic parser - you may need to adjust based on your PDF format
  const lines = textContent.split('\n').filter(line => line.trim());
  
  let currentQuestion = null;
  let options = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Check if line starts with a number (potential question)
    if (/^\d+\./.test(line)) {
      // Save previous question if exists
      if (currentQuestion && options.length === 4) {
        questions.push({
          id: currentId++,
          question: currentQuestion,
          options: [...options],
          answer: findCorrectAnswer(options)
        });
      }
      
      // Start new question
      currentQuestion = line.replace(/^\d+\.\s*/, '');
      options = [];
    }
    // Check if line is an option (a), b), c), d) or A), B), C), D))
    else if (/^[a-dA-D]\)/.test(line)) {
      const option = line.replace(/^[a-dA-D]\)\s*/, '');
      options.push(option);
    }
    // If not an option marker, might be continuation of question or option
    else if (currentQuestion && options.length < 4) {
      if (options.length === 0) {
        // Continuation of question
        currentQuestion += ' ' + line;
      } else {
        // Continuation of last option
        options[options.length - 1] += ' ' + line;
      }
    }
  }
  
  // Don't forget the last question
  if (currentQuestion && options.length === 4) {
    questions.push({
      id: currentId++,
      question: currentQuestion,
      options: [...options],
      answer: findCorrectAnswer(options)
    });
  }
  
  return questions;
}

// Function to find correct answer (looks for bold text indicators)
function findCorrectAnswer(options) {
  // Look for bold indicators like **text** or *text* or text in bold
  for (const option of options) {
    // Check for common bold indicators
    if (option.includes('**') || option.includes('*') || 
        option.toUpperCase() === option || 
        option.includes('<b>') || option.includes('<strong>')) {
      return option.replace(/\*\*|\*|<\/?b>|<\/?strong>/g, '').trim();
    }
  }
  
  // If no bold indicator found, return first option as default
  // You'll need to manually verify these
  console.warn(`Could not determine correct answer for options: ${options.join(', ')}`);
  return options[0];
}

// Main execution
function main() {
  try {
    // Check if PDF content file exists
    const pdfContentPath = 'pdf-content.txt';
    
    if (!fs.existsSync(pdfContentPath)) {
      console.log('📄 PDF Content File Not Found');
      console.log('Please create a file called "pdf-content.txt" with your PDF text content.');
      console.log('');
      console.log('Steps to extract PDF content:');
      console.log('1. Open your PDF file');
      console.log('2. Select all text (Ctrl+A) and copy (Ctrl+C)');
      console.log('3. Create a new file called "pdf-content.txt"');
      console.log('4. Paste the content and save');
      console.log('5. Run this script again: node extract-questions.js');
      return;
    }
    
    // Read PDF content
    const textContent = fs.readFileSync(pdfContentPath, 'utf8');
    console.log('📖 Reading PDF content...');
    
    // Parse questions
    const questions = parseQuestions(textContent);
    console.log(`✅ Extracted ${questions.length} questions`);
    
    if (questions.length === 0) {
      console.log('❌ No questions found. Please check your PDF content format.');
      return;
    }
    
    // Save to questions.json
    const questionsPath = 'questions.json';
    fs.writeFileSync(questionsPath, JSON.stringify(questions, null, 2));
    console.log(`💾 Saved questions to ${questionsPath}`);
    
    // Also save to frontend data directory
    const frontendQuestionsPath = path.join('frontend', 'src', 'data', 'questions.json');
    if (fs.existsSync(path.dirname(frontendQuestionsPath))) {
      fs.writeFileSync(frontendQuestionsPath, JSON.stringify(questions, null, 2));
      console.log(`💾 Also saved to ${frontendQuestionsPath}`);
    }
    
    console.log('');
    console.log('🎉 Questions extracted successfully!');
    console.log('⚠️  Please review the questions.json file to ensure:');
    console.log('   - All questions are properly formatted');
    console.log('   - Correct answers are properly identified');
    console.log('   - All 120 questions are present');
    
  } catch (error) {
    console.error('❌ Error extracting questions:', error.message);
  }
}

// Run the script
main();