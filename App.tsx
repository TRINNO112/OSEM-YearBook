import React, { useState, useEffect } from 'react';
import { AppView, Story } from './types';
import { Home } from './components/Home';
import { Flipbook } from './components/Flipbook';
import { MobileFlipbook } from './components/MobileFlipbook';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleOpenBook = (story: Story) => {
    setCurrentStory(story);
    setView(AppView.BOOK);
  };

  const handleCloseBook = () => {
    setView(AppView.HOME);
  };

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="w-full h-screen font-sans">
      {view === AppView.HOME && (
        <Home onOpenBook={handleOpenBook} />
      )}

      {view === AppView.BOOK && currentStory && (
        <div className="animate-[fadeIn_1s_ease-in-out]">
          {isMobile ? (
            <MobileFlipbook story={currentStory} onClose={handleCloseBook} />
          ) : (
            <Flipbook story={currentStory} onClose={handleCloseBook} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;