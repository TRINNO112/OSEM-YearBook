# Simple Guide - How to Add Images

## Understanding the Folders (SIMPLE EXPLANATION)

Your yearbook has TWO types of pages:

### 1. **Student Profiles** 👨‍🎓👩‍🎓
- Pages with student photos, names, and quotes
- Their photos go in: `public/images/students/`
- Example: `students/john-doe.jpg`

### 2. **Special Pages** (We call them "Chapters") 📖
- ANY page that is NOT a student profile
- Examples:
  - Principal's message
  - Farewell message
  - Your developer/credits page
  - Welcome message
  - Any intro/outro pages
- Their images go in: `public/images/chapters/`
- Example: `chapters/Trinno.png` (your developer image)

---

## Your Developer Image is Now Set Up! ✅

I've already done this for you:

1. ✅ Moved `Trinno.png` from `students/` to `chapters/` folder
2. ✅ Updated the JSON file to use your image
3. ✅ Your image will now appear on the last page (Credits page)

**What I did in the JSON file:**
```json
"credits": {
  "type": "chapter",
  "chapterTitle": "Credits",
  "text": "This digital yearbook was crafted with care and creativity by Trinno Asphalt.",
  "imageUrl": "/images/chapters/Trinno.png"  ← YOUR IMAGE HERE!
}
```

---

## How to Add More Images (Step by Step)

### FOR STUDENT PHOTOS:

**Step 1:** Put the photo here
```
public/images/students/student-name.jpg
```

**Step 2:** Open `data/yearbook-data.json`

**Step 3:** Find the student and add this line:
```json
{
  "id": 1,
  "name": "Student Name",
  "quote": "Their quote",
  "imageUrl": "/images/students/student-name.jpg"  ← ADD THIS LINE
}
```

**That's it!** The student's real photo will appear.

---

### FOR SPECIAL PAGES (like your developer page):

**Step 1:** Put the image here
```
public/images/chapters/image-name.jpg
```

**Step 2:** Open `data/yearbook-data.json`

**Step 3:** Find the chapter/special page and add:
```json
{
  "type": "chapter",
  "chapterTitle": "Page Title",
  "text": "Page content",
  "imageUrl": "/images/chapters/image-name.jpg"  ← ADD THIS LINE
}
```

---

## Quick Reference

| What is it? | Where does image go? | Example |
|-------------|---------------------|---------|
| Student photo | `public/images/students/` | `students/aarav.jpg` |
| Developer photo (YOU) | `public/images/chapters/` | `chapters/Trinno.png` ✅ |
| Principal's photo | `public/images/chapters/` | `chapters/principal.jpg` |
| Farewell image | `public/images/chapters/` | `chapters/farewell.jpg` |
| Any special page | `public/images/chapters/` | `chapters/whatever.jpg` |

---

## Test It Now!

Run this command:
```bash
npm run dev
```

Then:
1. Open the yearbook
2. Go to the **last page** (Credits page)
3. You should see **your Trinno.png image**!

---

## Important Notes

- **Students folder** = Only for student profile photos
- **Chapters folder** = Everything else (developer, principal, farewell, etc.)
- Image path in JSON must start with `/images/` (with forward slash)
- Image path example: `"/images/chapters/Trinno.png"` ✅
- Wrong: `"images/chapters/Trinno.png"` ❌ (missing first slash)

---

Need help? Just ask!
