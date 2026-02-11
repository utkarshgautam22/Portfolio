# Deployment Guide

## 🚀 Deploying Your SSR Portfolio

This guide covers deploying your server-side rendered portfolio with GitHub data caching.

## 📋 Pre-Deployment Checklist

- [ ] Test locally: `npm run build && npm start`
- [ ] Update GitHub username in `app/api/projects/route.ts` if needed
- [ ] Update featured repos list if needed
- [ ] (Optional) Create GitHub Personal Access Token
- [ ] Choose your deployment platform

## 🌐 Deployment Platforms

### Vercel (Recommended)

Vercel is made by the Next.js team and offers the best integration.

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Convert to SSR with weekly caching"
   git push origin main
   ```

2. **Deploy:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Set Environment Variables:**
   ```bash
   # In Vercel Dashboard -> Settings -> Environment Variables
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   GITHUB_TOKEN=your_token_here  # Optional
   ```

4. **Redeploy:**
   - Click "Redeploy" to apply environment variables

### Netlify

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Convert to SSR with weekly caching"
   git push origin main
   ```

2. **Deploy:**
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repo

3. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Set as Next.js site

4. **Environment Variables:**
   - Go to Site settings → Environment variables
   - Add:
     - `NEXT_PUBLIC_BASE_URL`: Your Netlify URL
     - `GITHUB_TOKEN`: Your token (optional)

### Railway

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy:**
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Set Environment Variables:**
   ```bash
   railway variables set NEXT_PUBLIC_BASE_URL=your-railway-url
   railway variables set GITHUB_TOKEN=your_token
   ```

### Docker (Self-Hosted)

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm ci --only=production

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

2. **Build and Run:**
   ```bash
   docker build -t portfolio .
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_BASE_URL=https://your-domain.com \
     -e GITHUB_TOKEN=your_token \
     portfolio
   ```

## 🔑 GitHub Token Setup (Optional but Recommended)

Without token: 60 requests/hour
With token: 5000 requests/hour

1. **Create Token:**
   - Go to [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Name: "Portfolio API Access"
   - Select scope: `public_repo` (or no scopes for public data only)
   - Click "Generate token"
   - Copy the token (you won't see it again!)

2. **Add to Deployment:**
   - Add as environment variable: `GITHUB_TOKEN=your_token`

## ⚙️ Environment Variables

### Required
None! The app works out of the box.

### Optional (Recommended)

**`NEXT_PUBLIC_BASE_URL`**
- Your production domain
- Example: `https://portfolio.yourdomain.com`
- Used for: API calls in production

**`GITHUB_TOKEN`**
- Your GitHub Personal Access Token
- Increases rate limit from 60 to 5000 requests/hour
- Only needed if you expect high traffic or many rebuilds

## 🔄 Cache Behavior in Production

### Vercel
- Automatic ISR (Incremental Static Regeneration)
- Cache revalidates every 7 days automatically
- No manual intervention needed

### Netlify
- Uses Next.js built-in caching
- Cache duration: 7 days
- Rebuilds required for immediate updates

### Self-Hosted
- Cache stored in `.next/cache`
- Persists between deployments
- Clear with: `rm -rf .next/cache && npm run build`

## 📊 Performance Monitoring

### Check Cache Status
1. Open your deployed site
2. Scroll to Projects section
3. Look for "Last synced: [date]" indicator

### Verify Server-Side Rendering
1. View page source (Ctrl/Cmd + U)
2. Search for project titles
3. If visible in HTML → SSR working ✅
4. If not → Check build logs

## 🐛 Troubleshooting

### Issue: Projects not loading

**Check 1: GitHub API Access**
```bash
curl https://api.github.com/users/YOUR_USERNAME/repos
```

**Check 2: Environment Variables**
- Ensure `NEXT_PUBLIC_BASE_URL` is set correctly
- Check deployment platform logs

**Check 3: Build Logs**
- Look for errors during build
- Check if data fetching succeeded

### Issue: Rate limit errors

**Solution:** Add GitHub token
```bash
# In deployment platform
GITHUB_TOKEN=your_github_token
```

### Issue: Stale data

**Solution:** Trigger rebuild
- Vercel: Click "Redeploy" in dashboard
- Netlify: Click "Trigger deploy"
- Self-hosted: `npm run build`

### Issue: Build fails

**Check Node version:**
```bash
node --version  # Should be 18+ 
```

**Clear cache and rebuild:**
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

## 🎯 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] Projects section displays GitHub repos
- [ ] Filtering works (Featured, All, Categories)
- [ ] Dark/light mode works
- [ ] Navigation menu works
- [ ] All links work (GitHub, live demos)
- [ ] Mobile responsive
- [ ] Check browser console for errors
- [ ] Test on multiple devices
- [ ] Verify cache indicator shows correct time

## 🔒 Security Notes

1. **Never commit `.env.local`** to git
2. **GitHub token:** Keep it secret, rotate regularly
3. **API route:** Already public, no authentication needed
4. **Rate limiting:** Handled by Next.js and GitHub

## 📈 Scaling Considerations

### Low Traffic (<1000 visitors/day)
- Default settings work great
- No GitHub token needed
- 7-day cache is sufficient

### Medium Traffic (1000-10000 visitors/day)
- Add GitHub token for higher rate limits
- Consider 3-day cache revalidation
- Monitor API usage

### High Traffic (>10000 visitors/day)
- Use GitHub token (required)
- Consider CDN (Vercel/Netlify include this)
- Monitor cache hit rates
- Consider shorter revalidation (1-2 days)

## 🎉 Success!

Your portfolio is now deployed with:
- ⚡ Server-side rendering
- 🔄 Automatic weekly updates from GitHub
- 💰 Minimal API usage
- 🌍 Better SEO
- 🚀 Fast loading times

Need help? Check:
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
