# 🚀 Quick Deploy Guide - OSEM Yearbook

## ✅ Fixed Issues:
1. ✅ Removed `dist` from `.gitignore` - now it will upload to GitHub
2. ✅ Added base path config - fixes blank page issue
3. ✅ Rebuilt with correct settings

---

## 📝 IMPORTANT: Update Repository Name

**Before pushing to GitHub**, you need to update the base path in `vite.config.ts` (line 9):

```typescript
base: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

**Replace `YOUR-REPO-NAME`** with your **actual GitHub repository name**.

For example:
- If your repo is: `https://github.com/TrinnoAsphalt/osem-yearbook-2025`
- Change line 9 to: `base: process.env.NODE_ENV === 'production' ? '/osem-yearbook-2025/' : '/',`

Then rebuild:
```bash
npm run build
```

---

## 🎯 Deploy Steps (5 Minutes)

### Step 1: Update vite.config.ts (if needed)
1. Open `vite.config.ts`
2. Line 9: Change `/OSEM-YearBook/` to `/your-repo-name/`
3. Save the file
4. Run: `npm run build`

### Step 2: Push to GitHub

Run these commands in your terminal (Git Bash or PowerShell):

```bash
# Check git status
git status

# Add all files (including dist folder)
git add .

# Commit with message
git commit -m "Add dist folder for deployment - Created by Trinno Asphalt"

# Push to GitHub
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** tab (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**:
   - Branch: `main`
   - Folder: `/dist` (if available) OR `/ (root)` (if dist option not showing)
5. Click **Save**
6. Wait 2-3 minutes

### Step 4: Check Your Site

Your site will be live at:
```
https://YOUR-USERNAME.github.io/your-repo-name/
```

Example:
```
https://TrinnoAsphalt.github.io/osem-yearbook-2025/
```

---

## 🐛 Troubleshooting

### Problem 1: "dist folder not showing in GitHub"
**Solution:**
- Make sure you ran `git add .` (includes the period)
- Check if dist folder exists locally: `ls dist`
- Verify .gitignore doesn't block it (line 11 should say `# dist`)

### Problem 2: "Blank/Black page after deployment"
**Solution:**
- Update `vite.config.ts` line 9 with correct repo name
- Rebuild: `npm run build`
- Push again: `git add . && git commit -m "Fix base path" && git push`

### Problem 3: "dist folder option not showing in GitHub Pages"
**Solution:**
- Use `/ (root)` option instead
- OR wait a few minutes and refresh the settings page
- GitHub Pages will still work from root folder

### Problem 4: "404 Error on GitHub Pages"
**Solution:**
- Check if GitHub Pages is enabled (Settings → Pages)
- Verify branch is set to `main`
- Check if repo is Public (not Private)
- Wait 2-3 minutes after enabling

---

## 📱 After Successful Deploy

### Share Your Link:
```
https://YOUR-USERNAME.github.io/your-repo-name/
```

### Create Short URL:
- Use [bit.ly](https://bit.ly)
- Example: `bit.ly/osem2025`

### Update Data:
1. Edit `data/yearbook-data.json`
2. Rebuild: `npm run build`
3. Push: `git add . && git commit -m "Update student data" && git push`
4. Wait 1-2 minutes for GitHub Pages to update

---

## ✨ Success Checklist

- [ ] Updated vite.config.ts with correct repo name
- [ ] Ran `npm run build`
- [ ] Pushed to GitHub with `git push`
- [ ] Enabled GitHub Pages in Settings
- [ ] Selected correct branch and folder
- [ ] Waited 2-3 minutes
- [ ] Tested the live URL
- [ ] Shared with friends! 🎉

---

## 💡 Quick Commands Reference

```bash
# Rebuild project
npm run build

# Check git status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push origin main

# View git remote
git remote -v
```

---

## 🆘 Still Having Issues?

1. Check the main [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions
2. Check the [README.md](README.md) for project documentation
3. Make sure your repository is **Public** (not Private)
4. Verify you have internet connection
5. Try clearing browser cache (Ctrl + Shift + Delete)

---

**Created by:** Trinno Asphalt (Grade 11th)
**For:** OSEM Grade 12th Batch 2025

Good luck with the deployment, Trinno! 🚀
