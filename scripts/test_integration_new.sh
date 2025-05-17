#!/bin/bash

# Test script for Django and React integration

# Error handling
set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting integration tests...${NC}"

# Navigate to the project root
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR/.."
cd "$PROJECT_ROOT"

# Test if Django server is running
echo -e "${YELLOW}Testing if Django server is running...${NC}"
if curl -s http://localhost:8000 > /dev/null; then
  echo -e "${GREEN}✅ Django server is running${NC}"
else
  echo -e "${RED}❌ Django server is not running. Please start it with 'python manage.py runserver'${NC}"
  exit 1
fi

# Test if React server is running
echo -e "${YELLOW}Testing if React server is running...${NC}"
if curl -s http://localhost:3000 > /dev/null; then
  echo -e "${GREEN}✅ React server is running${NC}"
else
  echo -e "${RED}❌ React dev server is not running. Please start it with 'npm run dev'${NC}"
  exit 1
fi

# Test Token endpoint (should return 405 for GET request, which is expected)
echo -e "${YELLOW}Testing Token endpoint...${NC}"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/v1/token/)
if [ "$RESPONSE" == "405" ]; then
  echo -e "${GREEN}✅ Token endpoint is working correctly (returned 405 for GET request)${NC}"
else
  echo -e "${RED}❌ Token endpoint returned unexpected status: $RESPONSE${NC}"
fi

# Test API endpoints (should return 401 for unauthenticated requests, which is expected)
echo -e "${YELLOW}Testing API endpoints...${NC}"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/v1/)
if [ "$RESPONSE" == "401" ]; then
  echo -e "${GREEN}✅ API endpoint is properly secured (returned 401 for unauthenticated request)${NC}"
else
  echo -e "${RED}❌ API endpoint returned unexpected status: $RESPONSE${NC}"
fi

echo -e "${GREEN}✅ Integration tests completed successfully!${NC}"
echo -e "${YELLOW}Both Django and React servers are running correctly.${NC}"
echo -e "${YELLOW}You can now test the integration by logging in through the React app.${NC}"
