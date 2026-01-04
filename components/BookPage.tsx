import React from 'react';
import { StoryPage } from '../types';

interface BookPageProps {
  pageNumber: number;
  data: StoryPage;
  side: 'left' | 'right';
}

export const BookPage: React.FC<BookPageProps> = ({ pageNumber, data, side }) => {
  const isProfile = data.type === 'profile';
  const isFullImage = data.layout === 'full-image';
  
  // Resolve image source: prefer direct URL, fallback to keyword, then placeholder
  const imageSource = data.imageUrl 
    ? data.imageUrl 
    : data.imageKeyword 
        ? `https://picsum.photos/seed/${data.imageKeyword + pageNumber}/600/800`
        : null;

  return (
    <div className={`
      w-full h-full bg-[#fdfbf7] relative overflow-hidden
      shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]
      flex flex-col
      ${side === 'left' ? 'rounded-l-sm border-r border-gray-200' : 'rounded-r-sm border-l border-gray-200'}
    `}>
      {/* Paper Texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
      
      {/* Page Content */}
      <div className="relative z-10 flex flex-col h-full p-8 md:p-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-double border-[#d4c5b0] pb-2">
           <span className="font-['Cinzel'] text-xs text-gray-400 tracking-widest uppercase">
             {data.chapterTitle || (isProfile ? 'Class of 2025' : `Chapter ${pageNumber}`)}
           </span>
           <span className="font-['Playfair_Display'] text-gray-400 italic font-bold">
             {pageNumber}
           </span>
        </div>

        {isProfile ? (
            // --- Student Profile Layout ---
            <div className="flex flex-col items-center h-full text-center">
                {/* Polaroid/Photo Frame */}
                <div className="relative w-48 h-64 mb-6 p-2 bg-white border border-gray-200 shadow-[0_4px_6px_rgba(0,0,0,0.1)] transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                    <div className="w-full h-full overflow-hidden bg-gray-100 relative">
                        {imageSource ? (
                            <img 
                                src={imageSource}
                                alt={data.studentName}
                                className="w-full h-full object-cover sepia-[0.2]"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 font-['Cinzel']">No Photo</div>
                        )}
                        {/* Tape effect */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-white/60 backdrop-blur-sm shadow-sm rotate-[1deg] opacity-80"></div>
                    </div>
                </div>

                {/* Name */}
                <h2 className="font-['Cinzel'] text-2xl text-[#4a2c20] font-bold mb-2 tracking-wide">
                    {data.studentName}
                </h2>
                
                <div className="w-12 h-[1px] bg-[#cfaa68] mb-6"></div>

                {/* Quote / Message */}
                <div className="relative px-6">
                    <span className="absolute top-0 left-0 text-4xl text-[#cfaa68] font-serif opacity-30">“</span>
                    <p className="font-['Playfair_Display'] italic text-lg text-gray-700 leading-relaxed">
                        {data.text}
                    </p>
                    <span className="absolute bottom-0 right-0 text-4xl text-[#cfaa68] font-serif opacity-30">”</span>
                </div>

                {/* Decorative Signature */}
                <div className="mt-auto opacity-60 font-['Crimson_Pro'] text-sm text-[#8a6b4e] italic">
                    ~ OSEM Batch '25
                </div>
            </div>
        ) : isFullImage ? (
            // --- Full Image Layout ---
            <div className="flex flex-col h-full">
                {/* Large Photo Area */}
                <div className="flex-grow relative p-2 bg-white border border-gray-200 shadow-md rotate-[0.5deg]">
                     <div className="w-full h-full overflow-hidden bg-gray-100">
                         {imageSource && (
                             <img 
                                src={imageSource} 
                                alt="Full page memory"
                                className="w-full h-full object-cover grayscale-[0.2] contrast-[0.9]"
                             />
                         )}
                     </div>
                     {/* Photo Corner Accents */}
                     <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#4a2c20] opacity-30"></div>
                     <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#4a2c20] opacity-30"></div>
                     <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#4a2c20] opacity-30"></div>
                     <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#4a2c20] opacity-30"></div>
                </div>
                
                {/* Caption Area */}
                <div className="mt-6 text-center">
                    <p className="font-['Crimson_Pro'] italic text-lg text-[#5c4033]">
                        {data.text}
                    </p>
                </div>
            </div>
        ) : (
            // --- Standard Chapter Layout ---
            <>
                {/* Image Area */}
                {imageSource && (
                  <div className="relative w-full h-48 md:h-56 mb-6 overflow-hidden rounded-sm border border-[#d4c5b0] shadow-inner group">
                     <img 
                       src={imageSource} 
                       alt="illustration"
                       className="w-full h-full object-cover sepia-[0.3] opacity-90 transition-transform duration-700 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-transparent to-transparent opacity-80"></div>
                  </div>
                )}

                {/* Text Content */}
                <div className="flex-grow">
                   <p className="font-['Crimson_Pro'] text-lg md:text-xl leading-relaxed text-gray-800 first-letter:text-5xl first-letter:font-['Playfair_Display'] first-letter:float-left first-letter:mr-2 first-letter:mt-[-6px] first-letter:text-[#4a2c20]">
                     {data.text}
                   </p>
                </div>

                {/* Footer Decoration */}
                <div className="mt-auto pt-8 flex justify-center opacity-40">
                   <svg width="40" height="10" viewBox="0 0 40 10" className="fill-[#4a2c20]">
                      <path d="M0,5 Q10,0 20,5 T40,5" fill="none" stroke="#4a2c20" strokeWidth="1" />
                   </svg>
                </div>
            </>
        )}
      </div>

      {/* Binding Shadow Gradient for 3D effect */}
      <div className={`
        absolute top-0 bottom-0 w-8 pointer-events-none z-20
        ${side === 'left' ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'}
        from-[rgba(0,0,0,0.15)] to-transparent
      `}></div>
    </div>
  );
};