import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BackgroundParticles from './components/BackgroundParticles';
import HeroSection from './components/HeroSection';
import SuccessSection from './components/SuccessSection';
import NameSetupSection from './components/NameSetupSection';
import { playHeartBurstSound } from './utils/audio';

interface BurstHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
  distance: number;
  color: string;
}

export default function App() {
  const [step, setStep] = useState<'setup' | 'proposal' | 'success'>('setup');
  const [targetName, setTargetName] = useState('');
  const [proposalMessage, setProposalMessage] = useState('Will you forever be mine? ❤️');
  const [vibe, setVibe] = useState('romantic');
  const [theme, setTheme] = useState<'rose' | 'midnight' | 'gold'>('rose');
  const [authorName, setAuthorName] = useState('');
  const [proposalDate, setProposalDate] = useState<string | undefined>(undefined);
  const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);
  const [romanticAtmosphere, setRomanticAtmosphere] = useState(true);
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const target = params.get('targetName');
    const msg = params.get('proposalMessage');
    const vb = params.get('vibe');
    const author = params.get('authorName');
    const date = params.get('proposalDate');
    const th = params.get('theme');
    const banner = params.get('bannerImage');
    const atmosphere = params.get('romanticAtmosphere');

    if (target) {
      setTargetName(target);
      if (msg) setProposalMessage(msg);
      if (vb) setVibe(vb);
      if (author) setAuthorName(author);
      if (date) setProposalDate(date);
      if (th === 'rose' || th === 'midnight' || th === 'gold') {
        setTheme(th);
      }
      if (banner) {
        setBannerImage(banner);
      }
      if (atmosphere === 'false') {
        setRomanticAtmosphere(false);
      } else {
        setRomanticAtmosphere(true);
      }
      setStep('proposal');
    }
  }, []);

  const handleSetupComplete = (config: {
    targetName: string;
    proposalMessage: string;
    vibe: string;
    authorName: string;
    proposalDate?: string;
    theme: 'rose' | 'midnight' | 'gold';
    bannerImage?: string;
    romanticAtmosphere: boolean;
  }) => {
    setTargetName(config.targetName);
    setProposalMessage(config.proposalMessage);
    setVibe(config.vibe);
    setAuthorName(config.authorName);
    setProposalDate(config.proposalDate);
    setTheme(config.theme);
    setBannerImage(config.bannerImage);
    setRomanticAtmosphere(config.romanticAtmosphere);
    setStep('proposal');
  };

  // Simple, elegant heart explosion generator
  const triggerHeartExplosion = () => {
    playHeartBurstSound();
    const list: BurstHeart[] = Array.from({ length: 45 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2; // Random 360-degree direction
      const distance = Math.random() * 280 + 100; // Explode outwards
      const size = Math.random() * 24 + 12; // Various cute sizes
      const colors = [
        'text-rose-500', 
        'text-pink-500', 
        'text-purple-500', 
        'text-fuchsia-400', 
        'text-amber-400',
        'text-rose-400'
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        size,
        angle,
        distance,
        color,
      };
    });

    setBurstHearts(list);
    setStep('success');

    // Fade out explosion particles after completion
    setTimeout(() => {
      setBurstHearts([]);
    }, 4000);
  };

  const handleReset = () => {
    setStep('setup');
    setBurstHearts([]);
  };

  const getBackgroundClass = () => {
    switch (theme) {
      case 'midnight':
        return "from-slate-950 via-blue-950 to-slate-900 text-white selection:bg-blue-850 selection:text-blue-100";
      case 'rose':
        return "from-rose-100 via-pink-50 to-rose-200 text-gray-800 selection:bg-pink-200 selection:text-pink-800";
      case 'gold':
        return "from-stone-50 via-amber-50/40 to-stone-100 text-amber-950 selection:bg-amber-100 selection:text-amber-900";
      default:
        return "from-rose-100 via-purple-100 to-pink-200";
    }
  };

  return (
    <main className={`relative min-h-screen w-full bg-gradient-to-tr transition-all duration-1000 ${getBackgroundClass()} overflow-y-auto overflow-x-hidden`}>
      
      {/* Dynamic ambient floating sparkles and bubbles backdrop */}
      <BackgroundParticles theme={theme} romanticAtmosphere={romanticAtmosphere} />

      {/* Screen Transitions */}
      <AnimatePresence mode="wait">
        {step === 'setup' && (
          <div className="w-full flex flex-col items-center justify-center min-h-screen relative pb-16">
            <NameSetupSection onSetupComplete={handleSetupComplete} />
          </div>
        )}

        {step === 'proposal' && (
          <div className="w-full flex flex-col items-center justify-center min-h-screen relative pb-32">
            <motion.section
              key="propose-hero"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ 
                opacity: 0, 
                scale: 0.95,
                filter: 'blur(8px)',
                transition: { duration: 0.8, ease: 'easeInOut' } 
              }}
              className="w-full flex items-center justify-center"
            >
              <HeroSection 
                targetName={targetName}
                proposalMessage={proposalMessage}
                vibe={vibe}
                theme={theme}
                proposalDate={proposalDate}
                bannerImage={bannerImage}
                onYes={triggerHeartExplosion}
                onBackToSetup={() => setStep('setup')}
              />
            </motion.section>

            {/* Immersive UI Absolute Footer Layout */}
            <footer className="absolute bottom-6 left-0 w-full flex flex-col items-center opacity-80 pointer-events-none select-none z-10">
              <div className="h-px w-40 bg-gradient-to-r from-transparent via-rose-300 to-transparent mb-4"></div>
              <p className="text-xs tracking-[0.25em] font-light uppercase">With all my heart</p>
              <p className="text-2xl font-serif italic text-rose-600 mt-1">{authorName}</p>
            </footer>
          </div>
        )}

        {step === 'success' && (
          <motion.section
            key="propose-success"
            initial={{ opacity: 0, scale: 1.05, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { type: 'spring', stiffness: 50, damping: 15, delay: 0.2 } 
            }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <SuccessSection 
              targetName={targetName}
              proposalMessage={proposalMessage}
              authorName={authorName}
              vibe={vibe}
              theme={theme}
              bannerImage={bannerImage}
              romanticAtmosphere={romanticAtmosphere}
              onBack={handleReset} 
            />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Full-Screen Confetti/Heart Burst Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {burstHearts.map((h) => {
          const targetX = Math.cos(h.angle) * h.distance;
          const targetY = Math.sin(h.angle) * h.distance;

          return (
            <motion.div
              key={h.id}
              initial={{ x: h.x, y: h.y, scale: 0.2, opacity: 1, rotate: 0 }}
              animate={{
                x: h.x + targetX,
                y: h.y + targetY - 140, // Explode outwards, then drift upwards slightly
                scale: [0.2, 1.2, 0.8, 0],
                opacity: [1, 1, 0.8, 0],
                rotate: Math.random() > 0.5 ? 360 : -360
              }}
              transition={{
                duration: Math.random() * 1.5 + 1.2,
                ease: 'easeOut'
              }}
              className={`absolute ${h.color}`}
              style={{
                width: h.size,
                height: h.size,
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-md">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
