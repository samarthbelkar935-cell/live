import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Particle } from '../types';

interface BackgroundParticlesProps {
  theme?: 'rose' | 'midnight' | 'gold';
  romanticAtmosphere?: boolean;
}

interface FallingParticle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  type: 'petal' | 'snow' | 'golddust';
  sway: number;
  rotationStart: number;
  rotationEnd: number;
}

export default function BackgroundParticles({ theme = 'rose', romanticAtmosphere = true }: BackgroundParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [fallingParticles, setFallingParticles] = useState<FallingParticle[]>([]);

  useEffect(() => {
    // Generate static array of rising particles on mount to avoid continuous re-rendering
    const list: Particle[] = Array.from({ length: 25 }, (_, i) => {
      const types: ('heart' | 'sparkle' | 'bubble')[] = ['heart', 'sparkle', 'bubble'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      let color = 'text-rose-400/60';
      if (theme === 'midnight') {
        if (type === 'sparkle') {
          color = Math.random() > 0.5 ? 'text-blue-300/60' : 'text-sky-100/50';
        } else if (type === 'bubble') {
          color = 'text-indigo-450/25';
        } else {
          color = Math.random() > 0.5 ? 'text-cyan-300/60' : 'text-indigo-400/50';
        }
      } else if (theme === 'gold') {
        if (type === 'sparkle') {
          color = Math.random() > 0.5 ? 'text-amber-300/70' : 'text-yellow-100/60';
        } else if (type === 'bubble') {
          color = 'text-amber-100/20';
        } else {
          color = Math.random() > 0.5 ? 'text-amber-400/60' : 'text-yellow-500/40';
        }
      } else {
        // rose
        if (type === 'sparkle') {
          color = Math.random() > 0.5 ? 'text-amber-300/60' : 'text-yellow-100/50';
        } else if (type === 'bubble') {
          color = 'text-purple-300/30';
        } else {
          color = Math.random() > 0.5 ? 'text-pink-300/60' : 'text-rose-400/50';
        }
      }

      return {
        id: i,
        x: Math.random() * 100,
        size: type === 'heart' ? Math.random() * 14 + 10 : Math.random() * 8 + 5,
        delay: Math.random() * 10,
        duration: Math.random() * 15 + 15,
        type,
        color,
      };
    });
    setParticles(list);
  }, [theme]);

  useEffect(() => {
    if (!romanticAtmosphere) {
      setFallingParticles([]);
      return;
    }

    // Generate themed falling atmosphere particles
    const count = 45;
    const list: FallingParticle[] = Array.from({ length: count }, (_, i) => {
      let type: 'petal' | 'snow' | 'golddust' = 'petal';
      let color = 'text-pink-350/70';

      if (theme === 'rose') {
        type = 'petal';
        const colors = [
          'text-pink-300/70',
          'text-rose-300/75',
          'text-pink-400/65',
          'text-rose-250/70'
        ];
        color = colors[Math.floor(Math.random() * colors.length)];
      } else if (theme === 'midnight') {
        type = 'snow';
        const colors = [
          'text-blue-100/90',
          'text-white/85',
          'text-indigo-200/80',
          'text-sky-100/80'
        ];
        color = colors[Math.floor(Math.random() * colors.length)];
      } else if (theme === 'gold') {
        type = 'golddust';
        const colors = [
          'text-amber-300/80',
          'text-yellow-300/85',
          'text-amber-200/75',
          'text-yellow-100/90'
        ];
        color = colors[Math.floor(Math.random() * colors.length)];
      }

      return {
        id: 500 + i,
        x: Math.random() * 120 - 10, // Spanned wider to cover left and right screen borders
        size: theme === 'midnight' ? Math.random() * 8 + 6 : Math.random() * 16 + 10,
        delay: Math.random() * 12,
        duration: Math.random() * 12 + 10, // speed of descent
        color,
        type,
        sway: (Math.random() * 14 + 7) * (Math.random() > 0.5 ? 1 : -1), // Randomized sign so sway goes both left and right
        rotationStart: Math.random() * 360,
        rotationEnd: Math.random() * 360 + 360 * (Math.random() > 0.5 ? 1 : -1),
      };
    });

    setFallingParticles(list);
  }, [theme, romanticAtmosphere]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft animated gradient blobs in background for deep backdrop dimension - matching Immersive UI spec */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-rose-300/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[120px]" />
      <div className="absolute top-[40%] right-[20%] w-[40%] h-[40%] rounded-full bg-rose-200/20 blur-3xl" />

      {/* Embedded Ambient SVGs representing stars and hearts in margins - from Immersive UI Spec */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="absolute top-10 left-20 w-8 h-8 text-rose-400/40 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <svg className="absolute bottom-20 right-40 w-12 h-12 text-pink-400/30 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <div className="absolute top-1/4 right-20 w-2 h-2 bg-white/50 rounded-full shadow-[0_0_10px_white]"></div>
        <div className="absolute bottom-1/3 left-16 w-3 h-3 bg-white/40 rounded-full shadow-[0_0_15px_white]"></div>
      </div>

      {/* Ambient Rising Particles */}
      {particles.map((p) => {
        return (
          <motion.div
            key={p.id}
            initial={{ 
              x: `${p.x}%`, 
              y: '105vh', 
              opacity: 0,
              rotate: 0 
            }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.6, 0.6, 0],
              rotate: Math.random() > 0.5 ? 360 : -360,
              x: [`${p.x}%`, `${p.x + (Math.random() * 8 - 4)}%`]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
            className={`absolute ${p.color}`}
            style={{
              width: p.size,
              height: p.size,
              fontSize: p.size,
            }}
          >
            {p.type === 'heart' ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : p.type === 'sparkle' ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            ) : (
              <div className="rounded-full border border-current w-full h-full opacity-50 backdrop-blur-[1px]" />
            )}
          </motion.div>
        );
      })}

      {/* Romantic Atmosphere Falling Particles (Themed) */}
      {fallingParticles.map((fp) => {
        return (
          <motion.div
            key={fp.id}
            initial={{ 
              x: `${fp.x}%`, 
              y: '-8vh', 
              opacity: 0,
              rotate: fp.rotationStart 
            }}
            animate={{
              y: '105vh',
              opacity: [0, 0.85, 0.85, 0],
              rotate: fp.rotationEnd,
              x: [
                `${fp.x}%`, 
                `${fp.x + fp.sway}%`, 
                `${fp.x - fp.sway / 2}%`, 
                `${fp.x + fp.sway / 3}%`
              ]
            }}
            transition={{
              duration: fp.duration,
              repeat: Infinity,
              delay: fp.delay,
              ease: 'easeInOut',
            }}
            className={`absolute ${fp.color}`}
            style={{
              width: fp.size,
              height: fp.size,
            }}
          >
            {fp.type === 'petal' ? (
              // Sweet curved organic organic rose petal SVG
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_1px_3px_rgba(244,63,94,0.15)]">
                <path d="M12,2C11.5,2 6,6 6,12C6,17.5 10.5,22 12,22C13.5,22 18,17.5 18,12C18,6 12.5,2 12,2Z" />
              </svg>
            ) : fp.type === 'snow' ? (
              // Premium crisp star-crystal asterisk snowflake SVG
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-full h-full drop-shadow-[0_0_5px_rgba(255,255,255,0.7)]">
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="5" y1="19" x2="19" y2="5" />
              </svg>
            ) : (
              // Glowing 4-pointed golden sparkle diamond SVG
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]">
                <path d="M12 2C12 2 13 10 13 10C13 10 21 11 21 11C21 11 13 12 13 12C13 12 12 20 12 20C12 20 11 12 11 12C11 12 3 11 3 11C3 11 11 10 11 10C11 10 12 2 12 2Z" />
              </svg>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
