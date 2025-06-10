# Troubleshooting Guide

## Git Repository Import Issues

### Common Error: Authentication/Redirect Issues

**Error Message:**
```
Failed to clone source: Clone error: Cloning into bare repository './git-data/source.git'...
fatal: unable to update url base from redirection:
  asked for: ***famous.ai/project/68477bb4e48867a14bce5883/info/refs?service=git-upload-pack
   redirect: ***famous.ai/login?redirect=https%3A%2F%2Ffamous.ai%2Fproject%2F...
```

**Root Cause:**
This error occurs when trying to import from a private repository or a repository that requires authentication. The system attempts to access the repository but gets redirected to a login page.

**Solutions:**

1. **Use a Public Repository**
   - Ensure the repository you're trying to import is public
   - Check repository settings on GitHub/GitLab/Bitbucket
   - Make the repository public if you own it

2. **Verify Repository URL**
   - Use the correct HTTPS URL format:
     - ✅ `https://github.com/username/repository.git`
     - ✅ `https://github.com/username/repository`
     - ❌ `git@github.com:username/repository.git` (SSH not supported)

3. **Check Repository Accessibility**
   - Open the repository URL in your browser
   - Ensure you can access it without logging in
   - Verify the repository exists and hasn't been deleted

### Other Common Issues

#### Invalid Repository URL
**Error:** "Invalid repository URL format"
**Solution:**
- Use full HTTPS URLs
- Supported formats:
  - `https://github.com/user/repo`
  - `https://github.com/user/repo.git`
  - `https://gitlab.com/user/repo`
  - `https://bitbucket.org/user/repo`

#### Network/Timeout Issues
**Error:** "Network timeout or repository not accessible"
**Solutions:**
- Check your internet connection
- Try again after a few minutes
- Verify the repository URL is correct
- Ensure the repository server is accessible

#### Repository Not Found
**Error:** "Repository not found" or "404 error"
**Solutions:**
- Double-check the repository URL
- Verify the repository name and owner
- Ensure the repository hasn't been renamed or deleted
- Check if the repository is private (make it public if needed)

## Application Issues

### Build Errors

**Issue:** TypeScript compilation errors
**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for type errors
npm run build
```

**Issue:** Missing dependencies
**Solutions:**
```bash
# Install missing dependencies
npm install

# Or install specific packages
npm install @types/react @types/react-dom
```

### Runtime Errors

**Issue:** Component not found or import errors
**Solutions:**
- Check file paths in import statements
- Ensure all referenced components exist
- Verify component exports are correct

**Issue:** Styling issues
**Solutions:**
- Ensure Tailwind CSS is properly configured
- Check if CSS files are imported correctly
- Verify component class names

## Development Environment

### Node.js Version Issues
**Requirement:** Node.js 16 or higher
**Check version:**
```bash
node --version
```
**Update if needed:**
- Use nvm: `nvm install 18 && nvm use 18`
- Or download from nodejs.org

### Port Conflicts
**Issue:** Port 5173 already in use
**Solutions:**
```bash
# Use different port
npm run dev -- --port 3000

# Or kill process using port 5173
lsof -ti:5173 | xargs kill -9
```

## Deployment Issues

### Build Failures
**Common causes:**
- TypeScript errors
- Missing environment variables
- Import path issues

**Solutions:**
- Fix TypeScript errors locally first
- Set required environment variables
- Use relative imports for local files

### Routing Issues (SPA)
**Issue:** 404 errors on page refresh
**Solution:** Configure your hosting provider for SPA routing:

**Vercel:** Add `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Netlify:** Add `_redirects` file:
```
/*    /index.html   200
```

## Getting Help

1. **Check Console Errors**
   - Open browser developer tools
   - Look for error messages in Console tab
   - Check Network tab for failed requests

2. **Verify Configuration**
   - Check `package.json` for correct dependencies
   - Verify `tsconfig.json` settings
   - Ensure `tailwind.config.ts` is properly configured

3. **Test Locally**
   - Always test changes locally before deploying
   - Use `npm run build` to check for build errors
   - Test with `npm run preview` to simulate production

4. **Common Commands for Debugging**
   ```bash
   # Clear everything and reinstall
   rm -rf node_modules package-lock.json .next dist
   npm install
   
   # Check for issues
   npm run lint
   npm run build
   
   # Start fresh development server
   npm run dev
   ```

If issues persist, check the browser console for specific error messages and ensure all dependencies are properly installed.