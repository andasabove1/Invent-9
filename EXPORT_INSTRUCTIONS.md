# How to Export and Run This App

## Method 1: Download as ZIP (Easiest)

1. **Download the code:**
   - If viewing on GitHub: Click green "Code" button → "Download ZIP"
   - If shared as files: Download all files maintaining folder structure

2. **Extract and setup:**
   ```bash
   # Extract ZIP file
   # Navigate to extracted folder
   cd inventory-app
   
   # Install dependencies
   npm install
   
   # Start the app
   npm run dev
   ```

3. **Open in browser:**
   - Go to `http://localhost:5173`
   - App should load automatically

## Method 2: Git Clone (If repository exists)

```bash
# Clone repository
git clone [REPOSITORY_URL]
cd [FOLDER_NAME]

# Install and run
npm install
npm run dev
```

## Method 3: Manual File Copy

1. **Copy all files** maintaining this structure:
   ```
   project-folder/
   ├── src/
   ├── public/
   ├── package.json
   ├── vite.config.ts
   ├── tailwind.config.ts
   ├── tsconfig.json
   └── ... (all other files)
   ```

2. **Run setup commands:**
   ```bash
   npm install
   npm run dev
   ```

## Requirements

- **Node.js** (version 16+): Download from nodejs.org
- **npm** (comes with Node.js)

## Troubleshooting

**"npm not found":**
- Install Node.js from nodejs.org
- Restart terminal/command prompt

**"Port 5173 already in use":**
- Vite will automatically use next available port
- Check terminal output for actual port

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Production Deployment

```bash
# Build for production
npm run build

# Files will be in 'dist' folder
# Upload 'dist' folder to any web hosting service
```

## Quick Test

After running `npm run dev`, you should see:
- Terminal shows "Local: http://localhost:5173"
- Browser opens to inventory management app
- App loads without errors

**Success!** Your app is now running locally.