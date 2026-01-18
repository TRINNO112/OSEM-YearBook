import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FlipbookProps } from '../types';
import { BookPage } from './BookPage';
import { resolveImagePath } from '../utils/imageUtils';

type AnimationPhase = 'loading' | 'opening' | 'open';

export const MobileFlipbook: React.FC<FlipbookProps> = ({ story, onClose }) => {
  // Core state
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('loading');
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Touch state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<number | null>(null);
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const touchStartTime = useRef<number>(0);
  const minSwipeDistance = 80;
  const maxDragDistance = 150;

  // Page states for turning animation
  const [outgoingPageIndex, setOutgoingPageIndex] = useState<number | null>(null);
  const [incomingPageIndex, setIncomingPageIndex] = useState<number | null>(null);

  // Opening animation
  useEffect(() => {
    const sequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAnimationPhase('opening');
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnimationPhase('open');
    };
    sequence();
  }, []);

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

  // Turn page with curl effect
  const turnPage = useCallback((direction: 'next' | 'prev') => {
    if (isPageTurning) return;

    const targetIndex = direction === 'next' ? currentPageIndex + 1 : currentPageIndex - 1;
    if (targetIndex < 0 || targetIndex >= story.pages.length) return;

    setIsPageTurning(true);
    setTurnDirection(direction);
    setIsDragging(false);

    // Set up pages for animation
    setOutgoingPageIndex(currentPageIndex);
    setIncomingPageIndex(targetIndex);

    // Play page flip sound
    const audio = new Audio(resolveImagePath('/sounds/page-flip.mp3') || '');
    audio.volume = 0.2;
    audio.playbackRate = 1.2;
    audio.play().catch(() => { });

    // Wait for animation to complete
    setTimeout(() => {
      setCurrentPageIndex(targetIndex);
    }, 300);

    // Clean up
    setTimeout(() => {
      setIsPageTurning(false);
      setTurnDirection(null);
      setOutgoingPageIndex(null);
      setIncomingPageIndex(null);
      setDragProgress(0);
    }, 600);
  }, [currentPageIndex, isPageTurning, story.pages.length]);

  const handleNext = useCallback(() => {
    if (currentPageIndex < story.pages.length - 1) {
      turnPage('next');
    }
  }, [currentPageIndex, story.pages.length, turnPage]);

  const handlePrev = useCallback(() => {
    if (currentPageIndex > 0) {
      turnPage('prev');
    }
  }, [currentPageIndex, turnPage]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (isPageTurning || animationPhase !== 'open') return;
    setTouchStart(e.targetTouches[0].clientX);
    setTouchCurrent(e.targetTouches[0].clientX);
    touchStartTime.current = Date.now();
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || isPageTurning || animationPhase !== 'open') return;
    setTouchCurrent(e.targetTouches[0].clientX);

    const delta = (touchStart - e.targetTouches[0].clientX) / maxDragDistance;
    setDragProgress(Math.max(-1, Math.min(1, delta)));
  };

  const onTouchEnd = () => {
    if (!touchStart || isPageTurning || animationPhase !== 'open') return;

    const delta = touchStart - (touchCurrent || touchStart);
    const absDelta = Math.abs(delta);
    const velocity = absDelta / (Date.now() - touchStartTime.current);

    // Determine swipe
    if (absDelta > minSwipeDistance || velocity > 0.8) {
      if (delta > 0 && currentPageIndex < story.pages.length - 1) {
        handleNext();
      } else if (delta < 0 && currentPageIndex > 0) {
        handlePrev();
      }
    }

    // Reset
    setTouchStart(null);
    setTouchCurrent(null);
    setIsDragging(false);
    setDragProgress(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (animationPhase !== 'open') return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose, animationPhase]);

  const currentPage = story.pages[currentPageIndex];
  const outgoingPage = outgoingPageIndex !== null ? story.pages[outgoingPageIndex] : null;
  const incomingPage = incomingPageIndex !== null ? story.pages[incomingPageIndex] : null;
  const progress = ((currentPageIndex + 1) / story.pages.length) * 100;

  // Calculate real-time curl during drag
  const getPageRotation = () => {
    if (isPageTurning) {
      return turnDirection === 'next' ? -90 : 90;
    }
    if (isDragging) {
      const rotation = dragProgress * -45; // Max 45deg during drag
      return Math.max(-45, Math.min(45, rotation));
    }
    return 0;
  };

  // Calculate edge glow opacity
  const getEdgeGlowOpacity = () => {
    if (isDragging) return Math.min(1, Math.abs(dragProgress));
    if (isPageTurning) return 1;
    return 0;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0806] overflow-hidden font-['Cinzel']">
      {/* Ambient Background - Constant for all phases */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#cfaa68] via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
      </div>

      {/* 3D Loading Phase */}
      {animationPhase === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center z-50 perspective-1000">
          <div className="relative">
            {/* 3D Book Construction */}
            <div className="w-48 h-64 relative preserve-3d animate-book-open">
              {/* Back Cover */}
              <div className="absolute inset-0 bg-[#3d2418] rounded-r-lg border-l-4 border-[#2c1a12] shadow-2xl origin-left transform translate-z-[-20px]" />

              {/* Pages Block */}
              <div className="absolute inset-y-2 right-2 left-2 bg-[#fdfbf7] shadow-inner origin-left transform translate-z-[-10px] flex flex-col justify-between py-1 px-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-px w-full bg-gray-200" />
                ))}
              </div>

              {/* Front Cover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#5a3825] to-[#3d2418] rounded-r-lg border-l-4 border-[#2c1a12] origin-left shadow-2xl flex items-center justify-center animate-cover-open">
                <div className="absolute inset-2 border border-[#cfaa68]/40 rounded-r" />
                <div className="w-20 h-20 rounded-full border-2 border-[#cfaa68]/30 flex items-center justify-center">
                  <span className="text-4xl text-[#cfaa68]">♔</span>
                </div>
              </div>
            </div>

            {/* Text Reveal */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center w-full min-w-[300px]">
              <h1 className="text-3xl font-bold text-[#cfaa68] tracking-[0.3em] drop-shadow-lg opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.5s' }}>
                OSEM
              </h1>
              <p className="text-[#8a6b4e] text-sm tracking-[0.5em] mt-2 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '1s' }}>
                YEARBOOK 2025
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Phase */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: animationPhase === 'open' ? 1 : 0, pointerEvents: animationPhase === 'open' ? 'auto' : 'none' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Top Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-40">
          <div className="text-[#cfaa68]/80 text-[10px] sm:text-xs tracking-widest border border-[#cfaa68]/20 px-2 sm:px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">
            PAGE {currentPageIndex + 1} / {story.pages.length}
          </div>
          <button
            onClick={onClose}
            className="group p-2 rounded-full border border-white/10 hover:border-[#cfaa68]/50 bg-black/20 hover:bg-[#cfaa68]/10 transition-all duration-300"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#e8d5b5] group-hover:text-[#cfaa68] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* SIDE NAVIGATION ARROWS (The "Button" Request) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-1 sm:px-4 z-50">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={currentPageIndex === 0 || isPageTurning}
            className={`pointer-events-auto p-2 sm:p-4 rounded-full bg-black/30 backdrop-blur-sm border border-[#cfaa68]/20 
                         text-[#cfaa68] hover:bg-[#cfaa68] hover:text-[#0d0806] hover:scale-110 active:scale-95 
                         transition-all duration-300 shadow-[0_0_15px_rgba(207,170,104,0.1)] hover:shadow-[0_0_30px_rgba(207,170,104,0.4)]
                         disabled:opacity-0 disabled:translate-x-[-20px]`}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={currentPageIndex === story.pages.length - 1 || isPageTurning}
            className={`pointer-events-auto p-2 sm:p-4 rounded-full bg-black/30 backdrop-blur-sm border border-[#cfaa68]/20 
                         text-[#cfaa68] hover:bg-[#cfaa68] hover:text-[#0d0806] hover:scale-110 active:scale-95 
                         transition-all duration-300 shadow-[0_0_15px_rgba(207,170,104,0.1)] hover:shadow-[0_0_30px_rgba(207,170,104,0.4)]
                         disabled:opacity-0 disabled:translate-x-[20px]`}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Centered Book Container - MAXIMIZED SIZE */}
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <div className="relative w-full max-w-2xl h-[85vh] sm:h-[90vh] aspect-[3/4.5] sm:aspect-[3/4]">

            {/* Previous Page (Left Stack) just for visual thickness */}
            {currentPageIndex > 0 && (
              <div className="absolute left-1 top-1 bottom-1 w-2 bg-[#1a0f0c] rounded-l-sm transform -translate-x-full opacity-50" />
            )}

            {/* Current Page */}
            <div className="absolute inset-0 bg-[#fdfbf7] rounded-sm shadow-2xl overflow-hidden transform-gpu"
              style={{
                transform: isPageTurning ? 'scale(0.98)' : 'scale(1)',
                transition: 'transform 0.5s ease'
              }}
            >
              {/* Page Texture */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />

              {/* Content */}
              <div className="relative w-full h-full">
                <BookPage pageNumber={currentPageIndex + 1} data={currentPage} side="right" />
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10 pointer-events-none" />
            </div>

            {/* Turning Pages (Next/Prev) */}
            {(turnDirection === 'next' && outgoingPage) && (
              <div className="absolute inset-0 origin-left z-20"
                style={{
                  transformStyle: 'preserve-3d',
                  animation: 'flipNext 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000) forwards'
                }}
              >
                {/* Front of turning page */}
                <div className="absolute inset-0 bg-[#fdfbf7] backface-hidden">
                  <BookPage pageNumber={currentPageIndex} data={outgoingPage} side="right" />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
                </div>
                {/* Back of turning page */}
                <div className="absolute inset-0 bg-[#e3d0b0] backface-hidden transform rotateY-180 flex items-center justify-center">
                  <span className="text-[#8a6b4e]/20 font-serif text-6xl italic">Yearbook</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>
              </div>
            )}

            {(turnDirection === 'prev' && incomingPage) && (
              <div className="absolute inset-0 origin-right z-20"
                style={{
                  transformStyle: 'preserve-3d',
                  animation: 'flipPrev 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000) forwards'
                }}
              >
                {/* Front of turning page (actually back bc coming from right) */}
                <div className="absolute inset-0 bg-[#e3d0b0] backface-hidden transform rotateY-180 flex items-center justify-center">
                  <span className="text-[#8a6b4e]/20 font-serif text-6xl italic">Yearbook</span>
                </div>
                {/* Back of turning page (actually front content) */}
                <div className="absolute inset-0 bg-[#fdfbf7] backface-hidden">
                  <BookPage pageNumber={incomingPageIndex! + 1} data={incomingPage} side="right" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-[#2c1810]/50 rounded-full overflow-hidden backdrop-blur-sm z-40">
          <div className="h-full bg-[#cfaa68] transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotateY-180 { transform: rotateY(180deg); }
        
        @keyframes book-open {
           0% { transform: rotateX(60deg) rotateZ(-10deg) scale(0.5); }
           100% { transform: rotateX(0deg) rotateZ(0deg) scale(1); }
        }

        @keyframes cover-open {
           0% { transform: rotateY(0deg); }
           100% { transform: rotateY(-180deg); }
        }

        @keyframes fade-in-up {
           0% { opacity: 0; transform: translateY(20px); }
           100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes flipNext {
           0% { transform: rotateY(0deg); }
           100% { transform: rotateY(-180deg); }
        }

        @keyframes flipPrev {
           0% { transform: rotateY(180deg); }
           100% { transform: rotateY(0deg); }
        }
      `}</style>
    </div>
  );
};

export default MobileFlipbook;
