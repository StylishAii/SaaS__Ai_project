#!/bin/bash

# Wait for the database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Run migrations
echo "Database is up - running migrations..."
npm run migrate

# Start the app
echo "Starting the app..."
npm run dev
