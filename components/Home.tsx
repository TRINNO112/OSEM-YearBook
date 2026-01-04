import React, { useState, useEffect } from 'react';
import { Story, StoryPage } from '../types';
import yearbookData from '../data/yearbook-data.json';

interface HomeProps {
  onOpenBook: (story: Story) => void;
}

// Function to build the Story object from JSON data
const buildYearbookStory = (): Story => {
  const pages: StoryPage[] = [];

  // Add chapters (sorted by order)
  const sortedChapters = [...yearbookData.chapters].sort((a, b) => a.order - b.order);
  sortedChapters.forEach(chapter => {
    pages.push({
      type: chapter.type as 'chapter',
      layout: chapter.layout as 'standard' | 'full-image' | undefined,
      chapterTitle: chapter.chapterTitle,
      text: chapter.text,
      imageKeyword: chapter.imageKeyword
    });
  });

  // Add student profiles
  yearbookData.students.forEach(student => {
    pages.push({
      type: 'profile',
      chapterTitle: "Student Profile",
      studentName: student.name,
      text: student.quote,
      imageKeyword: student.imageKeyword,
      imageUrl: student.imageUrl || undefined
    });
  });

  // Add farewell chapter at the end
  pages.push({
    type: yearbookData.farewell.type as 'chapter',
    chapterTitle: yearbookData.farewell.chapterTitle,
    text: yearbookData.farewell.text,
    imageKeyword: yearbookData.farewell.imageKeyword
  });

  return {
    title: yearbookData.metadata.yearbook.title,
    author: yearbookData.metadata.yearbook.subtitle,
    pages: pages
  };
};

