# Portfolio

Modern, server-side rendered portfolio built with Next.js 16, React, TypeScript, and Tailwind CSS. Features automatic GitHub project syncing with weekly caching for optimal performance.

## ✨ Features

- ⚡ **Server-Side Rendering (SSR)** - Pre-rendered pages for instant loading
- 🔄 **Auto-syncing Projects** - Fetches from GitHub API weekly (configurable)
- 🎨 **Modern Design** - Responsive, dark mode, smooth animations
- 🚀 **Optimized Performance** - Fast loading with ISR caching
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🛠️ **Easy Configuration** - Single config file for all settings
- 🎯 **Type-Safe** - Full TypeScript support
- 🌙 **Dark Mode** - Automatic theme switching

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- GitHub account (for hosting)
- Vercel account (for deployment - free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/utkarshgautam22/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## ⚙️ Configuration

All settings are centralized in `config/site.config.ts`. Update this single file to customize your entire portfolio.

### 1. Personal Information

```typescript
personal: {
  name: "Your Name",
  title: "Your Professional Title",
  email: "your.email@example.com",
  location: "Your City, Country",
  bio: "Brief description about yourself",
  avatar: "/images/avatar.jpg"
}
```

### 2. Social Media Links

```typescript
social: {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  email: "mailto:your.email@example.com"
}
```

### 3. GitHub Projects

```typescript
github: {
  username: "your-github-username",
  featuredRepos: ["repo1", "repo2", "repo3"],
  excludedRepos: ["repo-to-hide"],
  cacheDuration: 604800  // 7 days in seconds
}
```

**Cache Duration Options:**
- 1 day: `86400`
- 3 days: `259200`
- 7 days: `604800` (recommended)
- 14 days: `1209600`

### 4. Skills

Add or modify your skills with custom icons and percentages:

```typescript
skills: {
  frontend: [
    { name: "React", percentage: 90, icon: "⚛️", color: "from-blue-400 to-cyan-500" },
    { name: "Next.js", percentage: 85, icon: "▲", color: "from-gray-700 to-gray-900" }
  ],
  backend: [
    { name: "Node.js", percentage: 85, icon: "📗", color: "from-green-400 to-emerald-500" }
  ],
  tools: [
    { name: "Git", percentage: 90, icon: "🔧", color: "from-orange-400 to-red-500" }
  ]
}
```

### 5. SEO Settings

```typescript
seo: {
  title: "Your Name | Portfolio",
  description: "Your professional description",
  keywords: ["keyword1", "keyword2"],
  siteUrl: "https://yoursite.com",
  ogImage: "/og-image.jpg"
}
```

## 📁 Project Structure

```
Portfolio/
├── app/
│   ├── api/
│   │   └── projects/
│   │       └── route.ts          # GitHub API endpoint (7-day cache)
│   ├── components/
│   │   ├── About.tsx             # About section
│   │   ├── Contact.tsx           # Contact section
│   │   ├── Hero.tsx              # Hero/landing section
│   │   ├── Navigation.tsx        # Navigation bar
│   │   ├── Projects.tsx          # Projects server component
│   │   ├── ProjectsClient.tsx    # Projects client component
│   │   ├── Skills.tsx            # Skills section
│   │   └── ...                   # Other components
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page (SSR)
├── config/
│   └── site.config.ts            # Central configuration
├── lib/
│   ├── getProjects.ts            # Data fetching utilities
│   └── utils.ts                  # Helper functions
├── public/
│   └── images/                   # Static images
├── .env.local.example            # Environment variables template
├── deploy-check.sh               # Pre-deployment verification
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── vercel.json                   # Vercel deployment config
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

Vercel is built by the Next.js team and provides the best integration.

#### Step 1: Update Configuration

Edit `config/site.config.ts` with your information:
- Personal details
- GitHub username
- Featured repositories
- Social links

#### Step 2: Test Build

```bash
npm run build
npm start
```

Visit http://localhost:3000 and verify everything works correctly.

#### Step 3: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 4: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Click **"Deploy"**
5. ✅ Your site will be live in ~2 minutes!

#### Step 5: Environment Variables (Optional)

For higher GitHub API rate limits (5000/hour vs 60/hour):

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - **Name:** `GITHUB_TOKEN`
   - **Value:** Your GitHub Personal Access Token

**To create a token:**
1. Visit https://github.com/settings/tokens
2. Generate new token (classic)
3. Select `public_repo` scope
4. Copy the token

#### Step 6: Update Production URL

After first deployment, update `config/site.config.ts`:

```typescript
seo: {
  siteUrl: "https://your-site.vercel.app"
}
```

Commit and push - Vercel auto-deploys on every push!

### Alternative: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

### Other Platforms

This portfolio works on any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🏗️ How SSR Works

This portfolio uses **Server-Side Rendering (SSR)** with **Incremental Static Regeneration (ISR)** for optimal performance.

### Architecture

1. **API Route** (`app/api/projects/route.ts`)
   - Fetches data from GitHub API
   - Caches response for 7 days
   - Returns processed project data

2. **Server Component** (`app/components/Projects.tsx`)
   - Fetches data on the server
   - Passes data to client component

3. **Client Component** (`app/components/ProjectsClient.tsx`)
   - Handles interactivity (filtering, hover effects)
   - Receives pre-fetched data as props
   - No API calls from browser

### Benefits

- ✅ **Faster Page Loads** - Data pre-rendered on server
- ✅ **Reduced API Calls** - GitHub API called once per week
- ✅ **Better SEO** - Content available to search engines
- ✅ **Lower Bandwidth** - Cached data served to all users
- ✅ **Works Without JS** - Core content loads even if JavaScript is disabled

## 🔧 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3
- **Runtime:** Node.js 18+
- **Deployment:** Vercel
- **API:** GitHub REST API v3
- **Caching:** Next.js ISR (Incremental Static Regeneration)

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Adding New Sections

1. Create component in `app/components/`
2. Import in `app/page.tsx`
3. Add configuration in `config/site.config.ts`

### Customizing Styles

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Inline Tailwind classes

## 🐛 Troubleshooting

### Projects Not Loading

1. Check GitHub username in `config/site.config.ts`
2. Verify repository names are correct
3. Check browser console for errors
4. Verify internet connection

### Build Fails

```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Rate Limit Errors

If you see "API rate limit exceeded":
1. Add `GITHUB_TOKEN` environment variable
2. This increases limit from 60/hour to 5000/hour

### Dark Mode Not Working

Clear browser cache and localStorage:
```javascript
localStorage.clear()
location.reload()
```

## 📈 Performance Metrics

- **Initial Load:** ~0.5-1 second
- **GitHub API Calls:** Once per week (cached)
- **Lighthouse Score:** 95+ (Performance)
- **Time to Interactive:** < 2 seconds
- **Bundle Size:** ~200KB (optimized)

## 🔒 Security

- ✅ No sensitive data in code
- ✅ Environment variables for tokens
- ✅ GitHub API rate limiting handled
- ✅ Public repositories only
- ✅ Secure headers configured
- ✅ Content Security Policy enabled

## 📝 Customization Tips

### Change Color Scheme

Update Tailwind colors in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color'
  }
}
```

### Add Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
  strategy="afterInteractive"
/>
```

### Custom Domain

1. Add domain in Vercel Dashboard → Settings → Domains
2. Update DNS records as instructed
3. Update `seo.siteUrl` in config

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

MIT License - Feel free to use this for your own portfolio!

## 📧 Contact

Utkarsh Gautam - [@utkarshgautam22](https://github.com/utkarshgautam22)

Project Link: [https://github.com/utkarshgautam22/Portfolio](https://github.com/utkarshgautam22/Portfolio)

---

⭐ **Star this repo if you found it helpful!**

Made with ❤️ using Next.js and TypeScript
