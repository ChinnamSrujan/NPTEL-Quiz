#!/bin/bash
set -e

echo "Building Conservation Geography Quiz Frontend..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building React app..."
npm run build

# Copy build to public directory at root for Render to find
echo "Preparing for deployment..."
cd ..
mkdir -p public
cp -r frontend/build/* public/

echo "Build complete! Frontend ready for deployment."

