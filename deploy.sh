#!/bin/bash

# Riemann Hypothesis Explorer - Deployment Script
echo "🔢 Deploying Riemann Hypothesis Explorer..."

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "🚀 Deploying to Vercel..."
    vercel --prod
elif command -v netlify &> /dev/null; then
    echo "🌐 Deploying to Netlify..."
    netlify deploy --prod --dir=dist
else
    echo "📁 Build files are ready in ./dist/"
    echo "You can deploy them to any static hosting service:"
    echo "  - Vercel: npm install -g vercel && vercel"
    echo "  - Netlify: npm install -g netlify-cli && netlify deploy --prod --dir=dist"
    echo "  - GitHub Pages: Upload dist/ folder to gh-pages branch"
fi

echo "🎉 Deployment process completed!" 