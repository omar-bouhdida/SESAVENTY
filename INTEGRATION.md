# Django + React Integration Guide

This guide explains how the Django backend and React frontend are integrated in this project.

## Architecture Overview

The project uses:
- **Django** backend with Django REST Framework for API endpoints
- **React** frontend built with Vite
- **JWT Authentication** for secure communication
- **CORS** configuration for cross-origin requests in development

## Development Setup

### Backend (Django)
1. Install dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```

2. Run migrations:
   ```
   python manage.py migrate
   ```

3. Start the development server:
   ```
   python manage.py runserver
   ```

The Django server will run at http://127.0.0.1:8000/

### Frontend (React)
1. Install dependencies:
   ```
   cd frontend
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

The React app will run at http://localhost:3000/

## API Integration

### API Structure
- All API endpoints are namespaced under `/api/v1/`
- Authentication endpoints are under `/api/v1/auth/` and `/api/v1/token/`
- Legacy endpoints are preserved for backward compatibility

### Authentication Flow
1. User logs in through React app using the `/api/v1/token/` endpoint
2. JWT tokens (access and refresh) are stored in localStorage
3. Access token is included in API requests via Authorization header
4. Refresh token is used to get new access tokens when they expire

## Production Deployment

1. Build the React app and copy it to Django's static files:
   ```
   cd frontend
   npm run build:django
   ```

2. Run Django with production settings:
   ```
   cd backend
   python manage.py runserver --settings=core.settings.production
   ```

For actual production deployment, use a proper WSGI server like Gunicorn and a web server like Nginx.

## Testing the Integration

Run the integration test script:
```
./scripts/test_integration.sh
```

This will verify that both Django and React servers are running and that the API endpoints are accessible.

## Troubleshooting

### CORS Issues
If you're seeing CORS errors:
1. Check that `corsheaders` is installed and in INSTALLED_APPS
2. Make sure `CorsMiddleware` is at the top of your MIDDLEWARE list
3. Verify that your React server's origin is in CORS_ALLOWED_ORIGINS

### Authentication Issues
If authentication is failing:
1. Verify that the tokens are being stored correctly in localStorage
2. Check that the Authorization header is being included in API requests
3. Make sure the token endpoints are properly configured in Django

### Static Files Issues
If the React app isn't loading correctly when served by Django:
1. Run `python manage.py collectstatic` to ensure all files are collected
2. Check that STATIC_ROOT and STATICFILES_DIRS are configured correctly
3. Verify that the React build folder exists and contains the expected files
