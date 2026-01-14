# Local Images Guide

This folder contains all local images for the OSEM Yearbook.

## Folder Structure

```
public/images/
├── students/       # Student profile photos
├── chapters/       # Chapter/section images
└── README.md      # This file
```

## How to Add Local Images

### Step 1: Add Your Images

1. **Student Photos**: Place student photos in the `students/` folder
   - Example: `students/aarav-patel.jpg`
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

2. **Chapter Images**: Place chapter/section images in the `chapters/` folder
   - Example: `chapters/principal-desk.jpg`

### Step 2: Update the JSON Data File

Open `data/yearbook-data.json` and update the `imageUrl` field:

#### For Student Profiles:
```json
{
  "id": 1,
  "name": "Aarav Patel",
  "quote": "Don't watch the clock; do what it does. Keep going.",
  "imageKeyword": "portrait_man_glasses",
  "imageUrl": "/images/students/aarav-patel.jpg"
}
```

#### For Chapters:
```json
{
  "type": "chapter",
  "chapterTitle": "Principal's Desk",
  "text": "Message content...",
  "imageKeyword": "library_architecture",
  "imageUrl": "/images/chapters/principal-desk.jpg"
}
```

### Step 3: How It Works

The application checks for images in this order:

1. **If `imageUrl` is provided**: Uses the local image from the path you specified
2. **If only `imageKeyword` is provided**: Generates a placeholder image from Picsum Photos
3. **If neither is provided**: No image is displayed

## Image Requirements

- **Recommended Size**: 600x800 pixels for portraits, 600x400 for chapters
- **File Size**: Keep under 500KB for better performance
- **Format**: JPG (recommended), PNG, or WebP
- **Naming**: Use lowercase with hyphens (e.g., `john-doe.jpg`)

## Examples

### Using Local Image:
```json
"imageUrl": "/images/students/john-doe.jpg"
```

### Using Placeholder (Picsum):
```json
"imageKeyword": "portrait_woman_smile"
```

### No Image:
```json
"imageUrl": "",
"imageKeyword": ""
```

## Tips

- Keep consistent aspect ratios for all student photos
- Compress images before adding them to reduce load time
- Use meaningful file names for easy identification
- Test the yearbook after adding images to ensure they load correctly

## Need Help?

If images aren't showing up:
1. Check that the path starts with `/images/` (not `./images/` or `images/`)
2. Verify the file exists in the correct folder
3. Check the file extension matches the actual file type
4. Make sure there are no typos in the filename
