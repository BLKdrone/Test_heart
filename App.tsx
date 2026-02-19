
import React, { useState, useCallback, useMemo } from 'react';
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

  // Generate random fireflies for the Festival Page
  const fireflies = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${4 + Math.random() * 4}s`,
    }));
  }, []);

  const currentSlide = STORY_SLIDES[currentIndex];

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black flex flex-col items-center justify-center text-white">
      {/* Background Images */}
      {STORY_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
            !isExhibitionPage && index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Festival Page Background & Effects */}
      <div 
        className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${isExhibitionPage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-neutral-900 to-black" />
        {isExhibitionPage && fireflies.map((f) => (
          <div
            key={f.id}
            className="firefly"
            style={{
              top: f.top,
              left: f.left,
              animation: `float ${f.duration} ease-in-out ${f.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handleBack}
        disabled={currentIndex === 0 && !isExhibitionPage}
        className={`fixed top-6 right-6 z-50 text-sm tracking-widest transition-all duration-300 ${
          currentIndex === 0 && !isExhibitionPage ? 'opacity-0 pointer-events-none' : 'opacity-50 hover:opacity-100'
        }`}
      >
        BACK
      </button>

      {/* Content Area */}
      <div className="relative z-10 w-full max-w-2xl px-8 text-center select-none">
        {!isExhibitionPage ? (
          <div key={currentIndex}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed slide-up mb-12">
              {currentSlide.text}
            </h1>

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
                <span className="text-xl font-light opacity-80">{happiness}%</span>
              </div>
            )}

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
          <div className="fade-in flex flex-col items-center space-y-12 py-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider text-amber-50/90">
                The Festival of the Heart
              </h1>
              <p className="text-sm md:text-base tracking-[0.2em] uppercase opacity-60 font-light">
                A celebration of memory, emotion, and transformation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-10 w-full max-w-lg mt-8">
              <section className="slide-up text-center border-l border-white/5 pl-6" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-xs uppercase tracking-[0.4em] text-amber-200/60 mb-2">Memory Booth</h2>
                <p className="text-base font-light opacity-70 leading-relaxed">
                  Revisit the echoes of yesterday, where forgotten moments whisper their stories once more.
                </p>
              </section>

              <section className="slide-up text-center border-l border-white/5 pl-6" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-xs uppercase tracking-[0.4em] text-amber-200/60 mb-2">Emotion Tunnel</h2>
                <p className="text-base font-light opacity-70 leading-relaxed">
                  Walk through the spectrum of the soul, discovering the vibrant colors of your own resilience.
                </p>
              </section>

              <section className="slide-up text-center border-l border-white/5 pl-6" style={{ animationDelay: '0.6s' }}>
                <h2 className="text-xs uppercase tracking-[0.4em] text-amber-200/60 mb-2">Transformation Stage</h2>
                <p className="text-base font-light opacity-70 leading-relaxed">
                  A threshold of light where the old self fades, giving space for a beautiful new becoming.
                </p>
              </section>
            </div>

            <div className="pt-8 slide-up" style={{ animationDelay: '0.9s' }}>
               <button
                onClick={handleRestart}
                className="group relative px-14 py-4 text-sm font-light tracking-[0.4em] transition-all duration-700 overflow-hidden"
              >
                <span className="relative z-10 text-amber-50 group-hover:text-white">CONTINUE THE JOURNEY</span>
                <div className="absolute inset-0 border border-amber-200/20 transition-all duration-700 group-hover:border-amber-200/50" />
                <div className="absolute inset-0 bg-amber-200/0 group-hover:bg-amber-200/5 transition-all duration-700 blur-xl" />
                <div className="absolute inset-0 shadow-[0_0_30px_rgba(251,191,36,0)] group-hover:shadow-[0_0_40px_rgba(251,191,36,0.1)] transition-all" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Next Button */}
      {!isExhibitionPage && (
        <div className="fixed bottom-12 left-0 w-full flex justify-center z-50 px-4">
          <button
            onClick={handleNext}
            className="group relative px-12 py-4 text-lg font-light tracking-[0.2em] transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10">
              {currentIndex === STORY_SLIDES.length - 1 ? 'จบการเดินทาง' : 'NEXT'}
            </span>
            <div className="absolute inset-0 border border-white/20 transition-colors group-hover:bg-white/10" />
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
