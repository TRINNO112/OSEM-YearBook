import React, { useState } from 'react';
import { AppView, Story } from './types';
import { Home } from './components/Home';
import { Flipbook } from './components/Flipbook';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);

  const handleOpenBook = (story: Story) => {
    setCurrentStory(story);
    setView(AppView.BOOK);
  };

  const handleCloseBook = () => {
    setView(AppView.HOME);
    // Optional: Clear story or keep it cached
    // setCurrentStory(null); 
  };

  return (
    <div className="w-full h-screen font-sans">
      {view === AppView.HOME && (
        <Home onOpenBook={handleOpenBook} />
      )}
      
      {view === AppView.BOOK && currentStory && (
        <div className="animate-[fadeIn_1s_ease-in-out]">
           <Flipbook story={currentStory} onClose={handleCloseBook} />
        </div>
      )}
    </div>
  );
};

export default App;
