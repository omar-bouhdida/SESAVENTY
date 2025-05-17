#!/bin/bash

# This script builds the React frontend and copies the build files to Django's static directory

# Error handling
set -e

echo "Starting the build and deploy process..."

# Navigate to the project root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR/.."
cd "$PROJECT_ROOT"

# Build the frontend
echo "Building React frontend..."
cd frontend
npm run build

# Check if the build was successful
if [ ! -d "dist" ]; then
  echo "Build failed! The dist directory doesn't exist."
  exit 1
fi

# Ensure Django static directory exists
echo "Creating Django static directories if they don't exist..."
DJANGO_STATIC_DIR="$PROJECT_ROOT/backend/static"
mkdir -p "$DJANGO_STATIC_DIR"

# Copy the React build files to Django static directory
echo "Copying React build files to Django static..."
cp -r dist/* "$DJANGO_STATIC_DIR/"

# Collect static files
echo "Collecting static files for Django..."
cd "$PROJECT_ROOT/backend"
python manage.py collectstatic --noinput

echo "🎉 Deployment completed successfully!"
echo "You can now run the Django server with: python manage.py runserver"
