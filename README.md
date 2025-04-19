# SESAVENTY
Projet PPG

# 🚀 React + Django Project Starter

This project uses **React** for the frontend and **Django** for the backend.

Follow the steps below to set everything up after cloning the repository.

---

## 📥 1. Clone the Repository

```bash
git clone https://github.com/omar-bouhdida/SESAVENTY.git
cd your-repo-name
```

---

## ⚛️ 2. Set Up the Frontend (React)

```bash
cd frontend
npm install
cd ..
```

If using Vite (instead of Create React App), and the `node_modules` folder is missing:

```bash
cd frontend
npm install
npm run dev
cd ..
```

---

## 🐍 3. Set Up the Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate         # On Windows: venv\Scripts\activate
pip install -r requirements.txt # If available

# If there's no requirements.txt, install manually:
pip install django djangorestframework django-cors-headers

# Run Django server
python manage.py runserver
cd ..
```

---

## 🎨 4. Project Structure

```
your-project/
│
├── frontend/           # React app
│   ├── src/assets/     # Images, fonts
│   └── src/styles/     # Color and font configs
│
├── backend/            # Django project
│   └── core/           # Django main app
│
└── README.md
```

---

## 🎨 5. Asset Files

- Place logo images in: `frontend/src/assets/images/`
- Place fonts in: `frontend/src/assets/fonts/`
- Define color and font themes in:
  - `frontend/src/styles/colors.js`
  - `frontend/src/styles/fonts.js`

---

## ✅ 6. Run the Project

### Run Django (Backend)

```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

### Run React (Frontend)

```bash
cd frontend
npm run dev   # For Vite
# or
npm start     # For Create React App
```

---

## ✅ Done!
