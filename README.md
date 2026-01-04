# OSEM Yearbook 2025

<div align="center">

**Interactive 3D Yearbook Application**

*Om Shanti English Medium School - Grade 12th Batch of 2025*

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Architecture](#project-architecture)
- [How It Works](#how-it-works)
- [Technology Stack](#technology-stack)
- [Setup & Installation](#setup--installation)
- [Data Structure](#data-structure)
- [Component Breakdown](#component-breakdown)
- [Future Enhancements](#future-enhancements)

---

## Overview

OSEM Yearbook 2025 is an interactive, 3D digital yearbook application that provides an immersive book-reading experience. The application features realistic page-turning animations, student profiles, and memorable moments from the graduating class.

**Live Demo:** [View in AI Studio](https://ai.studio/apps/drive/1uU3RCCrsjeU69r3nqdgGX6Hpli3FbaJK)

---

## Features

- **3D Flipbook Animation**: Realistic page-turning with CSS 3D transforms
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Student Profiles**: Individual pages for each graduating student
- **Multiple Page Layouts**:
  - Student Profile Layout (photo + quote)
  - Full Image Layout (large photo with caption)
  - Standard Chapter Layout (text + illustration)
- **Dynamic Image Loading**: Images generated based on keywords
- **Elegant Typography**: Custom fonts (Cinzel, Playfair Display, Crimson Pro)
- **Paper Texture Effects**: Realistic book appearance with texture overlays
- **Smooth Animations**: Entrance/exit animations with easing

---

## Project Architecture

```
OSEM YearBook/
│
├── index.html              # Entry point with Tailwind CDN & fonts
├── index.tsx               # React root mount
├── App.tsx                 # Main application controller
├── types.ts                # TypeScript type definitions
├── metadata.json           # Project metadata
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies & scripts
│
├── components/
│   ├── Home.tsx            # Landing page with yearbook data
│   ├── Flipbook.tsx        # 3D book rendering & page navigation
│   ├── BookPage.tsx        # Individual page renderer
│   └── BookCover.tsx       # Front & back cover components
│
└── services/
    └── geminiService.ts    # Deprecated AI service (not used)
```

---

## How It Works

### 1. Application Flow

```
User loads page
    ↓
index.html (loads React & Tailwind)
    ↓
index.tsx (mounts React app)
    ↓
App.tsx (manages view state)
    ↓
┌─────────────────┬──────────────────┐
│   HOME VIEW     │    BOOK VIEW     │
│   (Home.tsx)    │  (Flipbook.tsx)  │
└─────────────────┴──────────────────┘
```

### 2. View Management (App.tsx)

The application has **two main views**:

- **`AppView.HOME`**: Landing page displaying the yearbook cover and "Open Yearbook" button
- **`AppView.BOOK`**: 3D flipbook view with page navigation

**State Management:**
```typescript
const [view, setView] = useState<AppView>(AppView.HOME);
const [currentStory, setCurrentStory] = useState<Story | null>(null);
```

**View Transitions:**
- User clicks "Open Yearbook" → triggers `handleOpenBook()`
- Passes yearbook data to Flipbook component
- User clicks "Close Book" → returns to HOME view

### 3. Data Structure (Home.tsx)

All yearbook content is currently **hardcoded** in `Home.tsx` as a `Story` object:

```typescript
const OSEM_YEARBOOK: Story = {
  title: "OSEM",
  author: "Grade 12th • 2025",
  pages: [
    {
      type: 'chapter',
      chapterTitle: "Principal's Desk",
      text: "Message content...",
      imageKeyword: "library_architecture"
    },
    {
      type: 'profile',
      studentName: "Aarav Patel",
      text: "Student quote...",
      imageKeyword: "portrait_man_glasses"
    },
    // ... more pages
  ]
};
```

**Current Pages:**
- 3 Chapter pages (Principal's Desk, Class of 2025, Cultural Echoes)
- 4 Student Profile pages
- 1 Farewell page
- **Total: 8 pages**

### 4. Page Rendering Logic (Flipbook.tsx)

**Sheet Calculation:**
```typescript
const totalSheets = Math.ceil(story.pages.length / 2) + 2;
```

- Each physical sheet has **2 sides** (front & back)
- Sheet 0: Front = Cover, Back = Page 1
- Sheet 1: Front = Page 2, Back = Page 3
- Last Sheet: Front = Last Page, Back = Back Cover

**3D Transformation:**
```typescript
transform: `translate3d(0,0,${zOffset}px) rotateY(${rotation}deg)`
```

- Pages rotate 180° on Y-axis when flipped
- Z-offset creates physical thickness
- Stacking order (z-index) creates realistic layering

**Navigation:**
- `handleNext()`: Flips to next page if available
- `handlePrev()`: Flips to previous page if available
- Pages can also be clicked to flip

### 5. Page Layout Types (BookPage.tsx)

**a) Profile Layout (`type: 'profile'`):**
- Polaroid-style photo frame (rotated -2°)
- Student name in Cinzel font
- Quote with decorative quotation marks
- Signature line

**b) Full Image Layout (`layout: 'full-image'`):**
- Large photo with border frame
- Decorative corner accents
- Caption below image

**c) Standard Chapter Layout (default):**
- Header with chapter title & page number
- Image area (if imageKeyword provided)
- Text content with first-letter styling
- Footer decoration

### 6. Image Loading System

Images are dynamically loaded from **Picsum Photos API**:

```typescript
const imageSource = data.imageUrl
  ? data.imageUrl
  : data.imageKeyword
    ? `https://picsum.photos/seed/${data.imageKeyword + pageNumber}/600/800`
    : null;
```

**Image Sources:**
1. **Direct URL**: If `imageUrl` is provided, use it directly
2. **Keyword Seed**: If `imageKeyword` is provided, generate from Picsum
3. **Fallback**: No image displayed

**Preloading (Flipbook.tsx:40-47):**
```typescript
useEffect(() => {
  story.pages.forEach((page, i) => {
    if(page.imageKeyword) {
      const img = new Image();
      img.src = `https://picsum.photos/seed/${page.imageKeyword + (i+1)}/600/400`;
    }
  })
}, [story]);
```

---

## Technology Stack

### Core
- **React 19.2.3** - UI library
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool & dev server

### Styling
- **Tailwind CSS** (CDN) - Utility-first CSS
- **Custom Fonts**:
  - Cinzel - Headers & decorative text
  - Playfair Display - Titles & italics
  - Crimson Pro - Body text
- **CSS 3D Transforms** - Page flipping animations

### Assets
- **Picsum Photos** - Dynamic image generation
- **Unsplash** - Background images
- **Transparent Textures** - Paper/leather textures

### Development
- **@vitejs/plugin-react** - React support in Vite
- **Node.js** - Runtime environment

---

## Setup & Installation

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   cd "C:\Users\Amit Pathak\Documents\OSEM YearBook"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment (optional)**
   - Set `GEMINI_API_KEY` in `.env.local` if using AI features (currently disabled)

4. **Run development server**
   ```bash
   npm run dev
   ```
   - Server starts at `http://localhost:5173` (or next available port)

5. **Build for production**
   ```bash
   npm run build
   ```
   - Output in `dist/` folder

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## Data Structure

### Type Definitions (types.ts)

**AppView Enum:**
```typescript
export enum AppView {
  HOME = 'HOME',
  BOOK = 'BOOK',
}
```

**StoryPage Interface:**
```typescript
export interface StoryPage {
  type?: 'chapter' | 'profile';           // Page type
  layout?: 'standard' | 'full-image';     // Layout style
  text: string;                            // Main content
  imageKeyword?: string;                   // Picsum seed keyword
  imageUrl?: string;                       // Direct image URL
  chapterTitle?: string;                   // Header title
  studentName?: string;                    // Student name (profiles only)
}
```

**Story Interface:**
```typescript
export interface Story {
  title: string;        // Book title
  author: string;       // Author/subtitle
  pages: StoryPage[];   // Array of pages
}
```

**FlipbookProps Interface:**
```typescript
export interface FlipbookProps {
  story: Story;         // Yearbook data
  onClose: () => void;  // Close handler
}
```

---

## Component Breakdown

### 1. App.tsx (Main Controller)
**Lines: 37 | State Management**

- Manages application view state (HOME/BOOK)
- Handles view transitions
- Passes data between components

**Key Functions:**
- `handleOpenBook(story)`: Opens flipbook view
- `handleCloseBook()`: Returns to home view

---

### 2. Home.tsx (Landing Page)
**Lines: 158 | Data Source**

- Displays landing page with school emblem
- Contains **HARDCODED** yearbook data (lines 8-66)
- Animated background with floating particles
- "Open Yearbook" button

**Current Limitation:**
All 8 pages are manually defined here. For 65 students, this needs to be refactored to use **JSON data file**.

---

### 3. Flipbook.tsx (3D Book Renderer)
**Lines: 240 | Core Animation Engine**

**Key Features:**
- 3D page flipping with CSS transforms
- Sheet calculation & mapping
- Navigation controls (Prev/Next/Click)
- Entrance animations
- Image preloading

**Important Constants:**
```typescript
const totalSheets = Math.ceil(story.pages.length / 2) + 2;
const THICKNESS = 4; // Physical page thickness in pixels
```

**Animation States:**
- `currentPageIndex`: Current visible sheet
- `animateIn`: Controls entrance animation
- `isFlipped`: Whether sheet has been turned

---

### 4. BookPage.tsx (Page Renderer)
**Lines: 152 | Layout Engine**

Renders individual pages based on type:

**Profile Pages:**
- Polaroid photo frame with hover rotation
- Student name & decorative divider
- Quote with quotation marks
- Signature line

**Full Image Pages:**
- Large framed photo
- Corner accent decorations
- Caption text

**Chapter Pages:**
- Header with title & page number
- Image with hover zoom
- Text with drop-cap first letter
- Footer decoration (SVG)

**Visual Effects:**
- Paper texture overlay
- Binding shadow gradient
- Sepia/grayscale filters on images

---

### 5. BookCover.tsx (Cover Component)
**Lines: 79 | Front & Back Covers**

**Front Cover:**
- School crest symbol
- School name
- Book title (OSEM)
- Author line (Grade 12th • 2025)
- Est. 2025 footer

**Back Cover:**
- Omega symbol
- OSEM Yearbook text
- Class of 2025

**Visual Effects:**
- Leather texture overlay
- Multiple golden border frames
- Decorative corner elements
- Inset shadow for depth

---

### 6. geminiService.ts (Deprecated)
**Lines: 8 | Not Used**

Originally intended for AI story generation. Currently throws error if called. Can be removed or reactivated for future features.

---

## Future Enhancements

### Immediate Needs (Recommended)

1. **Refactor to JSON Data Structure**
   - Move student data to `students.json`
   - Support 65+ students without code changes
   - Easier data management

2. **Add Vertical Scrollbar to Home Page**
   - Enable scrolling on landing page
   - Better navigation for longer content

### Planned Features

3. **Search & Filter**
   - Search students by name
   - Filter by interests/activities
   - Jump to specific page

4. **Download/Share**
   - Export pages as PDF
   - Share individual profiles
   - Print-friendly version

5. **Admin Panel**
   - Add/edit students via UI
   - Upload photos
   - Preview changes

6. **Enhanced Profiles**
   - Multiple photos per student
   - Yearbook signatures
   - Contact information
   - Social media links

7. **Interactive Features**
   - Comments/messages
   - Photo galleries
   - Video messages
   - QR codes for digital content

8. **Performance Optimization**
   - Lazy load images
   - Virtual scrolling for large datasets
   - Service worker for offline access

---

## Current Limitations

1. **Static Data**: All content hardcoded in `Home.tsx`
2. **Limited Scale**: Only 8 pages defined (need 65+ for all students)
3. **No Data Persistence**: No backend/database
4. **Manual Updates**: Requires code changes to add students
5. **Fixed Images**: Random images from Picsum (not actual student photos)

---

## Contributing

To add students or modify content:

1. Edit `components/Home.tsx`
2. Locate `OSEM_YEARBOOK` object (lines 8-66)
3. Add pages to the `pages` array:
   ```typescript
   {
     type: 'profile',
     studentName: "New Student",
     chapterTitle: "Student Profile",
     text: "Student quote or message",
     imageKeyword: "portrait_description"
   }
   ```

**Note:** This process will be simplified once JSON data structure is implemented.

---

## Credits

**School:** Om Shanti English Medium School
**Batch:** Grade 12th - 2025
**Application Type:** Digital Yearbook
**Framework:** React + TypeScript + Vite

---

## License

This project is created for Om Shanti English Medium School.

---

## Contact & Support

For issues or questions about this yearbook application, please refer to the project repository or contact the development team.

---

**Last Updated:** January 2026
