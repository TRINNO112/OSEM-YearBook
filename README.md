# OSEM Yearbook 2025

<div align="center">

**Interactive 3D Yearbook Application with Mobile Support**

*Om Shanti English Medium School - Grade 12th Batch of 2025*

**Live Demo:** [View on GitHub Pages](https://amitpathak1999.github.io/OSEM-YearBook/)

</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Book Structure](#book-structure)
- [Technology Stack](#technology-stack)
- [How It Works](#how-it-works)
- [Setup & Installation](#setup--installation)
- [Project Architecture](#project-architecture)
- [Data Structure](#data-structure)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

OSEM Yearbook 2025 is an interactive, 3D digital yearbook application that provides an immersive book-reading experience. The application features realistic page-turning animations, student profiles, and memorable moments from the graduating class.

**Dual Interface System:**
- **Desktop** (≥768px): Full 3D flipbook with realistic page-turning animation
- **Mobile** (<768px): Swipe-based single-page view optimized for touch devices

---

## ✨ Features

### Desktop Version (3D Flipbook)
- **3D Flipbook Animation**: Realistic page-turning with CSS 3D transforms
- **Dual Page View**: See left and right pages simultaneously
- **Visual Effects**: Leather-bound book cover, paper textures, shadows
- **Smooth Animations**: 1200ms cubic-bezier transitions
- **Interactive Elements**: Click to turn pages, close book button

### Mobile Version (Touch Optimized)
- **Swipe Navigation**: Left/right swipe gestures to turn pages
- **Touch Controls**: Large, accessible navigation buttons
- **Page Indicators**: Visual progress dots at bottom
- **Responsive Typography**: Scales perfectly on small screens
- **Swipe Hints**: Guidance for first-time users

### Common Features
- **Student Profiles**: Individual pages for each graduating student
- **Multiple Page Layouts**:
  - Student Profile Layout (photo + quote)
  - Full Image Layout (large photo with caption)
  - Standard Chapter Layout (text + illustration)
- **Dynamic Image Loading**: Images from keywords or direct URLs
- **Elegant Typography**: Custom fonts (Cinzel, Playfair Display, Caveat, Crimson Pro)
- **Paper Texture Effects**: Realistic book appearance with overlays
- **Memorable Quotes**: Each student has a personalized message

---

## 📚 Book Structure

The yearbook follows this flow:

### Front Matter
1. **Cover Page**: OSEM logo with "Grade 12th • 2025"
2. **Principal's Message**: Inspirational message from school leadership
3. **Class Photo**: Group photo of all students
4. **Cultural Memories**: Highlights of events and activities

### Student Profiles (Alphabetical Order)
Each student has a dedicated profile page containing:
- **Name**: Full name of the student
- **Photo**: Portrait image
- **Quote**: Personal message or memorable quote
- **Nickname**: Optional nickname (if applicable)
- **Future Goals**: Career aspirations
- **Memorable Moments**: Special memories from school

### Back Matter
1. **Farewell Chapter**: Closing message to the batch
2. **Credits**: Production credits and acknowledgments

### Sample Student Profile Structure:
```json
{
  "id": 1,
  "name": "Student Name",
  "quote": "Personal message or favorite quote",
  "imageKeyword": "Used to fetch relevant image",
  "imageUrl": "Direct image path (optional)",
  "futureGoal": "Career aspiration",
  "nickname": "Nickname (optional)",
  "memorable": "Special memory from school"
}
```

---

## 🛠 Technology Stack

### Frontend
- **React 19.2.3**: UI framework with hooks
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Vite**: Build tool and development server

### 3D & Animations
- **CSS 3D Transforms**: Hardware-accelerated page flipping
- **Tailwind Animations**: Smooth transitions and effects
- **Cubic-Bezier Curves**: Natural motion timing

### Data & Assets
- **Static JSON**: Yearbook data storage
- **Assets**: Local images and audio files
- **Unsplash/Picsum**: Dynamic image generation

### Development
- **TypeScript**: Type-safe development
- **ESLint**: Code quality
- **GitHub Actions**: CI/CD pipeline

---

## 🎮 How It Works

### Desktop 3D Flipbook
The desktop version uses CSS 3D transforms to create realistic page-turning:

1. **Book Structure**: Multiple sheets with front/back faces
2. **Page Mapping**: Each sheet shows 2 pages (left/right)
3. **3D Rotation**: Pages rotate around Y-axis (0deg to -180deg)
4. **Z-Indexing**: Proper stacking order for authentic look
5. **Perspective**: 1500px perspective for natural view
6. **Transform Origin**: Pages rotate from the spine (left edge)

**Animation Flow:**
```
User clicks → Audio plays → Page rotates → Z-index updates → Animation completes
```

### Mobile Swipe Navigation
The mobile version simplifies the experience:

1. **Single Page View**: Shows one page at a time
2. **Swipe Detection**: Tracks touch start/end positions
3. **Threshold Check**: Minimum 50px swipe distance
4. **Direction Detection**: Left swipe = next, Right swipe = previous
5. **Animation**: Fade + slide effect (500ms)
6. **Buttons Fallback**: Navigation buttons always available

**Touch Flow:**
```
Touch start → Track position → Touch end → Calculate distance → Check threshold → Navigate
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/OSEM-YearBook.git
cd OSEM-YearBook
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

### Configuration

#### GitHub Pages Setup
The project is configured for GitHub Pages deployment:

1. **Update `vite.config.ts`:**
```typescript
export default defineConfig({
  base: '/OSEM-YearBook/', // Your repo name
  plugins: [react()],
})
```

2. **GitHub Actions** (`.github/workflows/deploy.yml`):
   - Automatically deploys on push to main branch
   - Builds and deploys to gh-pages branch

---

## 🏗 Project Architecture

```
OSEM-YearBook/
├── public/
│   ├── images/
│   │   ├── chapters/          # Chapter images
│   │   └── students/          # Student photos
│   └── sounds/
│       └── page-flip.mp3      # Page turn audio
├── src/
│   ├── components/
│   │   ├── Home.tsx           # Landing page
│   │   ├── Flipbook.tsx       # Desktop 3D version
│   │   ├── MobileFlipbook.tsx # Mobile version
│   │   ├── BookPage.tsx       # Individual page component
│   │   └── BookCover.tsx      # Cover design
│   ├── data/
│   │   └── yearbook-data.json # All book content
│   ├── utils/
│   │   └── imageUtils.ts      # Image path resolution
│   ├── services/
│   │   └── geminiService.ts   # AI service (deprecated)
│   ├── types.ts               # TypeScript interfaces
│   └── App.tsx                # Main app component
├── index.html                 # Entry HTML
├── package.json               # Dependencies
├── vite.config.ts             # Build configuration
├── tsconfig.json              # TypeScript config
└── tailwind.config.js         # Styling config
```

---

## 📊 Data Structure

### Main Structure (`yearbook-data.json`)

```typescript
interface YearbookData {
  metadata: {
    schoolName: string;
    yearbook: {
      title: string;
      subtitle: string;
      year: number;
      batch: string;
    }
  };
  chapters: Chapter[];      // Front matter chapters
  students: Student[];      // Student profiles
  farewell: Chapter;        // Closing chapter
  credits?: Chapter;        // Optional credits
}

interface Chapter {
  type: 'chapter';
  chapterTitle: string;
  text: string;
  imageKeyword?: string;
  imageUrl?: string;
  layout?: 'standard' | 'full-image';
  order?: number;
}

interface Student {
  id: number;
  name: string;
  quote: string;
  imageKeyword: string;
  imageUrl?: string;
  futureGoal?: string;
  nickname?: string;
  memorable?: string;
}
```

### Component Props

```typescript
interface FlipbookProps {
  story: Story;
  onClose: () => void;
}

interface Story {
  title: string;
  author: string;
  pages: StoryPage[];
}

interface StoryPage {
  type?: 'chapter' | 'profile';
  layout?: 'standard' | 'full-image';
  text: string;
  imageKeyword?: string;
  imageUrl?: string;
  chapterTitle?: string;
  studentName?: string;
}
```

---

## 📦 Deployment

### GitHub Pages (Recommended)

The project uses GitHub Actions for automatic deployment:

1. **Workflow file**: `.github/workflows/deploy.yml`
2. **Trigger**: Push to main branch
3. **Process**:
   - Checks out code
   - Sets up Node.js
   - Installs dependencies
   - Builds project
   - Deploys to gh-pages branch
4. **Result**: Site available at `https://yourusername.github.io/OSEM-YearBook/`

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy using gh-pages
npm run deploy
```

### Netlify/Vercel Alternative

1. **Connect repository** to Netlify/Vercel
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`
4. **Environment variable**: `BASE_URL=/`

---

## 🎓 Customization Guide

### Adding New Students

1. **Add student data** to `data/yearbook-data.json`:
```json
{
  "id": 25,
  "name": "New Student",
  "quote": "Favorite quote or message",
  "imageKeyword": "portrait_student",
  "futureGoal": "Career aspiration",
  "nickname": "Nickname (optional)",
  "memorable": "Special memory"
}
```

2. **Add student photo** to `public/images/students/`:
   - Name format: `student-name.jpg`
   - Update `imageUrl` in data: `/images/students/student-name.jpg`

3. **Rebuild and deploy**

### Adding New Chapters

1. **Add chapter** to `chapters` array in JSON:
```json
{
  "type": "chapter",
  "chapterTitle": "New Chapter",
  "text": "Chapter content here",
  "imageKeyword": "chapter_theme",
  "layout": "full-image"
}
```

2. **Add image** to `public/images/chapters/`
3. **Update order** property for sequencing

### Styling Changes

Modify Tailwind classes in components:
- **Colors**: Edit color values in component files
- **Fonts**: Update font families in Tailwind config
- **Animations**: Modify transition classes and duration

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Student search/filter functionality
- [ ] Page bookmark system
- [ ] Social sharing for individual pages
- [ ] Multi-language support
- [ ] Video embedded pages
- [ ] Background music player
- [ ] Print-friendly version
- [ ] PDF export functionality
- [ ] Animated page corners on hover
- [ ] Virtual signatures page

### Technical Improvements
- [ ] Service worker for offline support
- [ ] Image optimization and lazy loading
- [ ] Performance monitoring
- [ ] Accessibility enhancements (ARIA labels)
- [ ] Unit tests with Jest/React Testing Library
- [ ] E2E tests with Cypress/Playwright

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature-name`
6. Create Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- Om Shanti English Medium School
- Class of 2025
- All teachers and staff
- Contributors (Teachers) and developer (Trinno)

---

## 📞 Support

For support or questions:
- Create an issue on GitHub
- Contact: none!

---

<div align="center">

**Made with ❤️ for OSEM Class of 2025**

*May your journey ahead be as inspiring as your time here*

</div>
