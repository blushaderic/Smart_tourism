@echo off
echo ========================================
echo Smart Tourism Application - Quick Start
echo ========================================
echo.

echo Starting MongoDB with Docker...
docker run -d -p 27017:27017 --name smart_tourism_mongodb mongo:latest

echo.
echo Waiting for MongoDB to start...
timeout /t 5 /nobreak >nul

echo.
echo Starting Server...
cd server
start "Server" cmd /k "npm start"
cd ..

echo.
echo Starting AI Service...
cd ai_service
start "AI Service" cmd /k "python app.py"
cd ..

echo.
echo Starting Client...
cd client
start "Client" cmd /k "npm start"
cd ..

echo.
echo ========================================
echo All services are starting!
echo ========================================
echo.
echo Services will open in separate windows.
echo.
echo Access the application at: http://localhost:3000
echo.
pause

