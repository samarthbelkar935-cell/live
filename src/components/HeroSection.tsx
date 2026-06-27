import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ImageWithFallback from './ImageWithFallback';
import Typewriter from './Typewriter';
import { playEnvelopeOpenSound } from '../utils/audio';

interface HeroSectionProps {
  targetName: string;
  proposalMessage: string;
  vibe: string;
  theme?: 'rose' | 'midnight' | 'gold';
  proposalDate?: string;
  bannerImage?: string;
  onYes: () => void;
  onBackToSetup?: () => void;
}

export default function HeroSection({
  targetName,
  proposalMessage,
  vibe,
  theme = 'rose',
  proposalDate,
  bannerImage,
  onYes,
  onBackToSetup,
}: HeroSectionProps) {
  const isDark = theme === 'midnight';
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  } | null>(null);
  const [isLetterRevealed, setIsLetterRevealed] = useState(false);
  const [isFlapOpened, setIsFlapOpened] = useState(false);

  const handleOpen = () => {
    setIsFlapOpened(true);
    playEnvelopeOpenSound();
    setTimeout(() => {
      setIsLetterRevealed(true);
    }, 1200);
  };

  useEffect(() => {
    if (!proposalDate) {
      setTimeLeft(null);
      return;
    }

    const calculateTimeLeft = () => {
      const targetTime = new Date(proposalDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (isNaN(targetTime)) {
        setTimeLeft(null);
        return;
      }

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [proposalDate]);

  const titleLetters = Array.from(targetName ? `${targetName} ❤️` : "Beautiful ❤️");

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
      transition: { type: 'spring', stiffness: 120, damping: 9 }
    }
  };

  if (!isLetterRevealed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-3 py-6 z-15 w-full">
        {/* Envelope Container - fluid and scaled with breakpoints */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          onClick={handleOpen}
          className="relative w-[280px] h-[182px] xs:w-80 xs:h-52 sm:w-[420px] sm:h-[280px] bg-rose-50 rounded-2xl shadow-[0_30px_70px_rgba(244,63,94,0.25)] border border-rose-100/60 cursor-pointer group flex flex-col items-center justify-center overflow-visible select-none"
        >
          {/* Backplate / shadow depth inside */}
          <div className="absolute inset-0 bg-rose-100/40 rounded-2xl" />

          {/* Envelope Paper/Letter inside (peeking & sliding out) */}
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={isFlapOpened ? { y: -80, opacity: 1 } : { y: 0, opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="absolute top-4 w-[90%] h-[80%] bg-white rounded-xl shadow-md p-3 xs:p-4 flex flex-col items-center justify-center border border-rose-50/40 z-10"
          >
            <p className="font-serif italic text-xs xs:text-sm text-rose-600 font-medium">Dear {targetName || 'Beloved'},</p>
            <p className="text-[9px] xs:text-[10px] font-mono uppercase tracking-widest text-gray-400 mt-2">A special secret awaits...</p>
          </motion.div>

          {/* Envelope Flaps (Bottom, Left, Right) */}
          {/* Left Flap */}
          <div 
            className="absolute left-0 inset-y-0 w-0 border-l-[140px] xs:border-l-[160px] sm:border-l-[210px] border-l-rose-200/70 border-y-[91px] xs:border-y-[104px] sm:border-y-[140px] border-y-transparent z-20 rounded-l-2xl" 
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Right Flap */}
          <div 
            className="absolute right-0 inset-y-0 w-0 border-r-[140px] xs:border-r-[160px] sm:border-r-[210px] border-r-rose-200/70 border-y-[91px] xs:border-y-[104px] sm:border-y-[140px] border-y-transparent z-20 rounded-r-2xl" 
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Bottom Flap */}
          <div 
            className="absolute bottom-0 inset-x-0 h-0 border-b-[96px] xs:border-b-[110px] sm:border-b-[148px] border-b-rose-200 border-x-[140px] xs:border-x-[160px] sm:border-x-[210px] border-x-transparent z-20 rounded-b-2xl" 
            style={{ pointerEvents: 'none' }}
          />

          {/* Top Flap (Flips Up) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isFlapOpened ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute top-0 inset-x-0 h-0 border-t-[88px] xs:border-t-[100px] sm:border-t-[136px] border-t-rose-300/80 border-x-[140px] xs:border-x-[160px] sm:border-x-[210px] border-x-transparent origin-top z-30 rounded-t-2xl"
            style={{ pointerEvents: 'none', transformStyle: 'preserve-3d' }}
          />

          {/* Wax Seal / Interactive Heart Trigger Button */}
          <motion.div
            animate={isFlapOpened ? { scale: 0, opacity: 0 } : { scale: [1, 1.08, 1], rotate: [0, -2, 2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-40 bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 w-12 h-12 xs:w-16 xs:h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-amber-200 hover:brightness-105 active:scale-95 transition-all"
          >
            <span className="text-white text-xl xs:text-2xl drop-shadow-sm filter">❤️</span>
          </motion.div>

          {/* "For You" Name Label */}
          {!isFlapOpened && (
            <div className="absolute bottom-3 xs:bottom-4 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none w-full px-4">
              <p className="font-serif text-xs xs:text-sm sm:text-base italic text-rose-800 font-semibold tracking-wide truncate max-w-[200px] xs:max-w-[240px] mx-auto">
                {targetName ? `For My Beloved ${targetName}` : 'For You'}
              </p>
              <p className="text-[8px] xs:text-[9px] uppercase tracking-widest text-rose-600/70 mt-1 font-sans font-bold bg-white/70 px-2 py-0.5 rounded-full shadow-2xs inline-block">
                Click to open
              </p>
            </div>
          )}
        </motion.div>

        {onBackToSetup && (
          <button
            onClick={onBackToSetup}
            className={`mt-6 text-[9px] xs:text-[10px] font-mono tracking-widest transition-colors uppercase cursor-pointer z-20 ${isDark ? 'text-blue-300 hover:text-rose-400' : 'text-gray-500 hover:text-rose-500'}`}
          >
            ← Edit Configuration
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`relative z-10 w-[calc(100%-1.5rem)] xs:w-[calc(100%-2rem)] max-w-2xl backdrop-blur-2xl border rounded-[32px] xs:rounded-[40px] p-5 xs:p-8 sm:p-12 flex flex-col items-center transform transition-all my-6 mx-auto overflow-hidden ${isDark ? 'bg-slate-900/40 border-blue-900/40 shadow-[0_20px_50px_rgba(0,0,0,0.35)] text-white' : 'bg-white/30 border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-gray-800'}`}>
      
      {/* Background Banner Image */}
      {bannerImage && (
        <div className="absolute top-0 left-0 right-0 h-32 sm:h-44 w-full overflow-hidden border-b border-white/15 z-0">
          <img
            src={bannerImage}
            alt="Romantic Background Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${isDark ? 'from-transparent via-slate-900/70 to-slate-900' : 'from-transparent via-white/40 to-white/95'}`} />
        </div>
      )}

      {/* Narrative Surprise Header + Floating Tag */}
      <div className={`mb-6 sm:mb-8 relative w-full flex flex-col items-center justify-center z-10 ${bannerImage ? 'mt-14 sm:mt-20' : ''}`}>
        
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
          className="w-36 h-36 xs:w-48 xs:h-48 bg-white/50 rounded-3xl overflow-hidden border-4 border-white/60 shadow-inner flex items-center justify-center p-2.5 xs:p-3 transform rotate-3 hover:rotate-0 transition-transform duration-500 relative"
        >
          <div className="w-full h-full rounded-2xl overflow-hidden bg-pink-100/30">
            <ImageWithFallback
              src="./stitch.gif"
              alt="Stitch Proposal Gif"
              fallbackType="stitch"
              targetName={targetName}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Floating Heart Ribbon - from Immersive UI Spec */}
        <div className="absolute -top-3 right-1/2 translate-x-20 xs:translate-x-24 sm:translate-x-28 bg-white px-3 py-1 rounded-full text-[10px] xs:text-[11px] font-bold text-rose-500 shadow-xs border border-rose-100 tracking-wider">
          FOR YOU ❤️
        </div>
      </div>

      {/* Main Title Setup */}
      <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 w-full px-2">
        
        {/* Letter-by-letter spring container */}
        <motion.h1
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
          className={`text-3xl xs:text-4xl sm:text-5xl font-serif leading-tight tracking-tight break-words ${isDark ? 'text-white' : 'text-gray-800'}`}
        >
          {titleLetters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ marginRight: char === ' ' ? '8px' : '1.5px' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Cinematic Subtitles - matching Immersive UI Spec */}
        <p className={`text-sm sm:text-base font-light italic tracking-wide max-w-md mx-auto ${isDark ? 'text-blue-200/90' : 'text-gray-600'}`}>
          "In a world full of temporary things, you are my forever."
        </p>

        {/* Typing reveal text question with intimate typewriter animation */}
        <div className="min-h-[2.5rem] mt-1.5 max-w-md mx-auto flex items-center justify-center">
          <Typewriter
            text={proposalMessage}
            className={`text-lg xs:text-xl sm:text-2xl font-medium tracking-wide font-serif text-center ${isDark ? 'text-rose-200' : 'text-gray-750'}`}
            speed={75}
            delay={800}
          />
        </div>
      </div>

      {/* Interactive Choice Center */}
      <div className="w-full min-h-[120px] flex flex-col items-center justify-center relative">
        {timeLeft && !timeLeft.isPast ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full flex flex-col items-center justify-center space-y-6 p-6 backdrop-blur-md rounded-3xl border shadow-sm ${isDark ? 'bg-slate-900/60 border-blue-900/40' : 'bg-white/40 border-white/50'}`}
          >
            <div className="text-center space-y-1">
              <span className={`text-xs font-mono uppercase tracking-[0.2em] font-semibold ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                ⏳ Beautiful Anticipation
              </span>
              <p className={`text-sm font-medium font-serif mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Our romantic journey scheduled to reveal in:
              </p>
            </div>

            {/* Elegant 4-Column Time Grid */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-sm">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((unit, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col items-center justify-center backdrop-blur-xs rounded-2xl p-2.5 sm:p-4 border shadow-xs relative overflow-hidden group hover:scale-[1.03] transition-all ${isDark ? 'bg-slate-950/65 border-blue-950/50' : 'bg-white/60 border-rose-100'}`}
                >
                  <span className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight transition-colors ${isDark ? 'text-rose-400 group-hover:text-rose-300' : 'text-rose-500 group-hover:text-rose-600'}`}>
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest mt-1 ${isDark ? 'text-blue-300/60' : 'text-gray-400'}`}>
                    {unit.label}
                  </span>
                  {/* Glowing decorative effect */}
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></span>
                </div>
              ))}
            </div>

            <div className="text-center space-y-2 pt-1">
              <p className={`text-[11px] font-mono uppercase tracking-widest ${isDark ? 'text-blue-300/50' : 'text-purple-700/60'}`}>
                Scheduled for: {new Date(proposalDate!).toLocaleString()}
              </p>
              
              {/* Optional test preview bypass to check buttons/animations */}
              <button
                onClick={onYes}
                className={`text-[11px] font-sans hover:underline transition-all cursor-pointer font-semibold flex items-center justify-center gap-1.5 mx-auto ${isDark ? 'text-rose-400 hover:text-rose-300' : 'text-rose-500 hover:text-rose-600'}`}
              >
                <span>✨ Preview Proposal Instantly</span>
              </button>
            </div>
          </motion.div>
        ) : (
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
                  className={`backdrop-blur-md rounded-full font-display font-medium text-xs py-2.5 px-6 shadow-xs transition-all cursor-pointer whitespace-nowrap border ${isDark ? 'bg-slate-950/45 hover:bg-slate-900/60 text-blue-300 border-blue-900/40' : 'bg-white/50 hover:bg-white/80 text-gray-500 border-white/40'}`}
                >
                  No... 😢
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.5, scale: 0.8 }}
                  className={`text-xs font-semibold backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 cursor-not-allowed select-none italic border ${isDark ? 'text-rose-400 bg-slate-950/50 border-blue-950/30' : 'text-rose-500 bg-white/45 border-white/50'}`}
                >
                  <span>No options left 🔒</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Underline Helper Hint Card */}
      {noCount > 0 && noCount < 5 && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center text-[11px] font-mono mt-4 ${isDark ? 'text-blue-300/50' : 'text-purple-700/50'}`}
        >
          {noCount} empty attempts. The universe wants a "Yes"! 🪐
        </motion.p>
      )}

      {noCount >= 5 && noCount < 10 && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-center text-xs font-semibold py-2 px-4 rounded-xl mt-4 animate-bounce border ${isDark ? 'text-rose-400 bg-slate-950/60 border-rose-950/30' : 'text-rose-600 bg-rose-50 border-rose-100'}`}
        >
          The 'No' button is retreating... Please say Yes! 🌸
        </motion.p>
      )}

      {onBackToSetup && (
        <button
          onClick={onBackToSetup}
          className={`mt-6 text-[10px] font-mono tracking-widest transition-colors uppercase cursor-pointer ${isDark ? 'text-blue-300 hover:text-rose-400' : 'text-gray-400 hover:text-rose-500'}`}
        >
          ← Edit Configuration
        </button>
      )}
    </div>
  );
}
