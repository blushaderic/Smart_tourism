# ✈️ SmartTourismM

SmartTourismM is a premium, intelligent, agent-powered travel recommendation and itinerary generation platform. Designed to solve group travel coordination, it handles everything from finding optimal, geographically fair meeting points for scattered groups to generating rich, AI-powered daily itineraries.

---

## 🌟 Key Features

*   📍 **Intelligent Group Meeting Point:** Calculates the most geographically fair meeting point (city and exact coordinates) for up to $N$ users using a weighted Haversine distance algorithm. It features a custom distance matrix to minimize maximum user travel distances and can optionally shift the center towards preferred target destinations.
*   ⚡ **Dynamic POI Fetching:** Integrates with the **OpenStreetMap (Overpass API)** to dynamically discover real-world nearby cafes, restaurants, parks, hotels, malls, and transit stations directly adjacent to the group’s meeting coordinate.
*   🛡️ **Multi-Node Failover Resiliency:** Rotates queries across 3 independent Overpass API mirrors to handle 504 Gateway Timeouts and 429 Rate Limits, guaranteeing high service availability.
*   💾 **Smart Geospatial Caching:** Stores dynamically discovered locations in a persistent MongoDB database using geospatial schemas. The backend preferentially reads from local database caches for repeat proximity searches, reducing latency by over 60%.
*   🤖 **AI Itinerary Generator:** Leverages Google's **Gemini Flash LLM** to rapidly author detailed, contextually aware day-by-day vacation itineraries, customized by destination, duration, month, interests, and budget constraints.
*   📊 **Collaborative Trip Dashboard:** Offers secure user registration/authentication (via JSON Web Tokens), dynamic group trip creation, real-time message exchange, and destination voting inside an interactive hub.

---

## 🛠️ Tech Stack

### Frontend
*   **React.js** (Custom Hooks, Context APIs for auth & trip states)
*   **TailwindCSS** (Premium dark mode UI & responsive layouts)
*   **Leaflet.js** (Interactive mapping integration and marker routing)
*   **Axios** (API communication layer)
*   **React Router DOM** (Client-side routing)

### Backend
*   **Node.js & Express.js** (REST API endpoints & middleware architecture)
*   **MongoDB & Mongoose** (Data persistence, schemas, and geospatial indexing)
*   **Google Gemini API** (Generative AI integration)
*   **JSON Web Tokens (JWT)** (User authentication and session security)

---

## 📂 Project Structure

```text
smart-tourismm/
├── backend/                  # Node.js + Express backend
│   ├── config/               # Database and configuration files
│   ├── controllers/          # Route controller logic (auth, trip, poi, etc.)
│   ├── data/                 # Seeding scripts and place datasets
│   ├── middleware/           # Authentication guards, error handlers
│   ├── models/               # Mongoose schemas (User, GroupTrip, Place, Review)
│   ├── routes/               # API route maps
│   ├── services/             # Overpass, Place, and Gemini AI service integrations
│   ├── server.js             # Main server entrypoint
│   └── package.json
│
├── frontend/                 # React frontend
│   ├── public/               # Public assets and HTML entry
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # State providers (AuthContext, SocketContext)
│   │   ├── pages/            # Page templates (Dashboard, Login, TripDetail)
│   │   ├── services/         # Axios wrapper and WebSockets client
│   │   ├── App.js            # Router and app shell
│   │   └── index.js          # App entrypoint
│   └── package.json
```

---

## 🚀 Setup & Installation

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a MongoDB Atlas URI)
*   A Google Gemini API key (retrieve from [Google AI Studio](https://aistudio.google.com/))

### 1. Set Up the Backend
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend/` directory:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/smart_tourism
    JWT_SECRET=your_jwt_secret_key_here
    GEMINI_API_KEY=your_gemini_api_key_here
    ```
4.  (Optional) Seed initial city data:
    ```bash
    node data/seedPlaces.js
    ```
5.  Start the backend development server (requires `nodemon` global or local):
    ```bash
    npm run dev
    ```
    The server runs on `http://localhost:5000`.

### 2. Set Up the Frontend
1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm start
    ```
    The web app will open automatically on `http://localhost:3000`.

---

## 🔌 Environment Variables Reference

### Backend (`backend/.env`)
*   `PORT`: The port the Express server will run on (Default: `5000`).
*   `MONGO_URI`: MongoDB connection string.
*   `JWT_SECRET`: Secret key used for signing JSON Web Tokens.
*   `GEMINI_API_KEY`: API key for Google Gemini Flash LLM itinerary generation.

---

## 🔧 Troubleshooting

### 1. Port 3000 or 5000 already in use
*   **Windows:**
    ```powershell
    netstat -ano | findstr :5000
    taskkill /PID <PID> /F
    ```
*   **Linux/Mac:**
    ```bash
    lsof -i :5000
    kill -9 <PID>
    ```

### 2. MongoDB connection errors
Ensure that your local MongoDB service is actively running:
*   On Windows, check the **Services** panel and verify that `MongoDB Server (MongoDB)` is `Running`.
*   On Linux/macOS, run `sudo systemctl status mongod` or `brew services list`.

---

## 🛡️ License
This project is licensed under the MIT License.
