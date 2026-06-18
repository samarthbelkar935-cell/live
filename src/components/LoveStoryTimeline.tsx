import React from 'react';
import { motion } from 'motion/react';
import { Milestone } from '../types';

const milestones: Milestone[] = [
  {
    id: 1,
    title: 'The First Hello',
    date: 'A Beautiful Memory',
    description: 'An accidental crossroads where my eyes first found yours. In that briefest second, a quiet spark whispered that my life was about to change forever.',
    emoji: '⭐',
    colorClass: 'from-pink-400 to-rose-400',
  },
  {
    id: 2,
    title: 'The Unspoken Bond',
    date: 'Shared Laughter & Inside Jokes',
    description: 'Late-night conversations, laughing until our hearts overflowed, and sharing secrets we normally hide. That was when simple words turned into sweet sacred music.',
    emoji: '💬',
    colorClass: 'from-purple-400 to-pink-400',
  },
  {
    id: 3,
    title: 'The Rhythm of Hearts',
    date: 'Realizing It is You',
    description: 'When your laugh became my favorite song and your warmth became my only sanctuary. In a universe of chaos, your rhythm became my absolute peace.',
    emoji: '🎵',
    colorClass: 'from-rose-400 to-fuchsia-400',
  },
  {
    id: 4,
    title: 'The Promise of Together',
    date: 'Our Next Beautiful Chapter',
    description: 'Taking your hand, holding you close, and promising to protect that beautiful smile through every single season. Starting a lifelong voyage of hand-in-hand adventures.',
    emoji: '💍',
    colorClass: 'from-indigo-400 to-purple-400',
  },
];

export default function LoveStoryTimeline() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-16 px-4">
      {/* Narrative Header */}
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-600 bg-pink-100/60 px-4 py-1.5 rounded-full backdrop-blur-xs border border-pink-200/50"
        >
          Our Sacred Milestones
        </motion.span>
        
        <motion.h3 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl md:text-4xl text-gray-800 mt-4 leading-tight"
        >
          Our Beautiful Love Story
        </motion.h3>
        <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full" />
      </div>

      {/* Timeline core */}
      <div className="relative">
        {/* Timeline center line */}
        <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-rose-300 via-pink-300 to-purple-300 -translate-x-1/2 opacity-70" />

        <div className="space-y-12">
          {milestones.map((m, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={m.id} 
                className={`relative flex flex-col md:flex-row ${
                  isEven ? 'md:flex-row-reverse' : ''
                } items-start md:items-center`}
              >
                {/* Visual Circle Anchor */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-pink-400 shadow-md flex items-center justify-center z-10 text-xs">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                  >
                    {m.emoji}
                  </motion.span>
                </div>

                {/* Left/Right space buffers for desktop */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0" />

                {/* Card Container */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 40 : -40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                    isEven ? 'md:pr-8' : 'md:pl-8'
                  }`}
                >
                  <div className="relative p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    {/* Corner elegant background gradient light indicator */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${m.colorClass}`} />
                    
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-mono text-purple-600 font-medium tracking-wide">
                        {m.date}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-pink-100/80 text-pink-700 font-medium">
                        Phase 0{m.id}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-gray-800 text-lg group-hover:text-pink-600 transition-colors duration-200">
                      {m.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600/90 mt-2 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
