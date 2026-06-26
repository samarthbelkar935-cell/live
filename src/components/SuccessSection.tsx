import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ImageWithFallback from './ImageWithFallback';
import LoveStoryTimeline from './LoveStoryTimeline';

interface SuccessSectionProps {
  targetName: string;
  proposalMessage: string;
  authorName: string;
  vibe: string;
  onBack?: () => void;
}

export default function SuccessSection({
  targetName,
  proposalMessage,
  authorName,
  vibe,
  onBack,
}: SuccessSectionProps) {
  const romanticPromises = [
    `In a world full of temporary things, you are my forever, ${targetName}. ❤️`,
    "Meeting you was fate, but falling in love with you was beyond my control.",
    "Your laugh is my favorite soundtrack, and your happiness is my ultimate goal.",
    `Together is my favorite place to be. Will you make it permanent, ${targetName}?`,
    "Every heartbeat of mine echoes your name. Every dream of mine is colored with your smile."
  ];

  const [activeLetterIdx, setActiveLetterIdx] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 18 } 
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 w-full max-w-5xl mx-auto py-12 px-4 md:px-6 flex flex-col items-center justify-center min-h-screen text-gray-800"
    >
      {/* Decorative Floating Golden Stars */}
      <div className="absolute top-10 left-10 text-amber-400 opacity-60 animate-bounce delay-75 pointer-events-none">✨</div>
      <div className="absolute top-40 right-10 text-amber-400 opacity-60 animate-pulse pointer-events-none">✨</div>

      {/* Main Congratulations Header */}
      <motion.div variants={itemVariants} className="text-center max-w-2xl mt-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-rose-200 shadow-xs">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Destiny Connected
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl text-gray-900 leading-tight">
          Yay ❤️ This moment is special
        </h1>
        
        <p className="font-serif italic text-base md:text-lg text-purple-700/90 mt-5 leading-relaxed max-w-lg mx-auto">
          "In all the universe, my heart has chosen your rhythm. Let's write our forever, starting right now."
        </p>
      </motion.div>

      {/* Polaroid Gallery Section */}
      <motion.div 
        variants={itemVariants} 
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 mt-12 mb-16"
      >
        {/* Polaroid 1 */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -1, zIndex: 20 }}
          initial={{ rotate: -5, y: 15 }}
          animate={{ rotate: -3, y: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 15 }}
          className="relative bg-white p-4 pb-8 shadow-2xl rounded-xs border border-gray-100 max-w-[280px] w-full transform origin-bottom hover:shadow-[0_20px_45px_rgba(244,63,94,0.15)] transition-shadow duration-300"
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-100/70 border border-amber-200/40 -rotate-3 rounded-xs flex items-center justify-center text-[10px] uppercase text-amber-800/60 tracking-wider">
            tape
          </div>
          <div className="w-full aspect-[4/5] rounded-xs bg-gray-50 overflow-hidden border border-gray-200/50 mt-4">
            <ImageWithFallback 
              src="./photo1.jpg" 
              alt={`${targetName} Polaroid 1`} 
              fallbackType="photo1" 
            />
          </div>
          <div className="mt-4 text-center">
            <p className="font-script text-3xl text-rose-500 font-bold leading-none">{targetName}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mt-1">My shining star</p>
          </div>
        </motion.div>

        {/* Polaroid 2 */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 1, zIndex: 20 }}
          initial={{ rotate: 5, y: 15 }}
          animate={{ rotate: 3, y: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 15 }}
          className="relative bg-white p-4 pb-8 shadow-2xl rounded-xs border border-gray-100 max-w-[280px] w-full transform origin-bottom hover:shadow-[0_20px_45px_rgba(244,63,94,0.15)] transition-shadow duration-300"
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-100/70 border border-amber-200/40 rotate-2 rounded-xs flex items-center justify-center text-[10px] uppercase text-amber-800/60 tracking-wider">
            forever tag
          </div>
          <div className="w-full aspect-[4/5] rounded-xs bg-gray-50 overflow-hidden border border-gray-200/50 mt-4">
            <ImageWithFallback 
              src="./photo2.jpg" 
              alt={`${targetName} Polaroid 2`} 
              fallbackType="photo2" 
            />
          </div>
          <div className="mt-4 text-center">
            <p className="font-script text-3xl text-purple-600 font-bold leading-none">Hand in Hand</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mt-1">Our joint journey</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Love Letters Epistle Stack */}
      <motion.div variants={itemVariants} className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-2xl border border-white/45 p-6 shadow-xl mb-16">
        <div className="flex items-center gap-2 border-b border-white/40 pb-3 mb-4">
          <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
          </svg>
          <h3 className="font-display font-semibold text-gray-800 text-sm tracking-wide">Interactive Love Letters</h3>
        </div>

        <div className="relative min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLetterIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-2 px-4"
            >
              <p className="font-serif italic text-base text-gray-800 leading-relaxed">
                "{romanticPromises[activeLetterIdx]}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Swipe / Next letter paginators */}
        <div className="flex items-center justify-between mt-6 pt-3 border-t border-white/20">
          <span className="text-xs text-purple-700/60 font-mono font-medium">
            Letter {activeLetterIdx + 1} of {romanticPromises.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLetterIdx((prev) => (prev > 0 ? prev - 1 : romanticPromises.length - 1))}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-rose-500 font-semibold text-sm flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              title="Previous letter"
            >
              ←
            </button>
            <button
              onClick={() => setActiveLetterIdx((prev) => (prev + 1) % romanticPromises.length)}
              className="px-4 h-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-xs flex items-center justify-center transition-colors shadow-sm cursor-pointer"
            >
              Read Next ❤️
            </button>
          </div>
        </div>
      </motion.div>

      {/* Love Story Timeline */}
      <motion.div variants={itemVariants} className="w-full">
        <LoveStoryTimeline />
      </motion.div>

      {/* Cinematic Outro / Footer Section */}
      <motion.div 
        variants={itemVariants} 
        className="w-full border-t border-white/30 pt-16 pb-8 text-center mt-8 relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 -translate-y-10 rounded-full bg-pink-100/60 border border-white/40 shadow-inner flex items-center justify-center">
          <motion.svg 
            animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 text-rose-500" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
        </div>

        <p className="font-mono text-gray-500 text-[10px] uppercase tracking-widest gap-2">
          Made exclusively with deep adoration
        </p>
        
        {/* Signature */}
        <div className="mt-6 flex flex-col items-center justify-center">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-script text-5xl md:text-6xl text-rose-600 font-bold hover:scale-105 active:scale-95 transition-transform duration-300 select-none cursor-default py-2"
          >
            {authorName}
          </motion.p>
          <div className="w-10 h-0.5 bg-rose-400 mt-2 opacity-50" />
        </div>

        {/* Temporary Go Back control for verification if needed */}
        {onBack && (
          <button
            onClick={onBack}
            className="mt-12 text-[10px] font-mono text-gray-500 hover:text-rose-500 tracking-wider transition-colors uppercase underline decoration-rose-300"
          >
            Reset Proposal
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
