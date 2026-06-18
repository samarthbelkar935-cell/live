import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ImageWithFallback from './ImageWithFallback';

interface HeroSectionProps {
  onYes: () => void;
}

export default function HeroSection({ onYes }: HeroSectionProps) {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);

  const titleLetters = Array.from("Sayli Gayke ❤️");

  // Runaway button mechanism
  const teleportNoButton = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (noCount >= 10) return; // Completely disabled or morphed

    const width = window.innerWidth;
    const height = window.innerHeight;

    const btnWidth = 120;
    const btnHeight = 44;
    const padding = 35;

    // Calculate random position in viewport boundaries
    const maxX = width - btnWidth - padding;
    const minX = padding;
    const maxY = height - btnHeight - padding;
    const minY = padding;

    let newX = Math.random() * (maxX - minX) + minX;
    let newY = Math.random() * (maxY - minY) + minY;

    // Get cursor position to push away from if near
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    if (clientX && clientY) {
      const distance = Math.hypot(newX - clientX, newY - clientY);
      if (distance < 160) {
        // Push button away from current pointer coords
        newX = (newX + 300) > maxX ? (newX - 300) : (newX + 300);
        newY = (newY + 250) > maxY ? (newY - 250) : (newY + 250);
        
        // Final bounds guard
        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));
      }
    }

    setNoPosition({ x: newX, y: newY });
    setNoCount((prev) => prev + 1);
  };

  const yesScale = 1 + noCount * 0.15;
  const noScale = Math.max(0.3, 1 - noCount * 0.08);

  // Stagger configurations for title letters
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.4 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stifness: 120, damping: 9 }
    }
  };

  return (
    <div className="relative z-10 w-full max-w-2xl bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[40px] p-6 sm:p-12 flex flex-col items-center transform transition-all my-8 mx-4">
      
      {/* Narrative Surprise Header + Floating Tag */}
      <div className="mb-8 relative w-full flex flex-col items-center justify-center">
        
        {/* Stitch 3D-Tilt Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.2 }}
          whileHover={{
            rotateY: 8,
            rotateX: -4,
            z: 30,
            perspective: 1000,
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
          className="w-48 h-48 bg-white/50 rounded-3xl overflow-hidden border-4 border-white/60 shadow-inner flex items-center justify-center p-3 transform rotate-3 hover:rotate-0 transition-transform duration-500 relative"
        >
          <div className="w-full h-full rounded-2xl overflow-hidden bg-pink-100/30">
            <ImageWithFallback
              src="./stitch.gif"
              alt="Stitch Proposal Gif"
              fallbackType="stitch"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Floating Heart Ribbon - from Immersive UI Spec */}
        <div className="absolute -top-4 right-1/2 translate-x-24 sm:translate-x-28 bg-white px-4 py-1 rounded-full text-[11px] font-bold text-rose-500 shadow-xs border border-rose-100 tracking-wider">
          FOR YOU ❤️
        </div>
      </div>

      {/* Main Title Setup */}
      <div className="text-center space-y-4 mb-8">
        
        {/* Letter-by-letter spring container */}
        <motion.h1
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl font-serif text-gray-800 leading-tight tracking-tight"
        >
          {titleLetters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ marginRight: char === ' ' ? '12px' : '2px' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Cinematic Subtitles - matching Immersive UI Spec */}
        <p className="text-base sm:text-lg text-gray-600 font-light italic tracking-wide max-w-md mx-auto">
          "In a world full of temporary things, you are my forever."
        </p>

        {/* Typing reveal text question */}
        <div className="h-8 mt-2 max-w-xs mx-auto flex items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: [0.6, 1, 0.6], scale: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xl sm:text-2xl font-medium text-gray-700 tracking-wide"
          >
            Will you forever be mine?
          </motion.h2>
        </div>
      </div>

      {/* Interactive Choice Center */}
      <div className="w-full min-h-[120px] flex flex-col items-center justify-center relative">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative w-full">
          
          {/* YES PULSE HEARTBEAT BUTTON */}
          <motion.button
            onClick={onYes}
            style={{ scale: yesScale }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(244, 63, 94, 0.4)",
                "0 0 0 16px rgba(244, 63, 94, 0)",
              ]
            }}
            transition={{
              boxShadow: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }
            }}
            whileHover={{ scale: yesScale * 1.08 }}
            whileTap={{ scale: yesScale * 0.95 }}
            className="bg-rose-500 hover:bg-rose-600 text-white font-display font-medium text-xl py-4.5 px-12 rounded-full shadow-[0_10px_30px_rgba(244,63,94,0.4)] transition-all z-20 flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-6 h-6 text-white animate-pulse"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            Yes ❤️
          </motion.button>

          {/* RUNAWAY "NO" BUTTON */}
          <AnimatePresence>
            {noCount < 10 ? (
              <motion.button
                key="runaway-no"
                onMouseEnter={teleportNoButton}
                onTouchStart={teleportNoButton}
                style={
                  noPosition
                    ? {
                        position: 'fixed',
                        left: noPosition.x,
                        top: noPosition.y,
                        scale: noScale,
                        zIndex: 50,
                      }
                    : { scale: noScale }
                }
                whileHover={{ scale: noScale * 0.95 }}
                className="bg-white/50 hover:bg-white/80 backdrop-blur-md text-gray-500 border border-white/40 rounded-full font-display font-medium text-xs py-2.5 px-6 shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                No... 😢
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.5, scale: 0.8 }}
                className="text-xs font-semibold text-rose-500 bg-white/45 border border-white/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 cursor-not-allowed select-none italic"
              >
                <span>No options left 🔒</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Underline Helper Hint Card */}
      {noCount > 0 && noCount < 5 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-[11px] font-mono text-purple-700/50 mt-4"
        >
          {noCount} empty attempts. The universe wants a "Yes"! 🪐
        </motion.p>
      )}

      {noCount >= 5 && noCount < 10 && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 py-2 px-4 rounded-xl mt-4 animate-bounce"
        >
          The 'No' button is retreating... Please say Yes! 🌸
        </motion.p>
      )}
    </div>
  );
}
