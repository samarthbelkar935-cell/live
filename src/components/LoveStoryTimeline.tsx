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

interface LoveStoryTimelineProps {
  theme?: string;
}

export default function LoveStoryTimeline({ theme = 'rose' }: LoveStoryTimelineProps) {
  const isDark = theme === 'midnight';

  // Theme-aware design styling for Timeline
  let tagClass = "text-pink-600 bg-pink-100/60 border-pink-200/50";
  let titleClass = "text-gray-800";
  let lineClass = "from-rose-300 via-pink-300 to-purple-300";
  let cardClass = "bg-white/40 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-xl";
  let itemTitleClass = "text-gray-800";
  let itemDescClass = "text-gray-600/90";
  let itemDateClass = "text-purple-600";
  let itemPhaseClass = "bg-pink-100/80 text-pink-700";

  if (theme === 'midnight') {
    tagClass = "text-pink-400 bg-rose-950/40 border-rose-900/30";
    titleClass = "text-white";
    lineClass = "from-rose-500 via-pink-500 to-indigo-500";
    cardClass = "bg-slate-900/40 backdrop-blur-md border border-blue-900/40 shadow-lg hover:shadow-xl";
    itemTitleClass = "text-white";
    itemDescClass = "text-gray-300/90";
    itemDateClass = "text-rose-400";
    itemPhaseClass = "bg-rose-950/80 text-rose-300";
  } else if (theme === 'gold') {
    tagClass = "text-amber-800 bg-amber-100/60 border-amber-200/50";
    titleClass = "text-amber-950";
    lineClass = "from-amber-300 via-yellow-300 to-amber-500";
    cardClass = "bg-amber-50/60 backdrop-blur-md border border-amber-200/50 shadow-lg hover:shadow-xl";
    itemTitleClass = "text-amber-950";
    itemDescClass = "text-amber-900/80";
    itemDateClass = "text-amber-700";
    itemPhaseClass = "bg-amber-100/80 text-amber-850";
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto py-16 px-4">
      {/* Narrative Header */}
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-xs font-semibold uppercase tracking-[0.25em] px-4 py-1.5 rounded-full backdrop-blur-xs border ${tagClass}`}
        >
          Our Sacred Milestones
        </motion.span>
        
        <motion.h3 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`font-serif text-3xl md:text-4xl mt-4 leading-tight ${titleClass}`}
        >
          Our Beautiful Love Story
        </motion.h3>
        <div className={`w-16 h-1 bg-gradient-to-r ${theme === 'gold' ? 'from-amber-400 to-amber-600' : 'from-pink-500 to-purple-500'} mx-auto mt-4 rounded-full`} />
      </div>

      {/* Timeline core */}
      <div className="relative">
        {/* Timeline center line */}
        <div className={`absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b ${lineClass} -translate-x-1/2 opacity-70`} />

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
                <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 ${theme === 'gold' ? 'border-amber-400' : 'border-pink-400'} shadow-md flex items-center justify-center z-10 text-xs`}>
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
                  <div className={`relative p-6 rounded-2xl transition-all duration-300 group overflow-hidden ${cardClass}`}>
                    {/* Corner elegant background gradient light indicator */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme === 'gold' ? 'from-amber-300 to-amber-500' : m.colorClass}`} />
                    
                    <div className="mb-2 flex items-center justify-between">
                      <span className={`text-xs font-mono font-medium tracking-wide ${itemDateClass}`}>
                        {m.date}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${itemPhaseClass}`}>
                        Phase 0{m.id}
                      </span>
                    </div>

                    <h4 className={`font-display font-bold text-lg transition-colors duration-200 ${itemTitleClass} group-hover:text-rose-500`}>
                      {m.title}
                    </h4>
                    
                    <p className={`text-sm mt-2 leading-relaxed ${itemDescClass}`}>
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
