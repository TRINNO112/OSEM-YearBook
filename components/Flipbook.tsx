import React, { useState, useEffect } from 'react';
import { FlipbookProps } from '../types';
import { BookCover } from './BookCover';
import { BookPage } from './BookPage';

export const Flipbook: React.FC<FlipbookProps> = ({ story, onClose }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [animateIn, setAnimateIn] = useState(false); // State for entrance animation
  
  // LOGIC:
  // Sheet 0: Front = Cover, Back = Page 0
  // Sheet 1: Front = Page 1, Back = Page 2
  // ...
  
  const totalSheets = Math.ceil(story.pages.length / 2) + 2; 
  const THICKNESS = 4;

  const handleNext = () => {
    if (currentPageIndex < totalSheets - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  // Trigger entrance animation on mount
  useEffect(() => {
    // Small delay to ensure render happens before transition
    const timer = setTimeout(() => {
        setAnimateIn(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Preload images
  useEffect(() => {
    story.pages.forEach((page, i) => {
        if(page.imageKeyword) {
            const img = new Image();
            img.src = `https://picsum.photos/seed/${page.imageKeyword + (i+1)}/600/400`;
        }
    })
  }, [story]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393798-38e43269d877?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-20 blur-sm pointer-events-none"></div>

      {/* Navigation Controls */}
      <div className={`absolute top-8 left-8 z-50 transition-opacity duration-1000 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
        <button 
            onClick={onClose}
            className="group flex items-center gap-2 text-white/70 hover:text-[#cfaa68] transition-colors font-['Cinzel'] uppercase tracking-widest text-sm"
        >
            <div className="w-8 h-8 rounded-full border border-white/30 group-hover:border-[#cfaa68] flex items-center justify-center">
                ←
            </div>
            Close Book
        </button>
      </div>

      <div className={`absolute bottom-10 flex gap-8 z-50 items-center transition-all duration-1000 delay-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         <button 
           onClick={handlePrev}
           disabled={currentPageIndex === 0}
           className="px-6 py-2 rounded-full border border-white/20 bg-black/40 text-white hover:bg-[#cfaa68] hover:text-black hover:border-[#cfaa68] disabled:opacity-30 disabled:hover:bg-black/40 disabled:hover:text-white transition-all font-['Cinzel'] tracking-widest"
         >
            Prev
         </button>
         
         <div className="text-white/60 font-['Cinzel'] text-xs tracking-[0.2em] min-w-[120px] text-center">
            PAGE {currentPageIndex} OF {totalSheets - 1}
         </div>

         <button 
           onClick={handleNext}
           disabled={currentPageIndex === totalSheets - 1}
           className="px-6 py-2 rounded-full border border-white/20 bg-black/40 text-white hover:bg-[#cfaa68] hover:text-black hover:border-[#cfaa68] disabled:opacity-30 disabled:hover:bg-black/40 disabled:hover:text-white transition-all font-['Cinzel'] tracking-widest"
         >
            Next
         </button>
      </div>

      {/* 3D Scene Container */}
      {/* 
         Perspective: 1500px provides a natural view.
         We rotate the entire book slightly (-5deg) to show the thickness/3D effect of the pages on the right side.
      */}
      <div 
        className={`
            relative w-[90vw] h-[55vh] md:w-[800px] md:h-[600px] lg:w-[1000px] lg:h-[700px] 
            [perspective:1500px] 
            transition-all duration-[1200ms] cubic-bezier(0.19, 1, 0.22, 1)
            ${animateIn ? 'scale-100 opacity-100 translate-y-0 rotate-0' : 'scale-50 opacity-0 translate-y-48 rotate-x-12'}
        `}
      >
        
        {/* The Book Itself */}
        <div className="relative w-full h-full flex justify-center items-center [transform-style:preserve-3d]">
            
            {Array.from({ length: totalSheets }).map((_, index) => {
                // Determine Z-Index for stacking
                let zIndex = 0;
                if (index < currentPageIndex) {
                    zIndex = index; // Left stack: 0..Current (Ascending)
                } else {
                    zIndex = totalSheets - index; // Right stack: Total..Current (Descending)
                }

                const isFlipped = index < currentPageIndex;
                const rotation = isFlipped ? -180 : 0;
                
                // --- Content Mapping Logic ---
                let FrontComponent = null;
                let BackComponent = null;

                if (index === 0) {
                    // SHEET 0: Cover / Page 0
                    FrontComponent = <BookCover title={story.title} author={story.author} variant="front" />;
                    if (story.pages.length > 0) {
                        BackComponent = <BookPage pageNumber={1} data={story.pages[0]} side="left" />;
                    } else {
                         BackComponent = <div className="w-full h-full bg-[#fdfbf7]"></div>;
                    }
                } else if (index === totalSheets - 1) {
                    // SHEET LAST: Page N / Back Cover
                    // Calculate expected page index for Front of this sheet
                    // Previous sheets took: 1 (Sheet 0) + (index-1)*2 pages.
                    // Start Index = 1 + (index-1)*2
                    const frontPageIndex = 1 + (index - 1) * 2;
                    
                    if (frontPageIndex < story.pages.length) {
                        FrontComponent = <BookPage pageNumber={frontPageIndex + 1} data={story.pages[frontPageIndex]} side="right" />;
                    } else {
                        // If no page, it's inside back cover (blank)
                        FrontComponent = <div className="w-full h-full bg-[#fdfbf7]"></div>;
                    }
                    BackComponent = <BookCover title={story.title} author={story.author} variant="back" />;
                } else {
                    // MIDDLE SHEETS
                    const frontPageIndex = 1 + (index - 1) * 2; // e.g., Index 1 -> 1. Index 2 -> 3.
                    const backPageIndex = frontPageIndex + 1;   // e.g., Index 1 -> 2. Index 2 -> 4.

                    // Front
                    if (frontPageIndex < story.pages.length) {
                        FrontComponent = <BookPage pageNumber={frontPageIndex + 1} data={story.pages[frontPageIndex]} side="right" />;
                    } else {
                        FrontComponent = <div className="w-full h-full bg-[#fdfbf7]"></div>;
                    }

                    // Back
                    if (backPageIndex < story.pages.length) {
                        BackComponent = <BookPage pageNumber={backPageIndex + 1} data={story.pages[backPageIndex]} side="left" />;
                    } else {
                        BackComponent = <div className="w-full h-full bg-[#fdfbf7]"></div>;
                    }
                }
                
                // Z-Offset calculation for physical stacking
                const zOffset = isFlipped 
                    ? (index * THICKNESS) 
                    : ((totalSheets - index) * THICKNESS);

                return (
                    <div 
                        key={index}
                        className="absolute top-0 w-1/2 h-full [transform-style:preserve-3d] transition-all duration-[1200ms] cubic-bezier(0.645, 0.045, 0.355, 1) origin-left left-1/2 cursor-pointer"
                        style={{
                            zIndex: zIndex,
                            transform: `translate3d(0,0,${zOffset}px) rotateY(${rotation}deg)`,
                        }}
                        onClick={() => {
                            if (isFlipped) handlePrev();
                            else handleNext();
                        }}
                    >
                        {/* 
                           3D PAGE EDGE 
                           This creates the physical "side" of the paper.
                           Visible on the right side when closed/open-right.
                           Visible on the left side (via rotation) when open-left.
                        */}
                        <div 
                            className="absolute top-[2px] right-0 bottom-[2px] w-[6px] bg-[#e3dccb] [transform:rotateY(90deg)_translateX(3px)] origin-right brightness-95"
                        ></div>


                        {/* Front Face (Right Page) */}
                        <div 
                          className="absolute inset-0 [backface-visibility:hidden] w-full h-full border-l border-black/5 bg-[#fdfbf7]"
                          style={{ 
                              transform: 'rotateY(0deg)',
                              // Subtle shadow to separate pages
                              boxShadow: isFlipped ? 'none' : '-1px 0 5px rgba(0,0,0,0.1)'
                          }}
                        >
                           {FrontComponent}
                           {/* Gradient Overlay for Spine Curve */}
                           <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none mix-blend-multiply"></div>
                           {/* Highlight for sheen */}
                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
                        </div>

                        {/* Back Face (Left Page) */}
                        <div 
                          className="absolute inset-0 [backface-visibility:hidden] w-full h-full bg-[#fdfbf7] border-r border-black/5"
                          style={{ 
                              transform: 'rotateY(180deg)',
                              boxShadow: isFlipped ? '1px 0 5px rgba(0,0,0,0.1)' : 'none'
                          }}
                        >
                           {BackComponent}
                           {/* Gradient Overlay for Spine Curve */}
                           <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/20 via-black/5 to-transparent pointer-events-none mix-blend-multiply"></div>
                           {/* Highlight for sheen */}
                           <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/10 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                );
            })}
        </div>
        
        {/* Realistic Book Shadow on Table */}
        <div className={`
            absolute top-[98%] left-[2%] right-[2%] h-12 bg-black/60 blur-2xl rounded-[100%] 
            transition-all duration-1200 delay-200 transform translate-z-[-60px]
            ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
        `}></div>

      </div>
    </div>
  );
};
