#!/bin/bash

echo "========================================"
echo "Smart Tourism Application - Quick Start"
echo "========================================"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker first."
    exit 1
fi

echo "Starting MongoDB with Docker..."
docker run -d -p 27017:27017 --name smart_tourism_mongodb mongo:latest

echo ""
echo "Waiting for MongoDB to start..."
sleep 5

echo ""
echo "Starting Server..."
cd server
npm start &
SERVER_PID=$!
cd ..

echo ""
echo "Starting AI Service..."
cd ai_service
# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi
python app.py &
AI_PID=$!
cd ..

echo ""
echo "Starting Client..."
cd client
npm start &
CLIENT_PID=$!
cd ..

echo ""
echo "========================================"
echo "All services are starting!"
echo "========================================"
echo ""
echo "Server PID: $SERVER_PID"
echo "AI Service PID: $AI_PID"
echo "Client PID: $CLIENT_PID"
echo ""
echo "Access the application at: http://localhost:3000"
echo ""
echo "To stop all services, press Ctrl+C"
echo ""

# Wait for user interrupt
trap "kill $SERVER_PID $AI_PID $CLIENT_PID 2>/dev/null; docker stop smart_tourism_mongodb 2>/dev/null; docker rm smart_tourism_mongodb 2>/dev/null; exit" INT

wait

