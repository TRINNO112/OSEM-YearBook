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
    audio.play().catch(() => {});

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
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#0d0806] via-[#1a0f0c] to-[#0d0806] overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(207,170,104,0.25) 0%, transparent 70%)',
            animation: 'breathe 6s ease-in-out infinite',
          }}
        />
      </div>

      {/* Loading Phase */}
      {animationPhase === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="text-center space-y-6">
            <div className="relative w-16 h-20 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513] via-[#654321] to-[#4a2f1a] rounded shadow-xl" style={{
                animation: 'gentleFloat 2.5s ease-in-out infinite',
              }}>
                <div className="absolute inset-2 border border-[#cfaa68]/40 rounded" />
              </div>
              <div className="absolute -inset-3 rounded-lg opacity-40" style={{
                background: 'radial-gradient(circle, rgba(207,170,104,0.2) 0%, transparent 70%)',
                animation: 'softPulse 2s ease-in-out infinite',
              }} />
            </div>
            <p className="text-[#cfaa68] font-['Cinzel'] text-sm tracking-widest" style={{
              animation: 'softFade 2s ease-in-out infinite'
            }}>OPENING YEARBOOK</p>
          </div>
        </div>
      )}

      {/* Opening Animation */}
      {animationPhase === 'opening' && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-gradient-to-br from-[#0d0806] to-[#1a0f0c] opacity-0" style={{
            animation: 'fadeIn 0.8s ease-out forwards'
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center opacity-0" style={{
              animation: 'fadeInScale 0.8s ease-out 0.2s forwards'
            }}>
              <div className="w-32 h-40 bg-gradient-to-br from-[#8B4513] to-[#654321] rounded shadow-2xl mx-auto mb-4" />
              <h2 className="text-[#cfaa68] font-['Cinzel'] text-lg tracking-[0.2em]">{story.title}</h2>
            </div>
          </div>
        </div>
      )}

      {/* Page Container with All Effects */}
      <div className="absolute inset-0" style={{
        perspective: '1500px',
        opacity: animationPhase === 'open' ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="relative w-full h-full max-w-lg mx-auto px-4 py-4">
          {/* Header */}
          {animationPhase === 'open' && (
            <div className="absolute -top-12 left-0 right-0 z-40 flex items-center justify-between px-4">
              <button onClick={onClose} className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-[#cfaa68]/20 text-[#e8d5b5] hover:text-[#cfaa68] hover:border-[#cfaa68]/40 transition-all duration-300 active:scale-95">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-['Cinzel'] text-xs tracking-wider hidden sm:inline">Close</span>
              </button>

              <div className="text-[#cfaa68] font-['Cinzel'] text-sm tracking-widest">
                <span className="font-bold">{currentPageIndex + 1}</span>
                <span className="text-[#8a6b4e] mx-2">of</span>
                <span>{story.pages.length}</span>
              </div>
            </div>
          )}

          {/* Current Page (Base Layer with Thickness Effect) */}
          <div className="absolute inset-4" style={{ zIndex: 10 }}>
            {/* Page thickness - right edge */}
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-l from-[#3d2418] via-[#5a3825] to-transparent rounded-r-sm" />
            {/* Page thickness - bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-[#3d2418] to-transparent rounded-b-sm" />
            {/* Page thickness - left edge */}
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-[#3d2418] via-[#5a3825] to-transparent rounded-l-sm" />

            {/* Golden edge highlights */}
            <div
              className="absolute inset-0 pointer-events-none rounded"
              style={{
                boxShadow: `inset 0 0 0 1px rgba(207,170,104,${getEdgeGlowOpacity() * 0.3}), inset 0 0 10px rgba(207,170,104,${getEdgeGlowOpacity() * 0.2})`,
                transition: 'box-shadow 0.3s ease',
              }}
            />

            {/* Corner fold effect */}
            <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none" style={{ zIndex: 15 }}>
              <div
                className="absolute top-0 right-0 w-full h-full"
                style={{
                  background: 'linear-gradient(45deg, transparent 50%, rgba(207,170,104,0.1) 50%)',
                  clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                  transform: isDragging ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                  opacity: isDragging ? 0.8 : 0.6,
                }}
              />
            </div>

            {/* Paper texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded opacity-30"
              style={{
                backgroundImage: `url(${resolveImagePath('/images/chapters/page.png')})`,
                backgroundSize: '200px 200px',
                backgroundRepeat: 'repeat',
              }}
            />

            {/* Page content */}
            <div className="absolute inset-0">
              <BookPage
                pageNumber={currentPageIndex + 1}
                data={currentPage}
                side="right"
              />
            </div>
          </div>

          {/* Curling Page Effect for Next */}
          {turnDirection === 'next' && outgoingPage && (
            <div
              className="absolute inset-4 origin-left"
              style={{
                transformStyle: 'preserve-3d',
                transform: isDragging || isPageTurning
                  ? `rotateY(${getPageRotation()}deg)`
                  : 'rotateY(0deg)',
                transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 20,
              }}
            >
              {/* Page thickness for curling page */}
              <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-l from-[#3d2418] via-[#5a3825] to-transparent rounded-r-sm" />

              {/* Dynamic page shadow during curl */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 60%)',
                  opacity: isPageTurning ? 1 : Math.abs(dragProgress) * 0.7,
                  transition: isDragging ? 'none' : 'opacity 0.6s ease',
                }}
              />

              {/* Enhanced edge glow during curl */}
              <div
                className="absolute inset-0 pointer-events-none rounded"
                style={{
                  boxShadow: `inset 0 0 0 1px rgba(207,170,104,${Math.max(getEdgeGlowOpacity(), 0.5)}), inset 0 0 20px rgba(207,170,104,${Math.max(getEdgeGlowOpacity() * 0.3, 0.3)})`,
                }}
              />

              {/* Paper texture overlay for curling page */}
              <div
                className="absolute inset-0 pointer-events-none rounded opacity-30"
                style={{
                  backgroundImage: `url(${resolveImagePath('/images/chapters/page.png')})`,
                  backgroundSize: '200px 200px',
                  backgroundRepeat: 'repeat',
                  transform: isDragging ? `translateX(${dragProgress * -10}px)` : 'none',
                }}
              />

              <BookPage
                pageNumber={(outgoingPageIndex || 0) + 1}
                data={outgoingPage}
                side="right"
              />
            </div>
          )}

          {/* Curling Page Effect for Previous */}
          {turnDirection === 'prev' && incomingPage && (
            <div
              className="absolute inset-4 origin-right"
              style={{
                transformStyle: 'preserve-3d',
                transform: isDragging || isPageTurning
                  ? `rotateY(${getPageRotation()}deg)`
                  : 'rotateY(0deg)',
                transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 20,
              }}
            >
              {/* Page thickness for curling page */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-[#3d2418] via-[#5a3825] to-transparent rounded-l-sm" />

              {/* Dynamic page shadow during curl */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 60%)',
                  opacity: isPageTurning ? 1 : Math.abs(dragProgress) * 0.7,
                  transition: isDragging ? 'none' : 'opacity 0.6s ease',
                }}
              />

              {/* Enhanced edge glow during curl */}
              <div
                className="absolute inset-0 pointer-events-none rounded"
                style={{
                  boxShadow: `inset 0 0 0 1px rgba(207,170,104,${Math.max(getEdgeGlowOpacity(), 0.5)}), inset 0 0 20px rgba(207,170,104,${Math.max(getEdgeGlowOpacity() * 0.3, 0.3)})`,
                }}
              />

              {/* Paper texture overlay for curling page */}
              <div
                className="absolute inset-0 pointer-events-none rounded opacity-30"
                style={{
                  backgroundImage: `url(${resolveImagePath('/images/chapters/page.png')})`,
                  backgroundSize: '200px 200px',
                  backgroundRepeat: 'repeat',
                  transform: isDragging ? `translateX(${dragProgress * 10}px)` : 'none',
                }}
              />

              <BookPage
                pageNumber={(incomingPageIndex || 0) + 1}
                data={incomingPage}
                side="right"
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      {animationPhase === 'open' && (
        <div className="absolute bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-lg mx-auto">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-1 bg-[#2c1810]/50 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="h-full bg-gradient-to-r from-[#8a6b4e] via-[#cfaa68] to-[#f0d890] rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button onClick={handlePrev} disabled={currentPageIndex === 0 || isPageTurning} className="group flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#2c1810]/80 to-[#3d2418]/80 backdrop-blur-sm text-[#e8d5b5] border border-[#cfaa68]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 hover:border-[#cfaa68]/40 hover:shadow-md hover:shadow-[#cfaa68]/10">
                <svg className="w-5 h-5 opacity-70 transition-all group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-['Cinzel'] text-xs tracking-widest hidden sm:inline">Previous</span>
              </button>

              {/* Page Indicators */}
              <div className="flex items-center gap-1.5">
                {story.pages.map((_, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-300 ${
                      index === currentPageIndex
                        ? 'w-6 h-1 bg-gradient-to-r from-[#cfaa68] to-[#f0d890]'
                        : 'w-1.5 h-1.5 bg-[#cfaa68]/30'
                    } rounded-full`}
                    style={{
                      boxShadow: index === currentPageIndex ? '0 0 8px rgba(207,170,104,0.6)' : 'none',
                    }}
                  />
                ))}
              </div>

              <button onClick={handleNext} disabled={currentPageIndex === story.pages.length - 1 || isPageTurning} className="group flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#3d2418]/80 to-[#2c1810]/80 backdrop-blur-sm text-[#e8d5b5] border border-[#cfaa68]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 hover:border-[#cfaa68]/40 hover:shadow-md hover:shadow-[#cfaa68]/10">
                <span className="font-['Cinzel'] text-xs tracking-widest hidden sm:inline">Next</span>
                <svg className="w-5 h-5 opacity-70 transition-all group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes softPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        @keyframes softFade {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default MobileFlipbook;
