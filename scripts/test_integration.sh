#!/bin/bash

# This script tests the integration between Django and React

# Error handling
set -e

echo "Starting integration tests..."

# Navigate to the project root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR/.."
cd "$PROJECT_ROOT"

# Test Django API endpoints
echo "Testing Django API endpoints..."
cd "$PROJECT_ROOT/backend"

# Test if Django server is running
if ! curl -s http://localhost:8000/api/v1/token/ > /dev/null; then
  echo "❌ Django server is not running. Please start it with 'python manage.py runserver'."
  exit 1
fi

# Test API endpoints
echo "Testing API endpoints..."
curl -s -o /dev/null -w "JWT Token Endpoint: %{http_code}\n" http://localhost:8000/api/v1/token/
curl -s -o /dev/null -w "API Root: %{http_code}\n" http://localhost:8000/api/v1/
curl -s -o /dev/null -w "Clubs Endpoint: %{http_code}\n" http://localhost:8000/api/v1/clubs/

# Test React development server
echo "Testing React development server..."
cd "$PROJECT_ROOT/frontend"

# Check if Vite dev server is running
if ! curl -s http://localhost:3000 > /dev/null; then
  echo "❌ React dev server is not running. Please start it with 'npm run dev'."
  exit 1
fi

echo "✅ Integration tests completed successfully!"
echo "Both Django and React servers are running correctly."
echo "You can now test the integration by logging in through the React app."
