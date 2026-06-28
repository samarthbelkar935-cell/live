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
  
  // Envelope and layout dynamic styling variables
  let envelopeBg = "bg-rose-50";
  let envelopeShadow = "shadow-[0_30px_70px_rgba(244,63,94,0.25)]";
  let envelopeBorder = "border-rose-100/60";
  let backplateBg = "bg-rose-100/40";
  let letterBorder = "border-rose-50/40";
  let letterText = "text-rose-600";
  let labelText = "text-rose-800";
  let hintLabelBg = "bg-white/70 text-rose-600/70";

  let leftFlapColor = "border-l-rose-200/70";
  let rightFlapColor = "border-r-rose-200/70";
  let bottomFlapColor = "border-b-rose-200";
  let topFlapColor = "border-t-rose-300/80";

  let cardClass = "bg-white/35 border-white/50 shadow-[0_20px_50px_rgba(244,63,94,0.1)] text-gray-800";
  let bannerOverlay = "from-transparent via-white/40 to-white/95";
  let headingColor = "text-gray-800";
  let subtitleColor = "text-gray-600";
  let typewriterColor = "text-rose-600";
  
  let countdownBg = "bg-white/40 border-white/50";
  let labelColor = "text-pink-600";
  let descColor = "text-gray-600";
  let gridItemBg = "bg-white/60 border-rose-100";
  let gridItemNumColor = "text-rose-500 group-hover:text-rose-600";
  let gridItemLabelColor = "text-gray-400";
  let detailLabelColor = "text-purple-700/60";
  let bypassBtnColor = "text-rose-500 hover:text-rose-600";
  let editBtnColor = "text-gray-500 hover:text-rose-500";
  let noBtnColor = "bg-white/50 hover:bg-white/80 text-gray-500 border-white/40";
  let noLeftBtnColor = "text-rose-500 bg-white/45 border-white/50";
  let textAttemptColor = "text-purple-700/50";
  let textRetreatColor = "text-rose-600 bg-rose-50 border-rose-100";
  let yesBtnClass = "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_10px_30px_rgba(244,63,94,0.4)]";
  let pulseColor = "rgba(244, 63, 94, 0.4)";
  let pulseColorEnd = "rgba(244, 63, 94, 0)";

  if (theme === 'midnight') {
    envelopeBg = "bg-slate-900";
    envelopeShadow = "shadow-[0_30px_70px_rgba(30,58,138,0.4)]";
    envelopeBorder = "border-blue-900/45";
    backplateBg = "bg-blue-950/40";
    letterBorder = "border-blue-900/40";
    letterText = "text-blue-400 font-semibold";
    labelText = "text-blue-200";
    hintLabelBg = "bg-slate-950/80 text-blue-300/80";

    leftFlapColor = "border-l-blue-900/75";
    rightFlapColor = "border-r-blue-900/75";
    bottomFlapColor = "border-b-blue-950";
    topFlapColor = "border-t-blue-800/85";

    cardClass = "bg-slate-900/40 border-blue-900/40 shadow-[0_20px_50px_rgba(0,0,0,0.35)] text-white";
    bannerOverlay = "from-transparent via-slate-900/70 to-slate-900";
    headingColor = "text-white";
    subtitleColor = "text-blue-200/90";
    typewriterColor = "text-rose-200";

    countdownBg = "bg-slate-900/60 border-blue-900/40";
    labelColor = "text-pink-400";
    descColor = "text-gray-300";
    gridItemBg = "bg-slate-950/65 border-blue-950/50";
    gridItemNumColor = "text-rose-400 group-hover:text-rose-300";
    gridItemLabelColor = "text-blue-300/60";
    detailLabelColor = "text-blue-300/50";
    bypassBtnColor = "text-rose-400 hover:text-rose-300";
    editBtnColor = "text-blue-300 hover:text-rose-400";
    noBtnColor = "bg-slate-950/45 hover:bg-slate-900/60 text-blue-300 border-blue-900/40";
    noLeftBtnColor = "text-rose-400 bg-slate-950/50 border-blue-950/30";
    textAttemptColor = "text-blue-300/50";
    textRetreatColor = "text-rose-400 bg-slate-950/60 border-rose-950/30";
    yesBtnClass = "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_10px_30px_rgba(244,63,94,0.45)]";
    pulseColor = "rgba(244, 63, 94, 0.45)";
    pulseColorEnd = "rgba(244, 63, 94, 0)";
  } else if (theme === 'gold') {
    envelopeBg = "bg-amber-50";
    envelopeShadow = "shadow-[0_30px_70px_rgba(180,135,50,0.25)]";
    envelopeBorder = "border-amber-200/60";
    backplateBg = "bg-amber-100/30";
    letterBorder = "border-amber-150/40";
    letterText = "text-amber-700 font-semibold";
    labelText = "text-amber-850";
    hintLabelBg = "bg-white/95 text-amber-600/80";

    leftFlapColor = "border-l-amber-200/70";
    rightFlapColor = "border-r-amber-200/70";
    bottomFlapColor = "border-b-amber-200";
    topFlapColor = "border-t-amber-300/80";

    cardClass = "bg-amber-50/65 border-amber-200/50 shadow-[0_20px_50px_rgba(180,135,50,0.15)] text-amber-950";
    bannerOverlay = "from-transparent via-amber-50/50 to-amber-50";
    headingColor = "text-amber-900";
    subtitleColor = "text-amber-800/80";
    typewriterColor = "text-amber-700";

    countdownBg = "bg-amber-100/45 border-amber-200/45";
    labelColor = "text-amber-600 font-bold";
    descColor = "text-amber-800";
    gridItemBg = "bg-white/70 border-amber-100";
    gridItemNumColor = "text-amber-600 group-hover:text-amber-700";
    gridItemLabelColor = "text-amber-700/60";
    detailLabelColor = "text-amber-700/60";
    bypassBtnColor = "text-amber-600 hover:text-amber-700";
    editBtnColor = "text-amber-700 hover:text-amber-600";
    noBtnColor = "bg-amber-50/50 hover:bg-amber-100/70 text-amber-800 border-amber-200/50";
    noLeftBtnColor = "text-amber-600 bg-amber-50/50 border-amber-100";
    textAttemptColor = "text-amber-700/50";
    textRetreatColor = "text-amber-700 bg-amber-50 border-amber-200";
    yesBtnClass = "bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-[0_10px_30px_rgba(217,119,6,0.4)]";
    pulseColor = "rgba(217, 119, 6, 0.45)";
    pulseColorEnd = "rgba(217, 119, 6, 0)";
  }

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
          className={`relative w-[280px] h-[182px] xs:w-80 xs:h-52 sm:w-[420px] sm:h-[280px] ${envelopeBg} rounded-2xl ${envelopeShadow} border ${envelopeBorder} cursor-pointer group flex flex-col items-center justify-center overflow-visible select-none`}
        >
          {/* Backplate / shadow depth inside */}
          <div className={`absolute inset-0 ${backplateBg} rounded-2xl`} />

          {/* Envelope Paper/Letter inside (peeking & sliding out) */}
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={isFlapOpened ? { y: -80, opacity: 1 } : { y: 0, opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className={`absolute top-4 w-[90%] h-[80%] bg-white rounded-xl shadow-md p-3 xs:p-4 flex flex-col items-center justify-center border ${letterBorder} z-10`}
          >
            <p className={`font-serif italic text-xs xs:text-sm ${letterText} font-medium`}>Dear {targetName || 'Beloved'},</p>
            <p className="text-[9px] xs:text-[10px] font-mono uppercase tracking-widest text-gray-400 mt-2">A special secret awaits...</p>
          </motion.div>

          {/* Envelope Flaps (Bottom, Left, Right) */}
          {/* Left Flap */}
          <div 
            className={`absolute left-0 inset-y-0 w-0 border-l-[140px] xs:border-l-[160px] sm:border-l-[210px] ${leftFlapColor} border-y-[91px] xs:border-y-[104px] sm:border-y-[140px] border-y-transparent z-20 rounded-l-2xl`} 
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Right Flap */}
          <div 
            className={`absolute right-0 inset-y-0 w-0 border-r-[140px] xs:border-r-[160px] sm:border-r-[210px] ${rightFlapColor} border-y-[91px] xs:border-y-[104px] sm:border-y-[140px] border-y-transparent z-20 rounded-r-2xl`} 
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Bottom Flap */}
          <div 
            className={`absolute bottom-0 inset-x-0 h-0 border-b-[96px] xs:border-b-[110px] sm:border-b-[148px] ${bottomFlapColor} border-x-[140px] xs:border-x-[160px] sm:border-x-[210px] border-x-transparent z-20 rounded-b-2xl`} 
            style={{ pointerEvents: 'none' }}
          />

          {/* Top Flap (Flips Up) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isFlapOpened ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`absolute top-0 inset-x-0 h-0 border-t-[88px] xs:border-t-[100px] sm:border-t-[136px] ${topFlapColor} border-x-[140px] xs:border-x-[160px] sm:border-x-[210px] border-x-transparent origin-top z-30 rounded-t-2xl`}
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
              <p className={`font-serif text-xs xs:text-sm sm:text-base italic ${labelText} font-semibold tracking-wide truncate max-w-[200px] xs:max-w-[240px] mx-auto`}>
                {targetName ? `For My Beloved ${targetName}` : 'For You'}
              </p>
              <p className={`text-[8px] xs:text-[9px] uppercase tracking-widest mt-1 font-sans font-bold px-2 py-0.5 rounded-full shadow-2xs inline-block ${hintLabelBg}`}>
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
    <div className={`relative z-10 w-[calc(100%-1.5rem)] xs:w-[calc(100%-2rem)] max-w-2xl backdrop-blur-2xl border rounded-[32px] xs:rounded-[40px] p-5 xs:p-8 sm:p-12 flex flex-col items-center transform transition-all my-6 mx-auto overflow-hidden ${cardClass}`}>
      
      {/* Background Banner Image */}
      {bannerImage && (
        <div className="absolute top-0 left-0 right-0 h-32 sm:h-44 w-full overflow-hidden border-b border-white/15 z-0">
          <img
            src={bannerImage}
            alt="Romantic Background Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${bannerOverlay}`} />
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
          className={`text-3xl xs:text-4xl sm:text-5xl font-serif leading-tight tracking-tight break-words ${headingColor}`}
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
        <p className={`text-sm sm:text-base font-light italic tracking-wide max-w-md mx-auto ${subtitleColor}`}>
          "In a world full of temporary things, you are my forever."
        </p>

        {/* Typing reveal text question with intimate typewriter animation */}
        <div className="min-h-[2.5rem] mt-1.5 max-w-md mx-auto flex items-center justify-center">
          <Typewriter
            text={proposalMessage}
            className={`text-lg xs:text-xl sm:text-2xl font-medium tracking-wide font-serif text-center ${typewriterColor}`}
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
            className={`w-full flex flex-col items-center justify-center space-y-6 p-6 backdrop-blur-md rounded-3xl border shadow-sm ${countdownBg}`}
          >
            <div className="text-center space-y-1">
              <span className={`text-xs font-mono uppercase tracking-[0.2em] font-semibold ${labelColor}`}>
                ⏳ Beautiful Anticipation
              </span>
              <p className={`text-sm font-medium font-serif mt-1 ${descColor}`}>
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
                  className={`flex flex-col items-center justify-center backdrop-blur-xs rounded-2xl p-2.5 sm:p-4 border shadow-xs relative overflow-hidden group hover:scale-[1.03] transition-all ${gridItemBg}`}
                >
                  <span className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight transition-colors ${gridItemNumColor}`}>
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest mt-1 ${gridItemLabelColor}`}>
                    {unit.label}
                  </span>
                  {/* Glowing decorative effect */}
                  <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 ${theme === 'gold' ? 'bg-amber-350' : 'bg-rose-200'}`}></span>
                </div>
              ))}
            </div>

            <div className="text-center space-y-2 pt-1">
              <p className={`text-[11px] font-mono uppercase tracking-widest ${detailLabelColor}`}>
                Scheduled for: {new Date(proposalDate!).toLocaleString()}
              </p>
              
              {/* Optional test preview bypass to check buttons/animations */}
              <button
                onClick={onYes}
                className={`text-[11px] font-sans hover:underline transition-all cursor-pointer font-semibold flex items-center justify-center gap-1.5 mx-auto ${bypassBtnColor}`}
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
                  `0 0 0 0 ${pulseColor}`,
                  `0 0 0 16px ${pulseColorEnd}`,
                ]
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }
              }}
              whileHover={{ scale: yesScale * 1.06, y: -2 }}
              whileTap={{ scale: yesScale * 0.96 }}
              className={`${yesBtnClass} font-display font-medium text-xl py-4.5 px-12 rounded-full transition-colors duration-200 z-20 flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 animate-pulse"
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
                  whileHover={{ scale: noScale * 1.05 }}
                  whileTap={{ scale: noScale * 0.95 }}
                  transition={{ type: "spring", stiffness: 450, damping: 15 }}
                  className={`backdrop-blur-md rounded-full font-display font-medium text-xs py-2.5 px-6 shadow-xs transition-colors duration-200 cursor-pointer whitespace-nowrap border ${noBtnColor}`}
                >
                  No... 😢
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.5, scale: 0.8 }}
                  className={`text-xs font-semibold backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 cursor-not-allowed select-none italic border ${noLeftBtnColor}`}
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
          className={`text-center text-[11px] font-mono mt-4 ${textAttemptColor}`}
        >
          {noCount} empty attempts. The universe wants a "Yes"! 🪐
        </motion.p>
      )}

      {noCount >= 5 && noCount < 10 && (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-center text-xs font-semibold py-2 px-4 rounded-xl mt-4 animate-bounce border ${textRetreatColor}`}
        >
          The 'No' button is retreating... Please say Yes! 🌸
        </motion.p>
      )}

      {onBackToSetup && (
        <button
          onClick={onBackToSetup}
          className={`mt-6 text-[10px] font-mono tracking-widest transition-colors uppercase cursor-pointer ${editBtnColor}`}
        >
          ← Edit Configuration
        </button>
      )}
    </div>
  );
}
