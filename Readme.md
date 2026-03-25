# Quanta: Quantum Computing Learning Platform

Quanta is a learning platform for understanding quantum computing through guided content, quizzes, glossary terms, and circuit simulation.

## Tech Stack

- Frontend: React + Vite + TailwindCSS
- Backend: Python + Flask
- Quantum simulation: Qiskit
- Database: MongoDB

## Prerequisites

Install these before starting:

- Node.js 20+ and npm
- Python 3.10+
- MongoDB (running locally or remotely)

## Setup After Cloning

From the folder that contains this repository:

```bash
git clone <your-repo-url>
cd quanta
```

### 1) Configure and run the backend

Open terminal A:

Windows (PowerShell):

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

macOS/Linux (bash/zsh):

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file inside `backend/` with:

```env
MONGO_URI=mongodb://localhost:27017
```

Initialize seed data and start the API:

```bash
python init_db.py
python app.py
```

Backend runs at: `http://localhost:5000`

### 2) Configure and run the frontend

Open terminal B:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

## Verify Everything Is Working

- Open `http://localhost:3000`
- Check API health: `http://localhost:5000/api/health`

If frontend shows proxy errors for `/api/*`, backend is not running yet.

## Common Issues

- `npm install` fails on Windows with `ERR_INVALID_ARG_TYPE`:
	This repo includes `frontend/.npmrc` with a fixed shell path. Re-run `npm install` in `frontend/`.
- Mongo connection errors:
	Verify MongoDB is running and `MONGO_URI` in `backend/.env` is correct.