import React, { useState, useRef, useEffect } from 'react';
import { FlipbookProps } from '../types';
import { BookPage } from './BookPage';
import { resolveImagePath } from '../utils/imageUtils';

export const MobileFlipbook: React.FC<FlipbookProps> = ({ story, onClose }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  // Preload images
  useEffect(() => {
    story.pages.forEach((page, i) => {
      const img = new Image();
      if (page.imageUrl) {
        const src = resolveImagePath(page.imageUrl);
        if (src) img.src = src;
      } else if (page.imageKeyword) {
        img.src = `https://picsum.photos/seed/${page.imageKeyword + (i + 1)}/600/800`;
      }
    });
  }, [story]);

  const handleNext = () => {
    if (currentPageIndex < story.pages.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPageIndex(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPageIndex(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };"}ed("

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, isAnimating]);

  const currentPage = story.pages[currentPageIndex];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a0503] via-[#1a1412] to-[#0a0503]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm border-b border-[#cfaa68]/20">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[#e8d5b5] hover:text-[#cfaa68] transition-colors text-sm"
        >
          <span className="text-lg">←</span>
          <span className="font-['Cinzel']">Close</span>
        </button>

        <div className="text-[#cfaa68] font-['Cinzel'] text-xs tracking-wider">
          {currentPageIndex + 1} / {story.pages.length}
        </div>
      </div>

      {/* Main Content */}
      <div
        ref={containerRef}
        className="h-full pt-16 pb-20 px-4"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={`h-full transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 translate-x-8 scale-95' : 'opacity-100 translate-x-0 scale-100'}`}>
          {/* Single page view for mobile */}
          <div className="w-full h-full max-w-md mx-auto">
            <BookPage
              pageNumber={currentPageIndex + 1}
              data={currentPage}
              side="right"
            />
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-50 p-4 bg-black/50 backdrop-blur-sm border-t border-[#cfaa68]/20">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={handlePrev}
            disabled={currentPageIndex === 0}
            className="px-4 py-2 rounded-full bg-[#2c1810]/80 text-[#e8d5b5] border border-[#cfaa68]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 font-['Cinzel'] text-xs tracking-wider hover:bg-[#cfaa68] hover:text-black hover:border-[#cfaa68]"
          >
            ← Prev
          </button>

          <div className="flex items-center gap-2">
            {/* Page indicators */}
            {story.pages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPageIndex
                    ? 'bg-[#cfaa68] scale-125'
                    : 'bg-[#cfaa68]/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPageIndex === story.pages.length - 1}
            className="px-4 py-2 rounded-full bg-[#2c1810]/80 text-[#e8d5b5] border border-[#cfaa68]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 font-['Cinzel'] text-xs tracking-wider hover:bg-[#cfaa68] hover:text-black hover:border-[#cfaa68]"
          >
            Next →
          </button>
        </div>

        {/* Swipe hint */}
        {currentPageIndex === 0 && (
          <div className="mt-3 text-center">
            <p className="text-[#8a6b4e] text-xs font-['Cinzel'] tracking-wider animate-pulse">
              Swipe left to continue →
            </p>
          </div>
        )}
      </div>

      {/* Touch interaction overlay for better UX */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/20 to-transparent" />
      </div>
    </div>
  );
};