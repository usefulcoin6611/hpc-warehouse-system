#!/bin/bash

# LogiFlow Website Deployment Script untuk cPanel
# Pastikan file ini executable: chmod +x deploy.sh

echo "🚀 Starting LogiFlow Website Deployment..."

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production file not found!"
    echo "Please create .env.production file with your production environment variables"
    exit 1
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Create uploads directory if not exists
echo "📁 Creating uploads directory..."
mkdir -p public/uploads/assembly
mkdir -p public/uploads/inspeksi
mkdir -p public/uploads/painting
mkdir -p public/uploads/pdi
mkdir -p public/uploads/pindah-lokasi
mkdir -p public/uploads/qc

# Set permissions
echo "🔐 Setting permissions..."
chmod 755 public/uploads
chmod 755 public/uploads/*

# Copy environment file
echo "⚙️ Setting up environment..."
cp .env.production .env.local

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🔄 Running database migrations..."
npx prisma migrate deploy

# Check if migrations were successful
if [ $? -ne 0 ]; then
    echo "❌ Database migration failed!"
    exit 1
fi

# Seed database (optional)
read -p "Do you want to seed the database? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npx prisma db seed
fi

echo "✅ Deployment completed successfully!"
echo "🎉 Your LogiFlow Website is ready to run!"

# Optional: Start the application
read -p "Do you want to start the application now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting application..."
    npm start
fi
