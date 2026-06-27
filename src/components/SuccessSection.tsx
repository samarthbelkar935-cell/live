import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Link2, Copy, Mail, Check } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';
import LoveStoryTimeline from './LoveStoryTimeline';

interface SuccessSectionProps {
  targetName: string;
  proposalMessage: string;
  authorName: string;
  vibe: string;
  theme?: 'rose' | 'midnight' | 'gold';
  bannerImage?: string;
  romanticAtmosphere?: boolean;
  onBack?: () => void;
}

export default function SuccessSection({
  targetName,
  proposalMessage,
  authorName,
  vibe,
  theme = 'rose',
  bannerImage,
  romanticAtmosphere,
  onBack,
}: SuccessSectionProps) {
  const romanticPromises = [
    `In a world full of temporary things, you are my forever, ${targetName}. ❤️`,
    "Meeting you was fate, but falling in love with you was beyond my control.",
    "Your laugh is my favorite soundtrack, and your happiness is my ultimate goal.",
    `Together is my favorite place to be. Will you make it permanent, ${targetName}?`,
    "Every heartbeat of mine echoes your name. Every dream of mine is colored with your smile."
  ];

  const isDark = theme === 'midnight';
  const [activeLetterIdx, setActiveLetterIdx] = useState(0);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isMessageCopied, setIsMessageCopied] = useState(false);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<'partner' | 'friends' | 'elegant'>('partner');
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const getShareUrl = () => {
    const origin = window.location.origin;
    const path = window.location.pathname;
    const params = new URLSearchParams();
    params.set('targetName', targetName);
    params.set('proposalMessage', proposalMessage);
    params.set('vibe', vibe);
    params.set('authorName', authorName);
    params.set('theme', theme);
    if (bannerImage) {
      params.set('bannerImage', bannerImage);
    }
    if (romanticAtmosphere !== undefined) {
      params.set('romanticAtmosphere', String(romanticAtmosphere));
    }
    return `${origin}${path}?${params.toString()}`;
  };

  const handleCopyLink = () => {
    const shareUrl = getShareUrl();
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    });
  };

  const handleCopyMessage = () => {
    const shareUrl = getShareUrl();
    const shareText = `💍 We're officially forever! ${authorName} proposed and ${targetName} said YES! ❤️ Check out our magical proposal here: ${shareUrl}`;
    navigator.clipboard.writeText(shareText).then(() => {
      setIsMessageCopied(true);
      setTimeout(() => setIsMessageCopied(false), 2000);
    });
  };

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
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border shadow-xs ${isDark ? 'bg-rose-950/40 text-rose-300 border-rose-900/30' : 'bg-rose-100 text-rose-600 border-rose-200'}`}>
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Destiny Connected
        </div>
        
        <h1 className={`font-serif text-4xl md:text-5xl leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Yay ❤️ This moment is special
        </h1>
        
        <p className={`font-serif italic text-base md:text-lg mt-5 leading-relaxed max-w-lg mx-auto ${isDark ? 'text-purple-300/90' : 'text-purple-700/90'}`}>
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
              targetName={targetName}
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
              targetName={targetName}
            />
          </div>
          <div className="mt-4 text-center">
            <p className="font-script text-3xl text-purple-600 font-bold leading-none">Hand in Hand</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 mt-1">Our joint journey</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Love Letters Epistle Stack */}
      <motion.div variants={itemVariants} className={`w-full max-w-md backdrop-blur-md rounded-2xl border p-6 shadow-xl mb-16 ${isDark ? 'bg-slate-900/40 border-blue-900/40' : 'bg-white/30 border-white/45'}`}>
        <div className={`flex items-center gap-2 border-b pb-3 mb-4 ${isDark ? 'border-blue-900/40' : 'border-white/40'}`}>
          <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
          </svg>
          <h3 className={`font-display font-semibold text-sm tracking-wide ${isDark ? 'text-white' : 'text-gray-800'}`}>Interactive Love Letters</h3>
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
              <p className={`font-serif italic text-base leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                "{romanticPromises[activeLetterIdx]}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Swipe / Next letter paginators */}
        <div className={`flex items-center justify-between mt-6 pt-3 border-t ${isDark ? 'border-blue-900/30' : 'border-white/20'}`}>
          <span className={`text-xs font-mono font-medium ${isDark ? 'text-blue-300/80' : 'text-purple-700/60'}`}>
            Letter {activeLetterIdx + 1} of {romanticPromises.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLetterIdx((prev) => (prev > 0 ? prev - 1 : romanticPromises.length - 1))}
              className={`w-8 h-8 rounded-full font-semibold text-sm flex items-center justify-center transition-colors shadow-sm cursor-pointer ${isDark ? 'bg-slate-950/85 hover:bg-slate-900 text-rose-400' : 'bg-white/80 hover:bg-white text-rose-500'}`}
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

      {/* Share Section */}
      <motion.div 
        variants={itemVariants} 
        className={`w-full max-w-md backdrop-blur-md rounded-2xl border p-6 shadow-xl mb-16 text-center ${isDark ? 'bg-slate-900/40 border-blue-900/40' : 'bg-white/30 border-white/45'}`}
      >
        <div className={`flex items-center justify-center gap-2 border-b pb-3 mb-4 ${isDark ? 'border-blue-900/40' : 'border-white/40'}`}>
          <Share2 className="w-5 h-5 text-rose-500" />
          <h3 className={`font-display font-semibold text-sm tracking-wide ${isDark ? 'text-white' : 'text-gray-800'}`}>Share Your Proposal Moment</h3>
        </div>

        <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Invite friends and family to witness your beautiful milestone! Copy your customized proposal link or a lovely message to share on social media.
        </p>

        <div className="flex flex-col gap-3">
          {/* Link Copy Button */}
          <button
            onClick={handleCopyLink}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-xs font-medium cursor-pointer shadow-xs group ${isDark ? 'bg-slate-950/70 hover:bg-slate-950/90 border-blue-950/50 text-blue-200 hover:text-rose-400' : 'bg-white/70 hover:bg-white border-rose-100 text-gray-700 hover:text-rose-600'}`}
          >
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-rose-400 group-hover:text-rose-500" />
              <span>{isLinkCopied ? 'Link Copied to Clipboard!' : 'Copy Proposal Link'}</span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 group-hover:text-rose-400">
              {isLinkCopied ? '✨ Copied' : 'Copy'}
            </span>
          </button>

          {/* Text Message Copy Button */}
          <button
            onClick={handleCopyMessage}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-xs font-medium cursor-pointer shadow-xs group ${isDark ? 'bg-slate-950/70 hover:bg-slate-950/90 border-blue-950/50 text-blue-200 hover:text-pink-400' : 'bg-white/70 hover:bg-white border-rose-100 text-gray-700 hover:text-rose-600'}`}
          >
            <div className="flex items-center gap-2">
              <Copy className="w-4 h-4 text-pink-400 group-hover:text-pink-500" />
              <span>{isMessageCopied ? 'Message Copied!' : 'Copy Engagement Message'}</span>
            </div>
            <span className="text-[10px] font-mono text-gray-400 group-hover:text-pink-400">
              {isMessageCopied ? '✨ Copied' : 'Copy'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Auto-Generated 'Thank You' & Announcement Email Template Generator */}
      <motion.div 
        variants={itemVariants} 
        className={`w-full max-w-xl backdrop-blur-md rounded-2xl border p-6 shadow-xl mb-16 ${isDark ? 'bg-slate-900/40 border-blue-900/40' : 'bg-white/30 border-white/45'}`}
      >
        <div className={`flex items-center justify-center gap-2 border-b pb-3 mb-4 ${isDark ? 'border-blue-900/40' : 'border-white/40'}`}>
          <Mail className="w-5 h-5 text-rose-500" />
          <h3 className={`font-display font-semibold text-sm tracking-wide ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Sweet Keepsake & Announcement Emails
          </h3>
        </div>

        <p className={`text-xs text-center leading-relaxed mb-5 px-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Copy a pre-written, highly-personalized letter to send to your special partner or announce the gorgeous milestone to friends & family!
        </p>

        {/* Template Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-gray-200/40 backdrop-blur-xs rounded-xl text-center mb-5">
          {[
            { id: 'partner', label: 'To Partner 💖' },
            { id: 'friends', label: 'Friends & Family 💍' },
            { id: 'elegant', label: 'Elegant 🥂' }
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setSelectedEmailTemplate(tab.id as 'partner' | 'friends' | 'elegant')}
              className={`py-2 px-1.5 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedEmailTemplate === tab.id
                  ? 'bg-white text-rose-600 shadow-sm'
                  : isDark ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-white/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Preview Stationery Paper */}
        <div className={`relative rounded-xl border p-4 sm:p-5 font-sans shadow-inner overflow-hidden mb-5 ${
          isDark 
            ? 'bg-slate-950/80 border-slate-800 text-slate-100' 
            : 'bg-amber-50/20 border-rose-100/60 text-gray-800'
        }`}>
          {/* Subtle line background pattern representing stationery */}
          <div className="absolute top-0 right-0 p-3 select-none text-[9px] font-mono tracking-widest text-rose-500/30 uppercase">
            Official Draft
          </div>
          
          <div className="space-y-3.5 text-xs">
            <div>
              <span className="font-semibold text-rose-400 font-mono">Subject:</span>{' '}
              <span className="font-medium tracking-wide">
                {selectedEmailTemplate === 'partner' && `My heart is overflowing today, ${targetName} ❤️`}
                {selectedEmailTemplate === 'friends' && `The happiest news! 💍 ${authorName} and ${targetName}`}
                {selectedEmailTemplate === 'elegant' && `Sharing our joy: An engagement announcement 🥂`}
              </span>
            </div>
            
            <div className={`h-px w-full ${isDark ? 'bg-slate-800' : 'bg-rose-100/40'}`} />
            
            <div className="whitespace-pre-line leading-relaxed font-serif italic text-sm text-opacity-95">
              {selectedEmailTemplate === 'partner' && 
`My dearest ${targetName},

Saying 'yes' to you was the easiest decision of my life. Walking away from our proposal with my hand in yours has filled me with a deep peace and joy that I cannot fully put into words.

Thank you for your beautiful surprise, for every thought you poured into making our proposal so perfect, and most of all, for choosing me. I promise to cherish you, laugh with you, and love you more with every single heartbeat.

Here is to our beautiful forever.

All my love,
${authorName}`}

              {selectedEmailTemplate === 'friends' && 
`Hello wonderful people,

Our hearts are absolutely bursting with joy, and we couldn't wait to share our happiness with you!

${authorName} asked, and ${targetName} said YES! ❤️

Meeting each other was destiny, and choosing forever is our greatest adventure yet. Thank you so much for being a part of our lives and supporting us on this journey. We are so incredibly grateful for your love and can't wait to celebrate this new chapter of our lives together with you!

With love and excitement,
${authorName} & ${targetName}`}

              {selectedEmailTemplate === 'elegant' && 
`Dear family and friends,

We are delighted to share the happy news of our engagement!

On this beautiful day, surrounded by sweet memories and dreams of the future, we have promised our forevers to one another.

Thank you for your warmth, blessings, and continuous love throughout our lives. You mean the absolute world to us, and we look forward to sharing many more milestones with you as we begin planning our future together.

With our warmest regards,
${authorName} and ${targetName}`}
            </div>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={() => {
            let subject = '';
            let body = '';
            if (selectedEmailTemplate === 'partner') {
              subject = `My heart is overflowing today, ${targetName} ❤️`;
              body = `My dearest ${targetName},\n\nSaying 'yes' to you was the easiest decision of my life. Walking away from our proposal with my hand in yours has filled me with a deep peace and joy that I cannot fully put into words.\n\nThank you for your beautiful surprise, for every thought you poured into making our proposal so perfect, and most of all, for choosing me. I promise to cherish you, laugh with you, and love you more with every single heartbeat.\n\nHere is to our beautiful forever.\n\nAll my love,\n${authorName}`;
            } else if (selectedEmailTemplate === 'friends') {
              subject = `The happiest news! 💍 ${authorName} and ${targetName}`;
              body = `Hello wonderful people,\n\nOur hearts are absolutely bursting with joy, and we couldn't wait to share our happiness with you!\n\n${authorName} asked, and ${targetName} said YES! ❤️\n\nMeeting each other was destiny, and choosing forever is our greatest adventure yet. Thank you so much for being a part of our lives and supporting us on this journey. We are so incredibly grateful for your love and can't wait to celebrate this new chapter of our lives together with you!\n\nWith love and excitement,\n${authorName} & ${targetName}`;
            } else {
              subject = `Sharing our joy: An engagement announcement 🥂`;
              body = `Dear family and friends,\n\nWe are delighted to share the happy news of our engagement!\n\nOn this beautiful day, surrounded by sweet memories and dreams of the future, we have promised our forevers to one another.\n\nThank you for your warmth, blessings, and continuous love throughout our lives. You mean the absolute world to us, and we look forward to sharing many more milestones with you as we begin planning our future together.\n\nWith our warmest regards,\n${authorName} and ${targetName}`;
            }
            
            navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`).then(() => {
              setIsEmailCopied(true);
              setTimeout(() => setIsEmailCopied(false), 2000);
            });
          }}
          className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {isEmailCopied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied Draft Successfully! ✨</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Full Email Template</span>
            </>
          )}
        </button>
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
