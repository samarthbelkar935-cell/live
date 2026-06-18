import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Particle } from '../types';

export default function BackgroundParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate static array of particles on mount to avoid continuous re-rendering
    const list: Particle[] = Array.from({ length: 30 }, (_, i) => {
      const types: ('heart' | 'sparkle' | 'bubble')[] = ['heart', 'sparkle', 'bubble'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      let color = 'text-rose-400';
      if (type === 'sparkle') {
        color = Math.random() > 0.5 ? 'text-amber-300' : 'text-yellow-100';
      } else if (type === 'bubble') {
        color = 'text-purple-300/40';
      } else {
        color = Math.random() > 0.5 ? 'text-pink-400' : 'text-rose-500';
      }

      return {
        id: i,
        x: Math.random() * 100, // horizontal start position percent
        size: type === 'heart' ? Math.random() * 16 + 12 : Math.random() * 10 + 6,
        delay: Math.random() * 10,
        duration: Math.random() * 15 + 15, // speed of float, slower and smoother
        type,
        color,
      };
    });
    setParticles(list);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft animated gradient blobs in background for deep backdrop dimension - matching Immersive UI spec */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-rose-300/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[120px]" />
      <div className="absolute top-[40%] right-[20%] w-[40%] h-[40%] rounded-full bg-rose-200/20 blur-3xl" />

      {/* Embedded Ambient SVGs representing stars and hearts in margins - from Immersive UI Spec */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="absolute top-10 left-20 w-8 h-8 text-rose-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <svg className="absolute bottom-20 right-40 w-12 h-12 text-pink-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <div className="absolute top-1/4 right-20 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
        <div className="absolute bottom-1/3 left-16 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white]"></div>
      </div>

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
              opacity: [0, 0.7, 0.7, 0],
              rotate: Math.random() > 0.5 ? 360 : -360,
              x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`]
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
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            ) : (
              <div className="rounded-full border border-current w-full h-full opacity-60 backdrop-blur-xs" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