export const Home: React.FC<HomeProps> = ({ onOpenBook }) => {
  const [yearbookStory, setYearbookStory] = useState<Story | null>(null);

  // Build yearbook story on component mount
  useEffect(() => {
    const story = buildYearbookStory();
    setYearbookStory(story);
  }, []);

  const handleOpen = () => {
    // Immediate open, the animation is handled by the Flipbook component entrance
    if (yearbookStory) {
      onOpenBook(yearbookStory);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-y-auto bg-[#0a0503] text-[#e8d5b5] scrollbar-thin scrollbar-thumb-[#cfaa68] scrollbar-track-[#1a1412]">
      {/* Dynamic Background with Parallax */}
      <div className="fixed inset-0 z-0">
         <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2940&auto=format&fit=crop"
            alt="School Background"
            className="w-full h-full object-cover opacity-30 animate-[pulse_10s_ease-in-out_infinite]"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90"></div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-[#cfaa68] rounded-full animate-ping opacity-30" style={{animationDuration: '3s'}}></div>
         <div className="absolute top-[25%] right-[15%] w-1 h-1 bg-[#cfaa68] rounded-full animate-ping opacity-20" style={{animationDuration: '4s'}}></div>
         <div className="absolute top-[45%] left-[25%] w-1 h-1 bg-white rounded-full animate-pulse opacity-40" style={{animationDuration: '2s'}}></div>
         <div className="absolute top-[65%] right-[20%] w-2 h-2 bg-[#cfaa68] rounded-full animate-ping opacity-25" style={{animationDuration: '5s'}}></div>
         <div className="absolute top-[80%] left-[30%] w-1 h-1 bg-white rounded-full animate-pulse opacity-30" style={{animationDuration: '3s'}}></div>
         <div className="absolute top-[35%] right-[40%] w-1 h-1 bg-[#cfaa68] rounded-full animate-ping opacity-15" style={{animationDuration: '6s'}}></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">

          {/* Crest with Animation */}
          <div className="mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-[#cfaa68] flex items-center justify-center bg-black/30 shadow-[0_0_20px_rgba(207,170,104,0.2)] hover:shadow-[0_0_40px_rgba(207,170,104,0.4)] transition-shadow duration-500 hover:scale-110 transform transition-transform">
                  <svg className="w-10 h-10 text-[#cfaa68]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4 7v6.5c0 4.42 3.34 8.05 7.67 8.95L12 22.5l.33-.05C16.66 21.55 20 17.92 20 13.5V7l-8-5zm0 2.18l6 3.75v5.57c0 3.55-2.53 6.49-6 7.16-3.47-.67-6-3.61-6-7.16V7.93l6-3.75z"/>
                    <path d="M12 8l-3 3 3 3 3-3-3-3z"/>
                  </svg>
              </div>
          </div>

          {/* School Name */}
          <div className="opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
            <h3 className="text-sm md:text-lg font-['Cinzel'] tracking-[0.4em] text-[#8a6b4e] uppercase mb-6">
              Om Shanti English Medium School
            </h3>
          </div>

          {/* Emblem with Enhanced Animation */}
          <div className="mb-8 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
            <div className="relative group cursor-default">
                <div className="absolute inset-0 bg-[#cfaa68] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3203/3203061.png"
                  alt="OSEM Emblem"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] filter sepia-[0.5] brightness-110 hover:scale-110 transition-transform duration-700 hover:rotate-6"
                />
            </div>
          </div>

          {/* Title with Animation */}
          <div className="opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-[#cfaa68]/50 animate-[expandWidth_1s_ease-out_1s_forwards]"></div>
                <h2 className="text-xl md:text-3xl font-['Playfair_Display'] italic text-[#e8d5b5] tracking-widest">
                  Yearbook 2025
                </h2>
                <div className="h-[1px] w-12 bg-[#cfaa68]/50 animate-[expandWidth_1s_ease-out_1s_forwards]"></div>
            </div>
            <p className="text-[#8a6b4e] font-['Cinzel'] text-xs tracking-[0.2em] uppercase">
              Grade 12th Farewell Edition
            </p>
          </div>

          {/* Welcome Message */}
          <div className="mt-12 max-w-2xl px-6 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
            <p className="font-['Crimson_Pro'] text-lg md:text-xl text-[#d4c5b0] leading-relaxed mb-4">
              "Within these digital pages lies the story of our journey—a tapestry woven with laughter,
              tears, triumphs, and the bonds that will last a lifetime."
            </p>
            <p className="font-['Crimson_Pro'] text-base text-[#8a6b4e] italic">
              — The Class of 2025
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-12 w-full max-w-md opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards]">
            <div className="bg-black/20 p-8 rounded-xl backdrop-blur-sm border border-[#cfaa68]/10 hover:border-[#cfaa68]/30 transition-colors duration-500">
               <button
                 onClick={handleOpen}
                 className={`
                    group relative w-full px-8 py-4 bg-transparent overflow-hidden rounded-sm
                    border-2 border-[#cfaa68] transition-all duration-300
                    hover:shadow-[0_0_30px_rgba(207,170,104,0.3)]
                    active:scale-95
                 `}
               >
                  <div className="absolute inset-0 w-0 bg-[#cfaa68] transition-all duration-[400ms] ease-out group-hover:w-full opacity-10"></div>
                  <span className="relative font-['Cinzel'] text-xl font-bold tracking-widest text-[#cfaa68] group-hover:text-[#ffeebb] flex items-center justify-center gap-3">
                    Open Yearbook
                    <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
               </button>

               <p className="mt-6 text-[#8a6b4e] text-xs font-['Cinzel'] tracking-wider opacity-60">
                 Relive the memories • {yearbookStory?.pages.length || 0} pages of nostalgia
               </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 opacity-0 animate-[fadeIn_1s_ease-out_1.4s_forwards]">
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <p className="text-[#8a6b4e] text-xs font-['Cinzel'] tracking-widest uppercase">Discover More</p>
              <div className="w-6 h-10 border-2 border-[#cfaa68]/30 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-2 bg-[#cfaa68] rounded-full animate-[scrollDown_1.5s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative py-20 px-4 border-t border-[#cfaa68]/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-['Cinzel'] text-[#cfaa68] mb-4 tracking-wide">
                A Journey Worth Remembering
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#cfaa68] to-transparent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-[#cfaa68]/10 hover:border-[#cfaa68]/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(207,170,104,0.2)]">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 text-[#cfaa68] mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-['Cinzel'] text-[#e8d5b5] mb-3 tracking-wider">Our Stories</h3>
                <p className="font-['Crimson_Pro'] text-[#8a6b4e] leading-relaxed">
                  Every page holds a unique tale—from the first day nervousness to the last day tears.
                  {yearbookStory?.pages.filter(p => p.type === 'profile').length || 0} students, one unforgettable bond.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-[#cfaa68]/10 hover:border-[#cfaa68]/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(207,170,104,0.2)]">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 text-[#cfaa68] mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-['Cinzel'] text-[#e8d5b5] mb-3 tracking-wider">The Memories</h3>
                <p className="font-['Crimson_Pro'] text-[#8a6b4e] leading-relaxed">
                  From annual day performances to canteen chaos, from exam stress to victory celebrations—
                  these moments shaped who we became.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-black/30 backdrop-blur-sm p-8 rounded-lg border border-[#cfaa68]/10 hover:border-[#cfaa68]/40 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(207,170,104,0.2)]">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 text-[#cfaa68] mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-['Cinzel'] text-[#e8d5b5] mb-3 tracking-wider">Forever OSEM</h3>
                <p className="font-['Crimson_Pro'] text-[#8a6b4e] leading-relaxed">
                  As we step into new chapters, we carry OSEM in our hearts. This isn't goodbye—
                  it's "see you later," with memories that will last forever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-[#1a0f0a]/50 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-['Cinzel'] font-bold text-[#cfaa68] mb-2">
                  {yearbookStory?.pages.filter(p => p.type === 'profile').length || 0}
                </div>
                <div className="text-sm font-['Cinzel'] text-[#8a6b4e] tracking-widest uppercase">Students</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-['Cinzel'] font-bold text-[#cfaa68] mb-2">12</div>
                <div className="text-sm font-['Cinzel'] text-[#8a6b4e] tracking-widest uppercase">Years</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-['Cinzel'] font-bold text-[#cfaa68] mb-2">∞</div>
                <div className="text-sm font-['Cinzel'] text-[#8a6b4e] tracking-widest uppercase">Memories</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-['Cinzel'] font-bold text-[#cfaa68] mb-2">1</div>
                <div className="text-sm font-['Cinzel'] text-[#8a6b4e] tracking-widest uppercase">Family</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative">
              <span className="absolute -top-8 -left-4 text-8xl text-[#cfaa68] opacity-20 font-serif">"</span>
              <p className="font-['Playfair_Display'] text-2xl md:text-3xl italic text-[#e8d5b5] leading-relaxed mb-6 relative z-10">
                Education is not the filling of a pail, but the lighting of a fire. At OSEM,
                we didn't just learn—we discovered who we are.
              </p>
              <span className="absolute -bottom-8 -right-4 text-8xl text-[#cfaa68] opacity-20 font-serif">"</span>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-[1px] w-16 bg-[#cfaa68]/50"></div>
              <p className="text-[#8a6b4e] font-['Cinzel'] text-sm tracking-widest uppercase">Class Motto</p>
              <div className="h-[1px] w-16 bg-[#cfaa68]/50"></div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 px-4 border-t border-[#cfaa68]/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-12 h-12 mx-auto rounded-full border border-[#cfaa68] flex items-center justify-center opacity-60">
                <svg className="w-6 h-6 text-[#cfaa68]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4 7v6.5c0 4.42 3.34 8.05 7.67 8.95L12 22.5l.33-.05C16.66 21.55 20 17.92 20 13.5V7l-8-5zm0 2.18l6 3.75v5.57c0 3.55-2.53 6.49-6 7.16-3.47-.67-6-3.61-6-7.16V7.93l6-3.75z"/>
                  <path d="M12 8l-3 3 3 3 3-3-3-3z"/>
                </svg>
              </div>
            </div>
            <p className="font-['Cinzel'] text-sm text-[#8a6b4e] tracking-widest uppercase mb-2">
              Om Shanti English Medium School
            </p>
            <p className="font-['Crimson_Pro'] text-xs text-[#8a6b4e] mb-6">
              Grade 12th Batch of 2025 • Forever in Our Hearts
            </p>
            <p className="text-xs text-[#8a6b4e]/60 font-['Crimson_Pro'] mb-2">
              © 2025 OSEM Yearbook • Class of 2025
            </p>
            <p className="text-xs text-[#cfaa68] font-['Cinzel'] tracking-wider">
              Created by Trinno Asphalt • Grade 11th
            </p>
          </div>
        </footer>

      </div>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 3rem;
          }
        }

        @keyframes scrollDown {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};