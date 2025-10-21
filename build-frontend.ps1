# Build script for frontend
Write-Host "Building Conservation Geography Quiz Frontend..."

# Navigate to frontend directory
Set-Location frontend

# Install dependencies
Write-Host "Installing dependencies..."
npm install

# Build the project
Write-Host "Building React app..."
npm run build

# Copy build to public directory at root for Render to find
Write-Host "Preparing for deployment..."
Set-Location ..
if (-not (Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" | Out-Null
}
Copy-Item -Path "frontend/build/*" -Destination "public/" -Recurse -Force

Write-Host "Build complete! Frontend ready for deployment."

