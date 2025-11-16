# Smart Tourism Application

A comprehensive smart tourism platform that provides personalized travel recommendations, group trip planning, and AI-powered destination suggestions.

## Features

- 🎯 **Personalized Recommendations**: AI-powered destination recommendations based on user preferences
- 👥 **Group Trip Planning**: Collaborative trip planning with real-time chat
- 📍 **Location Services**: Integration with Google Maps for location-based features
- 🔐 **Authentication**: Secure user authentication and authorization
- 💬 **Real-time Chat**: WebSocket-based chat for group collaboration
- 📱 **Cross-platform**: Web application built with React Native Web

## Project Structure

```
smart-tourism-app/
├── client/          # React Native Web frontend
├── server/          # Node.js/Express backend
├── ai_service/      # Python/Flask AI recommendation service
└── docker-compose.yml
```

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB
- Docker (optional, for containerized deployment)

## Getting Started

### Prerequisites

Before starting, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/downloads/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) OR use Docker
- **Docker** (optional, but recommended) - [Download](https://www.docker.com/get-started)

---

## Quick Start (Using Docker) - Recommended

This is the easiest way to get everything running:

### 1. Start all services with Docker Compose

```bash
# From the project root directory
docker-compose up -d
```

This will start:
- MongoDB on port `27017`
- Server on port `5000`
- AI Service on port `5001`
- Client on port `3000`

### 2. Access the application

- **Frontend**: Open [http://localhost:3000](http://localhost:3000) in your browser
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **AI Service**: [http://localhost:5001](http://localhost:5001)

### 3. Stop services

```bash
docker-compose down
```

---

## Manual Setup (For Development)

If you prefer to run services manually for development:

### Step 1: Set up MongoDB

**Option A: Using Docker (Recommended)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option B: Install MongoDB locally**
- Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service on your system

### Step 2: Set up the Server

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
# On Windows (PowerShell):
Copy-Item .env.example .env
# On Linux/Mac:
cp .env.example .env

# Edit .env file with your configuration
# Minimum required:
# MONGODB_URI=mongodb://localhost:27017/smart_tourism
# JWT_SECRET=your_secret_key_here

# Start the server
npm start
# Or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:5000`

### Step 3: Set up the AI Service

```bash
# Navigate to AI service directory
cd ai_service

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
# On Windows (PowerShell):
Copy-Item .env.example .env
# On Linux/Mac:
cp .env.example .env

# Start the AI service
python app.py
```

The AI service will run on `http://localhost:5001`

### Step 4: Set up the Client

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create environment file
# On Windows (PowerShell):
Copy-Item .env.example .env
# On Linux/Mac:
cp .env.example .env

# Edit .env file (minimum required):
# REACT_APP_API_URL=http://localhost:5000
# REACT_APP_AI_SERVICE_URL=http://localhost:5001

# Start the client
npm start
```

The client will run on `http://localhost:3000` and open automatically in your browser.

---

## Environment Variables

### Server (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart_tourism
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
CLIENT_URL=http://localhost:3000
AI_SERVICE_URL=http://localhost:5001
```

### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_AI_SERVICE_URL=http://localhost:5001
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### AI Service (.env)
```env
FLASK_ENV=development
FLASK_PORT=5001
MODEL_PATH=./models/recommendation_model.pkl
NLP_MODEL_PATH=./models/nlp_model.pkl
```

**Note**: For production, change all `localhost` URLs to your actual domain names.

## Technologies

- **Frontend**: React Native Web, React Navigation
- **Backend**: Node.js, Express, MongoDB, Socket.io
- **AI Service**: Python, Flask, scikit-learn, NLP libraries
- **Services**: Google Maps API

## License

See LICENSE file for details.

