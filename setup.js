#!/usr/bin/env node

/**
 * Conservation Geography Quiz Platform Setup Script
 * 
 * This script helps you set up the entire MERN stack application
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌍 Conservation Geography Quiz Platform Setup');
console.log('='.repeat(50));

// Helper function to run commands
function runCommand(command, description) {
  console.log(`\n📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ Error during ${description}:`, error.message);
    process.exit(1);
  }
}

// Helper function to check if directory exists
function checkDirectory(dir) {
  return fs.existsSync(dir);
}

// Helper function to create directory if it doesn't exist
function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
}

// Main setup function
async function setup() {
  try {
    console.log('\n🔍 Checking project structure...');
    
    // Check if we're in the right directory
    if (!fs.existsSync('package.json')) {
      console.error('❌ package.json not found. Please run this script from the project root.');
      process.exit(1);
    }
    
    // Install root dependencies
    runCommand('npm install', 'Installing root dependencies');
    
    // Setup backend
    if (checkDirectory('backend')) {
      console.log('\n🔧 Setting up backend...');
      process.chdir('backend');
      runCommand('npm install', 'Installing backend dependencies');
      process.chdir('..');
    } else {
      console.error('❌ Backend directory not found');
      process.exit(1);
    }
    
    // Setup frontend
    if (checkDirectory('frontend')) {
      console.log('\n⚛️  Setting up frontend...');
      process.chdir('frontend');
      runCommand('npm install', 'Installing frontend dependencies');
      process.chdir('..');
    } else {
      console.error('❌ Frontend directory not found');
      process.exit(1);
    }
    
    // Check MongoDB connection
    console.log('\n🗄️  Database Setup');
    console.log('Please ensure MongoDB is installed and running:');
    console.log('- Local MongoDB: mongodb://localhost:27017');
    console.log('- Or update MONGODB_URI in backend/.env for MongoDB Atlas');
    
    // Check questions file
    console.log('\n📚 Questions Setup');
    if (fs.existsSync('questions.json')) {
      const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
      console.log(`✅ Found ${questions.length} questions in questions.json`);
      
      if (questions.length < 120) {
        console.log('⚠️  You have fewer than 120 questions. Please add more questions to reach the target of 120.');
      }
    } else {
      console.log('⚠️  questions.json not found. Please extract questions from your PDF.');
      console.log('   Run: node extract-questions.js (after creating pdf-content.txt)');
    }
    
    console.log('\n🎉 Setup completed successfully!');
    console.log('\n🚀 To start the application:');
    console.log('   npm run dev    (starts both backend and frontend)');
    console.log('   OR');
    console.log('   npm run server (backend only - port 5000)');
    console.log('   npm run client (frontend only - port 3000)');
    
    console.log('\n📖 Next steps:');
    console.log('1. Ensure MongoDB is running');
    console.log('2. Extract your 120 questions from the PDF');
    console.log('3. Update questions.json with all questions');
    console.log('4. Run npm run dev to start the application');
    console.log('5. Open http://localhost:3000 in your browser');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup
setup();