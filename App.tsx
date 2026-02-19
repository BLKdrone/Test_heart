
import React, { useState, useCallback } from 'react';
import { STORY_SLIDES, EMOJIS } from './constants';
import { EmojiType } from './types';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [happiness, setHappiness] = useState(50);
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiType | null>(null);
  const [isExhibitionPage, setIsExhibitionPage] = useState(false);

  const handleNext = useCallback(() => {
    if (currentIndex < STORY_SLIDES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Transition to Exhibition Explanation page instead of resetting
      setIsExhibitionPage(true);
    }
  }, [currentIndex]);

  const handleBack = useCallback(() => {
    if (isExhibitionPage) {
      setIsExhibitionPage(false);
    } else if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [isExhibitionPage, currentIndex]);

  const handleRestart = useCallback(() => {
    setIsExhibitionPage(false);
    setCurrentIndex(0);
    setHappiness(50);
    setSelectedEmoji(null);
  }, []);

  const currentSlide = STORY_SLIDES[currentIndex];

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black flex flex-col items-center justify-center text-white">
      {/* Background Image with Transition */}
      {STORY_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            !isExhibitionPage && index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Special Background for Exhibition Page (Optional, reusing last slide's overlay style) */}
      {isExhibitionPage && (
        <div className="absolute inset-0 bg-neutral-900 transition-opacity duration-1000 opacity-100">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 to-black opacity-50" />
        </div>
      )}

      {/* Back Button (Top Right) */}
      <button
        onClick={handleBack}
        disabled={currentIndex === 0 && !isExhibitionPage}
        className={`fixed top-6 right-6 z-50 text-sm tracking-widest transition-all duration-300 ${
          currentIndex === 0 && !isExhibitionPage ? 'opacity-0 pointer-events-none' : 'opacity-50 hover:opacity-100'
        }`}
      >
        BACK
      </button>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-2xl px-8 text-center select-none">
        {!isExhibitionPage ? (
          <div key={currentIndex}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed slide-up mb-12">
              {currentSlide.text}
            </h1>

            {/* Special Content: Happiness Slider (Slide 5) */}
            {currentSlide.isSpecial === 'slider' && (
              <div className="fade-in flex flex-col items-center space-y-6">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={happiness}
                  onChange={(e) => setHappiness(parseInt(e.target.value))}
                  className="w-full max-w-xs"
                />
                <span className="text-xl font-light opacity-80">
                  {happiness}%
                </span>
              </div>
            )}

            {/* Special Content: Emoji Selector (Slide 7) */}
            {currentSlide.isSpecial === 'emoji' && (
              <div className="fade-in flex justify-center space-x-6">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`text-4xl md:text-5xl transition-all duration-300 transform hover:scale-125 ${
                      selectedEmoji === emoji ? 'scale-125 opacity-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'opacity-40 grayscale-[0.5]'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="fade-in text-left space-y-12 max-w-xl mx-auto py-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-center mb-16 border-b border-white/10 pb-8">
              Behind the Exhibition
            </h1>
            
            <section className="slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-xs uppercase tracking-[0.3em] opacity-40 mb-3 font-semibold">Section 1 – Concept</h2>
              <p className="text-lg font-light leading-relaxed opacity-80">
                This exhibition represents a journey of the heart, moving through memories, emotions, and transformation. It is a visual exploration of the silent spaces between our thoughts.
              </p>
            </section>

            <section className="slide-up" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-xs uppercase tracking-[0.3em] opacity-40 mb-3 font-semibold">Section 2 – Purpose</h2>
              <p className="text-lg font-light leading-relaxed opacity-80">
                The goal is to let visitors reflect on their own inner story, providing a safe sanctuary to acknowledge feelings that are often overlooked in the rush of daily life.
              </p>
            </section>

            <section className="slide-up" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-xs uppercase tracking-[0.3em] opacity-40 mb-3 font-semibold">Section 3 – Message</h2>
              <p className="text-lg font-light italic leading-relaxed opacity-90">
                "Growth is not always a loud blooming; sometimes it is the quiet turning of a page, a subtle shift in the light, and the brave act of finally seeing yourself."
              </p>
            </section>

            <div className="pt-12 flex justify-center slide-up" style={{ animationDelay: '0.7s' }}>
               <button
                onClick={handleRestart}
                className="group relative px-12 py-4 text-sm font-light tracking-[0.3em] transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 text-white">RESTART THE JOURNEY</span>
                <div className="absolute inset-0 border border-white/20 transition-colors group-hover:bg-white/10" />
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Next Button (Fixed Bottom) - Hidden on Exhibition Page */}
      {!isExhibitionPage && (
        <div className="fixed bottom-12 left-0 w-full flex justify-center z-50 px-4">
          <button
            onClick={handleNext}
            className="group relative px-12 py-4 text-lg font-light tracking-[0.2em] transition-all duration-500 overflow-hidden"
          >
            {/* Button Label */}
            <span className="relative z-10">
              {currentIndex === STORY_SLIDES.length - 1 ? 'จบการเดินทาง' : 'NEXT'}
            </span>
            
            {/* Subtle Background Effect */}
            <div className="absolute inset-0 border border-white/20 transition-colors group-hover:bg-white/10" />
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
