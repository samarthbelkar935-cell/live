import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackType: 'stitch' | 'photo1' | 'photo2';
  className?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackType,
  className = '',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setLoading(false);
  };

  // Define unique fallback content for each fallback type
  const renderFallback = () => {
    if (fallbackType === 'stitch') {
      return (
        <div className="w-full h-full min-h-[220px] bg-gradient-to-tr from-sky-400/20 via-indigo-400/20 to-pink-400/20 flex flex-col items-center justify-center p-6 text-center select-none">
          {/* Animated SVG representation of Stitch or a cute heart/alien container */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-fuchsia-500 mb-3"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-16 h-16 drop-shadow-[0_4px_12px_rgba(217,70,239,0.3)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="2" />
              {/* Cute little alien ears */}
              <path d="M3 5c-1-1.5-2.5-3-4-2 .5 2 1.5 5 2.5 5.5" stroke="#38bdf8" strokeWidth="2" />
              <path d="M21 5c1-1.5 2.5-3 4-2-.5 2-1.5 5-2.5 5.5" stroke="#38bdf8" strokeWidth="2" />
            </svg>
          </motion.div>
          <p className="font-display font-semibold text-rose-600 text-lg">Ohana Means Family ❤️</p>
          <p className="text-xs text-purple-700/70 mt-1 max-w-[240px]">
            Sayli, you make my world complete. Let's start our own beautiful story!
          </p>
          <div className="mt-3 px-3 py-1 bg-white/40 backdrop-blur-xs rounded-full border border-white/50 text-[10px] text-pink-600 font-medium uppercase tracking-wider animate-pulse">
            Cute Stitch Loaded in Spirit 😊
          </div>
        </div>
      );
    }

    if (fallbackType === 'photo1') {
      return (
        <div className="w-full h-full min-h-[300px] bg-gradient-to-b from-rose-100 to-amber-50 flex flex-col items-center justify-center p-6 text-center select-none">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-amber-500 mb-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-14 h-14">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5h.008v.008H9V10.5zm6 0h.008v.008H15V10.5z" strokeWidth="2" />
            </svg>
          </motion.div>
          <p className="font-serif italic text-rose-700 text-base font-semibold">Your Brightest Smile ✨</p>
          <p className="text-xs text-rose-700/60 mt-1 max-w-[180px]">
            Every single look at you cleanses my soul.
          </p>
          <span className="font-script text-2xl text-purple-600 mt-4 block">Beautiful Sayli</span>
        </div>
      );
    }

    // photo2 fallback
    return (
      <div className="w-full h-full min-h-[300px] bg-gradient-to-tr from-purple-100 to-rose-50 flex flex-col items-center justify-center p-6 text-center select-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-rose-500 mb-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </motion.div>
        <p className="font-serif italic text-pink-700 text-base font-semibold">Our Shared Infinity ♾️</p>
        <p className="text-xs text-rose-700/60 mt-1 max-w-[180px]">
          In your rhythm, my heart found home.
        </p>
        <span className="font-script text-2xl text-rose-500 mt-4 block">Hand in Hand</span>
      </div>
    );
  };

  return (
    <div className={`relative overflow-hidden w-full h-full flex items-center justify-center ${className}`}>
      {/* Background soft glow during loading */}
      {loading && (
        <div className="absolute inset-0 bg-rose-50/50 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-rose-300 border-t-rose-600 animate-spin" />
        </div>
      )}

      {hasError ? (
        renderFallback()
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
    </div>
  );
}
