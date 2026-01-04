# Deployment Guide - OSEM Yearbook 2025

## 🚀 Deploy to GitHub Pages

### Method 1: Using GitHub Pages (Recommended)

#### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** button (top right) → **"New repository"**
3. Repository name: `osem-yearbook-2025` (or any name you prefer)
4. Description: `OSEM Yearbook 2025 - Interactive 3D Digital Yearbook`
5. Set to **Public** (required for free GitHub Pages)
6. **DO NOT** initialize with README (we already have files)
7. Click **"Create repository"**

#### Step 2: Push Your Code to GitHub

Open your terminal in the project folder and run these commands:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - OSEM Yearbook 2025"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/osem-yearbook-2025.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/dist`
5. Click **"Save"**
6. Wait 1-2 minutes for deployment

Your site will be live at:
```
https://YOUR_USERNAME.github.io/osem-yearbook-2025/
```

---

### Method 2: Deploy Entire Repo (Alternative)

If you want to deploy the entire repo instead of just the `dist` folder:

1. Follow Steps 1-2 above (create repo and push code)
2. In GitHub Pages settings, select:
   - Branch: `main`
   - Folder: `/ (root)`
3. GitHub will automatically build and deploy using Vite

---

### Method 3: Using GitHub Actions (Auto-Deploy on Push)

Create a file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

This will automatically rebuild and deploy whenever you push to `main` branch.

---

## 🌐 Other Deployment Options

### Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Deploy"**

Your site will be live at: `https://your-project.vercel.app`

### Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repository
5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

Your site will be live at: `https://your-project.netlify.app`

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Select:
# - Public directory: dist
# - Single-page app: Yes
# - GitHub auto-deploys: Optional

# Deploy
firebase deploy
```

---

## 📝 Important Notes

### Before Deploying:

1. **Build the project** (already done):
   ```bash
   npm run build
   ```

2. **Check the dist folder** exists with these files:
   ```
   dist/
   ├── index.html
   ├── data/
   │   └── yearbook-data.json
   └── assets/
       └── index-[hash].js
   ```

3. **Test locally** before deploying:
   ```bash
   npm run preview
   ```
   Opens at: `http://localhost:4173`

### After Deploying:

1. **Custom Domain** (Optional):
   - In GitHub Pages settings, add your custom domain
   - Update DNS records with your domain provider

2. **Update Data**:
   - Edit `data/yearbook-data.json`
   - Rebuild: `npm run build`
   - Push changes: `git push`

3. **Analytics** (Optional):
   - Add Google Analytics to `index.html`
   - Track visitor statistics

---

## 🔧 Troubleshooting

### Issue: Page shows blank/white screen

**Solution 1**: Update `vite.config.ts` with correct base path:

```typescript
export default defineConfig(({ mode }) => {
  return {
    base: '/osem-yearbook-2025/', // Replace with your repo name
    // ... rest of config
  }
});
```

Then rebuild: `npm run build`

**Solution 2**: Check browser console for errors (F12 → Console tab)

### Issue: Images not loading

- Ensure images are in the `public` folder or use absolute URLs
- Check if external image URLs are accessible

### Issue: Data not loading

- Verify `data/yearbook-data.json` is copied to `dist/data/`
- Check if JSON file has valid syntax

### Issue: 404 Error on routes

- GitHub Pages supports single-page apps
- Ensure `index.html` redirects are set up correctly

---

## 📱 Share Your Yearbook

Once deployed, share your yearbook link:

```
https://YOUR_USERNAME.github.io/osem-yearbook-2025/
```

Or create a short URL using:
- [bit.ly](https://bit.ly)
- [tinyurl.com](https://tinyurl.com)

---

## 🎉 Success!

Your OSEM Yearbook 2025 is now live online!

**Created by**: Trinno Asphalt (Grade 11th)
**For**: Grade 12th Batch of 2025

For support or issues, refer to the main [README.md](README.md)
