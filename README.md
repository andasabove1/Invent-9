# Inventory Management App

A modern React inventory management application built with TypeScript, Vite, and Tailwind CSS.

## Features

- Add and manage inventory items
- Photo upload for items
- Expiry date tracking and notifications
- AI-powered descriptions and tags
- Git repository import functionality (with enhanced error handling)
- Responsive design with dark/light theme support

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode
To run the app in development mode with hot reloading:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

#### Production Build
To build the app for production:
```bash
npm run build
```
This creates a `dist` folder with the production-ready files.

#### Preview Production Build
To preview the production build locally:
```bash
npm run preview
```

## Git Repository Import

The app includes functionality to import code from Git repositories. **Important notes:**

- Only **public repositories** can be imported
- Private repositories require authentication and may cause import failures
- Supported platforms: GitHub, GitLab, Bitbucket
- If you encounter authentication errors or redirects, ensure the repository is public

### Common Import Issues

**Error: "Authentication required" or "redirect" errors**
- Solution: Use a public repository URL
- Ensure the repository doesn't require login to access

**Error: "Invalid repository URL"**
- Solution: Use the full HTTPS URL (e.g., `https://github.com/user/repo.git`)
- Verify the repository exists and is accessible

### Deployment Options

#### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Deploy automatically with each push

#### Option 2: Netlify
1. Run `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Or connect your Git repository for automatic deployments

#### Option 3: Static Hosting
1. Run `npm run build`
2. Upload the `dist` folder to your hosting provider
3. Configure your hosting to serve the `index.html` file for all routes

#### Option 4: Docker
Create a `Dockerfile` in the project root:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Then build and run:
```bash
docker build -t inventory-app .
docker run -p 3000:80 inventory-app
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── GitImportButton.tsx
│   ├── GitImportDialog.tsx
│   └── ...
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── services/           # API and service functions
│   └── gitService.ts   # Git import functionality
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI components
- React Router
- React Hook Form
- Zod validation
- Lucide React icons
- Sonner (toast notifications)

## Troubleshooting

### Git Import Issues
- Ensure repository URLs are public and accessible
- Check that the repository exists and the URL is correct
- For private repositories, consider making them public or using alternative import methods

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Ensure Node.js version is 16 or higher
- Check for TypeScript errors: `npm run build`

## License

This project is private and not licensed for public use.