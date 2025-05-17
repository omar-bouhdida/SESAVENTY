# SESAVENTY - Student Clubs and Events Management Platform

SESAVENTY is a comprehensive platform for managing student clubs, events, and memberships. This repository contains both the frontend and backend code.

## Project Structure

- `frontend/` - React frontend application with Tailwind CSS
- `backend/` - Django REST Framework backend application

## Backend Technologies

- Django 4.2.20
- Django REST Framework 3.16.0
- PostgreSQL / SQLite
- JWT Authentication

## Frontend Technologies

- React
- React Router
- Tailwind CSS
- Axios for API requests

## Features

- User authentication with role-based access control (Members, Coordinators, Student Life Officers)
- Club creation and management
- Event creation and management
- Club membership management
- User profiles
- Modern, responsive UI

## Getting Started

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Create a superuser
python manage.py createsuperuser

# Run the server
python manage.py runserver
```
### Frontend Setup

```bash
cd frontend
npm install

# Create a .env file with the following content:
echo "REACT_APP_API_URL=http://localhost:8000" > .env

# Start the development server
npm start
```

## User Roles

- **Member**: Can join clubs and participate in events
- **Coordinator**: Can create and manage clubs and events
- **Student Life Officer (RVA)**: Can approve or reject club creation requests and manage the platform

## Features Included

- **Authentication System**:
  - Login and Registration for all roles
  - JWT-based authentication
  - Protected routes

- **Clubs Management**:
  - Browse clubs list
  - View club details
  - Create new clubs (Coordinators)
  - Approve/reject club creation requests (Student Life Officers)
  - Join clubs (Members)

- **Events Management**:
  - Browse events list
  - View event details
  - Create events for a club (Coordinators)
  - Filter events by status

- **Membership Management**:
  - Request to join clubs
  - View memberships in profile
  - Manage members (Coordinators)

- **User Profile**:
  - View and edit personal information
  - Manage memberships
  - View coordinated clubs

## Project Structure

### Backend

- **clubs/** - Club models, views, and API endpoints
- **events/** - Event models, views, and API endpoints  
- **memberships/** - Membership models, views, and API endpoints
- **users/** - User models, authentication, and API endpoints
- **shared/** - Shared utilities, enums, and permissions
- **core/** - Main Django app settings and configuration

### Frontend

- **src/components/** - Reusable UI components
- **src/contexts/** - React contexts (Auth)
- **src/pages/** - Application pages
- **src/services/** - API service functions
- **src/App.js** - Main application component with routes
