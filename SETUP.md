# Detailed Setup Guide

## 🚀 Quick Start (5 minutes)

### Using Docker (Easiest Method)

1. **Make sure Docker is installed and running**
   ```bash
   docker --version
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Check if services are running**
   ```bash
   docker-compose ps
   ```

4. **View logs (if needed)**
   ```bash
   docker-compose logs -f
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/health
   - AI Service: http://localhost:5001/health

6. **Stop services**
   ```bash
   docker-compose down
   ```

---

## 📋 Manual Setup (Step by Step)

### Step 1: Install Prerequisites

#### Node.js
- Download from [nodejs.org](https://nodejs.org/)
- Verify installation:
  ```bash
  node --version  # Should be v14 or higher
  npm --version
  ```

#### Python
- Download from [python.org](https://www.python.org/downloads/)
- Verify installation:
  ```bash
  python --version  # Should be v3.8 or higher
  pip --version
  ```

#### MongoDB
**Option 1: Docker (Recommended)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option 2: Local Installation**
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Follow installation instructions for your OS
- Start MongoDB service

---

### Step 2: Clone and Navigate

```bash
# If you haven't already
cd smart_tourism
```

---

### Step 3: Set Up Server

```bash
cd server

# Install dependencies
npm install

# Create .env file
# Windows PowerShell:
Copy-Item .env.example .env
# Linux/Mac:
cp .env.example .env

# Edit .env file (use any text editor)
# Minimum configuration:
# MONGODB_URI=mongodb://localhost:27017/smart_tourism
# JWT_SECRET=change_this_to_a_random_string

# Start server
npm start
# Or for development (with auto-reload):
npm run dev
```

**Expected output:**
```
MongoDB connected successfully
Server is running on port 5000
```

**Test the server:**
- Open http://localhost:5000/health in your browser
- You should see: `{"status":"OK","message":"Server is running"}`

---

### Step 4: Set Up AI Service

Open a **new terminal window**:

```bash
cd ai_service

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
# Windows PowerShell:
Copy-Item .env.example .env
# Linux/Mac:
cp .env.example .env

# Start AI service
python app.py
```

**Expected output:**
```
 * Running on http://0.0.0.0:5001
```

**Test the AI service:**
- Open http://localhost:5001/health in your browser
- You should see: `{"status":"OK","message":"AI Service is running"}`

---

### Step 5: Set Up Client

Open a **new terminal window**:

```bash
cd client

# Install dependencies
npm install

# Create .env file
# Windows PowerShell:
Copy-Item .env.example .env
# Linux/Mac:
cp .env.example .env

# Edit .env file
# Minimum configuration:
# REACT_APP_API_URL=http://localhost:5000
# REACT_APP_AI_SERVICE_URL=http://localhost:5001

# Start client
npm start
```

**Expected output:**
```
Compiled successfully!
You can now view smart-tourism-client in the browser.
  Local:            http://localhost:3000
```

The browser should open automatically. If not, navigate to http://localhost:3000

---

## ✅ Verification Checklist

After setup, verify everything is working:

- [ ] MongoDB is running (port 27017)
- [ ] Server is running (http://localhost:5000/health)
- [ ] AI Service is running (http://localhost:5001/health)
- [ ] Client is running (http://localhost:3000)
- [ ] Can register a new user
- [ ] Can login
- [ ] Can view trips page
- [ ] Can get recommendations

---

## 🔧 Troubleshooting

### Port Already in Use

If you get "port already in use" errors:

**Windows:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000
# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### MongoDB Connection Issues

1. **Check if MongoDB is running:**
   ```bash
   # Docker
   docker ps | grep mongo
   
   # Local
   # Windows: Check Services
   # Linux: sudo systemctl status mongod
   # Mac: brew services list
   ```

2. **Test MongoDB connection:**
   ```bash
   # Using MongoDB shell
   mongosh mongodb://localhost:27017
   ```

### Module Not Found Errors

If you get module not found errors:

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Python Virtual Environment Issues

```bash
# If virtual environment doesn't activate
python -m venv venv --clear
# Then activate and reinstall
pip install -r requirements.txt
```

### Docker Issues

```bash
# Stop all containers
docker-compose down

# Remove volumes (WARNING: deletes data)
docker-compose down -v

# Rebuild containers
docker-compose up --build -d

# View logs
docker-compose logs -f [service_name]
```

---

## 🎯 Next Steps

1. **Create your first account:**
   - Go to http://localhost:3000
   - Click "Register"
   - Fill in your details

2. **Set your preferences:**
   - Navigate to Preferences page
   - Fill in your travel preferences

3. **Get recommendations:**
   - Go to Recommendations page
   - Click "Get Recommendations"

4. **Create a trip:**
   - Go to Trips page
   - Click "Create New Trip"
   - Fill in trip details

---

## 📝 Development Tips

### Running in Development Mode

- **Server**: Use `npm run dev` for auto-reload on file changes
- **Client**: Already runs in development mode with hot-reload
- **AI Service**: Runs in debug mode by default

### Environment Variables

Never commit `.env` files to git. They are already in `.gitignore`.

### Database

- Development data is stored in MongoDB
- With Docker: Data persists in `mongodb_data` volume
- Without Docker: Data is in MongoDB's default location

---

## 🆘 Need Help?

1. Check the logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all ports are available
4. Make sure MongoDB is running
5. Check that all dependencies are installed

---

## 🎉 You're All Set!

Your Smart Tourism application should now be running. Happy coding! 🚀

