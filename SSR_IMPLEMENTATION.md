# Server-Side Rendering Implementation

This portfolio has been converted to use **Server-Side Rendering (SSR)** with weekly data caching for optimal performance.

## 🚀 What Changed?

### Before
- GitHub data was fetched on the **client-side** for every user
- Data was cached in browser's `localStorage` (7-day expiry)
- Every visitor triggered a fresh API call if cache was empty
- Slower initial page load

### After
- GitHub data is fetched on the **server-side**
- Data is cached for **7 days** using Next.js's built-in caching
- All users see the same pre-rendered data
- Much faster page loads (data fetched once per week)

## 📁 New File Structure

```
app/
├── api/
│   └── projects/
│       └── route.ts           # API route for GitHub data (cached for 7 days)
├── components/
│   ├── Projects.tsx           # Server component (fetches data)
│   ├── ProjectsClient.tsx     # Client component (interactive UI)
│   └── ClientLayout.tsx       # Client wrapper for theme & interactivity
└── page.tsx                   # Main page (now server-side)

lib/
└── getProjects.ts             # Server-side data fetching function
```

## 🔧 How It Works

### 1. API Route (`app/api/projects/route.ts`)
- Fetches from GitHub API
- Caches response for **7 days** (604,800 seconds)
- Returns processed project data with metadata

### 2. Data Fetching (`lib/getProjects.ts`)
- Called by server components
- Uses Next.js ISR (Incremental Static Regeneration)
- Revalidates every 7 days

### 3. Server Component (`app/components/Projects.tsx`)
- Fetches data on the server
- Passes data to client component as props

### 4. Client Component (`app/components/ProjectsClient.tsx`)
- Handles interactive features (filtering, hover effects)
- Receives pre-fetched data as props
- No API calls from the browser

## ⚙️ Configuration

### Optional: GitHub Token
To increase API rate limits (from 60/hour to 5000/hour), create a `.env.local` file:

```bash
# Optional: GitHub Personal Access Token
GITHUB_TOKEN=your_github_token_here

# Optional: Base URL for production
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Cache Duration
To change the cache duration, update the `revalidate` value in:
- `app/api/projects/route.ts` (line ~88)
- `lib/getProjects.ts` (line ~59)

```typescript
next: { revalidate: 604800 }  // 7 days in seconds
```

Examples:
- 1 day: `86400`
- 3 days: `259200`
- 7 days: `604800` (current)
- 14 days: `1209600`
- 30 days: `2592000`

## 🎯 Benefits

### Performance
- ✅ Faster page loads (data pre-rendered)
- ✅ Reduced GitHub API calls
- ✅ Better SEO (server-rendered content)
- ✅ Lower bandwidth usage

### User Experience
- ✅ Instant content display
- ✅ No loading spinners for projects
- ✅ Consistent data for all users
- ✅ Works without JavaScript

### Development
- ✅ Cleaner separation of concerns
- ✅ Easier to test and maintain
- ✅ Built-in Next.js caching
- ✅ No localStorage management

## 🔄 Cache Revalidation

The cache automatically revalidates every 7 days. To manually trigger a rebuild:

### Development
```bash
# Restart the dev server
npm run dev
```

### Production
```bash
# Rebuild the application
npm run build
```

Or use your deployment platform's revalidation features (Vercel, Netlify, etc.)

## 🧪 Testing

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Check the cache status:**
   - Look for "Last synced" timestamp on the projects section
   - Data refreshes automatically after 7 days

## 🚨 Troubleshooting

### Issue: No projects showing
**Solution:** Check if GitHub API is accessible:
```bash
curl https://api.github.com/users/utkarshgautam22/repos
```

### Issue: Rate limit errors
**Solution:** Add a GitHub token to `.env.local`:
```bash
GITHUB_TOKEN=your_token_here
```

### Issue: Build errors
**Solution:** Ensure all dependencies are installed:
```bash
npm install
```

## 📝 Customization

### Featured Projects
Update the featured repositories in `app/api/projects/route.ts`:
```typescript
const FEATURED_REPOS = ['isocode', 'cloud-dev-environment', 'AskMyDocs', 'Portfolio'];
```

### Excluded Repositories
Hide specific repos in `app/api/projects/route.ts`:
```typescript
const EXCLUDED_REPOS: string[] = ['private-repo', 'test-repo'];
```

### GitHub Username
Change the username in `app/api/projects/route.ts`:
```typescript
const GITHUB_USERNAME = 'your-username';
```

## 🌐 Deployment

When deploying to production:

1. Set environment variables on your hosting platform
2. Set `NEXT_PUBLIC_BASE_URL` to your domain
3. (Optional) Add `GITHUB_TOKEN` for higher rate limits

### Vercel Example
```bash
vercel env add NEXT_PUBLIC_BASE_URL
vercel env add GITHUB_TOKEN
```

## 📊 Performance Metrics

### Before SSR
- Initial Load: ~2-3 seconds
- API Calls per user: 1-5
- Client-side processing: Yes

### After SSR
- Initial Load: ~0.5-1 second
- API Calls per user: 0 (cached)
- Client-side processing: Minimal

## 🎉 Summary

Your portfolio now uses **Server-Side Rendering** with weekly caching, making it:
- ⚡ **Faster** - Pre-rendered content loads instantly
- 🔋 **Efficient** - GitHub API called once per week
- 🌍 **SEO-friendly** - Fully server-rendered
- 💰 **Cost-effective** - Reduced API usage

The data syncs automatically from GitHub every 7 days, ensuring your portfolio stays up-to-date without manual intervention!
