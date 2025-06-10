# Deployment Guide

## Quick Start

To run this inventory management app locally:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Export Options

### 1. Download as ZIP
- Click the green "Code" button on GitHub
- Select "Download ZIP"
- Extract and follow Quick Start steps

### 2. Git Clone
```bash
git clone [repository-url]
cd [project-folder]
npm install
npm run dev
```

### 3. Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Hosting Options

### Vercel (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Deploy automatically

### Netlify
1. Drag and drop `dist` folder after `npm run build`
2. Or connect GitHub repo for auto-deploy

### Static File Server
1. Run `npm run build`
2. Serve the `dist` folder with any web server

## Environment Setup

No environment variables required for basic functionality.
Optional Supabase integration requires:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Troubleshooting

- **Port 5173 in use**: Vite will automatically use next available port
- **Build errors**: Run `npm run lint` to check for issues
- **Missing dependencies**: Delete `node_modules` and run `npm install`