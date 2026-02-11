#!/bin/bash

# Portfolio Deployment Pre-flight Check
# Run this script before deploying to verify everything is ready

echo "🚀 Portfolio Pre-Deployment Checklist"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "   Node.js: $NODE_VERSION"
if [[ "$NODE_VERSION" < "v18" ]]; then
    echo -e "   ${RED}✗${NC} Node.js 18+ required"
    exit 1
else
    echo -e "   ${GREEN}✓${NC} Node.js version OK"
fi
echo ""

# Check if dependencies are installed
echo "📚 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo -e "   ${RED}✗${NC} Dependencies not installed"
    echo "   Run: npm install"
    exit 1
else
    echo -e "   ${GREEN}✓${NC} Dependencies installed"
fi
echo ""

# Check if config file exists
echo "⚙️  Checking configuration..."
if [ ! -f "config/site.config.ts" ]; then
    echo -e "   ${RED}✗${NC} Config file not found"
    exit 1
else
    echo -e "   ${GREEN}✓${NC} Config file exists"
fi
echo ""

# Try to build
echo "🏗️  Building project..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "   ${GREEN}✓${NC} Build successful"
else
    echo -e "   ${RED}✗${NC} Build failed"
    echo "   Run: npm run build"
    echo "   Check the errors and fix them before deploying"
    exit 1
fi
echo ""

# Check git status
echo "📝 Checking git status..."
if [ -d ".git" ]; then
    if [[ -n $(git status -s) ]]; then
        echo -e "   ${YELLOW}⚠${NC}  Uncommitted changes detected"
        echo "   Consider committing your changes:"
        echo "   git add ."
        echo "   git commit -m 'Prepare for deployment'"
        echo "   git push origin main"
    else
        echo -e "   ${GREEN}✓${NC} All changes committed"
    fi
else
    echo -e "   ${YELLOW}⚠${NC}  Not a git repository"
    echo "   Initialize git: git init"
fi
echo ""

# Check if .env.local exists
echo "🔐 Checking environment variables..."
if [ -f ".env.local" ]; then
    echo -e "   ${YELLOW}⚠${NC}  .env.local exists"
    echo "   Make sure to add environment variables in Vercel dashboard"
    echo "   Don't commit .env.local to git!"
else
    echo -e "   ${GREEN}✓${NC} No local env file (will use Vercel env vars)"
fi
echo ""

# Summary
echo "======================================"
echo "✅ Pre-deployment checks complete!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub:"
echo "   git push origin main"
echo ""
echo "2. Deploy on Vercel:"
echo "   - Visit vercel.com"
echo "   - Import your GitHub repository"
echo "   - Click Deploy"
echo ""
echo "3. Add environment variables in Vercel:"
echo "   - GITHUB_TOKEN (optional, for higher rate limits)"
echo "   - NEXT_PUBLIC_BASE_URL (add after first deploy)"
echo ""
echo "4. After deployment:"
echo "   - Update seo.siteUrl in config/site.config.ts"
echo "   - Commit and push to trigger redeploy"
echo ""
echo "📚 See VERCEL_DEPLOYMENT.md for detailed guide"
echo "======================================"
