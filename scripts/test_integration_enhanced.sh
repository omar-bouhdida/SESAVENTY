#!/bin/bash

# Enhanced Integration Test Script for SESAVENTY
# This script tests the integration between frontend and backend
# focusing specifically on the registration functionality

echo "🔍 Starting Enhanced Integration Test for SESAVENTY..."

# Check if backend is running
echo "Checking if Django backend is running..."
if ! curl -s http://localhost:8000/api/v1/token/ > /dev/null; then
  echo "⚠️ Backend is not running! Starting Django server..."
  # Change to backend directory
  cd "$(dirname "$0")/../backend" || { echo "Failed to navigate to backend directory"; exit 1; }
  
  # Check for virtual environment
  if [ -d "venv" ]; then
    echo "Activating virtual environment..."
    source venv/bin/activate || { echo "Failed to activate venv"; exit 1; }
  fi
  
  # Run Django in background
  echo "Starting Django server in background..."
  python manage.py runserver > django.log 2>&1 &
  DJANGO_PID=$!
  
  # Wait for server to start
  echo "Waiting for server to start..."
  for i in {1..10}; do
    if curl -s http://localhost:8000/api/v1/token/ > /dev/null; then
      echo "✅ Django server started successfully."
      break
    fi
    if [ $i -eq 10 ]; then
      echo "❌ Failed to start Django server. Check django.log for details."
      exit 1
    fi
    sleep 2
  done
  
  echo "Django server running with PID: $DJANGO_PID"
else
  echo "✅ Django backend is already running."
fi

# Check if frontend is running
echo "Checking if React frontend is running..."
if ! curl -s http://localhost:5173 > /dev/null; then
  echo "⚠️ Frontend is not running! Starting Vite dev server..."
  # Change to frontend directory
  cd "$(dirname "$0")/../frontend" || { echo "Failed to navigate to frontend directory"; exit 1; }
  
  # Check if npm is installed
  if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
  fi
  
  # Run frontend in background
  echo "Starting Vite dev server in background..."
  npm run dev > vite.log 2>&1 &
  VITE_PID=$!
  
  # Wait for server to start
  echo "Waiting for Vite server to start..."
  for i in {1..15}; do
    if curl -s http://localhost:5173 > /dev/null; then
      echo "✅ Vite server started successfully."
      break
    fi
    if [ $i -eq 15 ]; then
      echo "❌ Failed to start Vite server. Check vite.log for details."
      exit 1
    fi
    sleep 2
  done
  
  echo "Vite server running with PID: $VITE_PID"
else
  echo "✅ React frontend is already running."
fi

# Test Registration API
echo "Testing Registration API..."
echo "Generating random test user..."
RANDOM_STR=$(cat /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1)
TEST_USERNAME="testuser_${RANDOM_STR}"
TEST_EMAIL="${TEST_USERNAME}@example.com"
TEST_PASSWORD="Test@123"

echo "Creating test user: $TEST_USERNAME with email: $TEST_EMAIL"

# Send registration request
echo "Sending registration request to backend..."
RESPONSE=$(curl -s -X POST http://localhost:8000/api/v1/auth/register/member/ \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"$TEST_USERNAME\",
    \"email\": \"$TEST_EMAIL\",
    \"password\": \"$TEST_PASSWORD\",
    \"first_name\": \"Test\",
    \"last_name\": \"User\"
  }")

echo "Response from registration API:"
echo "$RESPONSE" | json_pp 2>/dev/null || echo "$RESPONSE"

# Check if registration was successful
if echo "$RESPONSE" | grep -q "\"status\":\"success\""; then
  echo "✅ Registration test PASSED!"
else
  echo "❌ Registration test FAILED!"
fi

# Test token generation
if echo "$RESPONSE" | grep -q "\"access\""; then
  echo "✅ Token generation test PASSED!"
  
  # Extract token
  ACCESS_TOKEN=$(echo "$RESPONSE" | grep -o '\"access\":\"[^\"]*\"' | cut -d '"' -f 4)
  echo "💡 Access token obtained: ${ACCESS_TOKEN:0:20}..."
  
  # Test token validity
  echo "Testing token validity..."
  USER_DATA=$(curl -s -X GET http://localhost:8000/api/v1/auth/me/ \
    -H "Authorization: Bearer $ACCESS_TOKEN")
    
  if echo "$USER_DATA" | grep -q "$TEST_USERNAME"; then
    echo "✅ Token validation test PASSED!"
  else
    echo "❌ Token validation test FAILED!"
    echo "Response from user data API:"
    echo "$USER_DATA" | json_pp 2>/dev/null || echo "$USER_DATA"
  fi
else
  echo "❌ Token generation test FAILED!"
fi

# Test CORS configuration
echo "Testing CORS configuration..."
CORS_RESPONSE=$(curl -s -I -X OPTIONS http://localhost:8000/api/v1/auth/register/member/ \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST")
  
if echo "$CORS_RESPONSE" | grep -q "Access-Control-Allow-Origin"; then
  echo "✅ CORS test PASSED!"
else
  echo "❌ CORS test FAILED!"
  echo "Response headers:"
  echo "$CORS_RESPONSE"
fi

echo "🏁 Enhanced Integration Test completed."

# Clean up servers if we started them
if [ -n "$DJANGO_PID" ]; then
  echo "Stopping Django server (PID: $DJANGO_PID)..."
  kill $DJANGO_PID
fi

if [ -n "$VITE_PID" ]; then
  echo "Stopping Vite server (PID: $VITE_PID)..."
  kill $VITE_PID
fi

echo "Done."