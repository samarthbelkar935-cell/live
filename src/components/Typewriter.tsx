import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TypewriterProps {
  text: string;
  speed?: number; // average speed in ms per character
  delay?: number;  // initial delay before start in ms
  className?: string;
}

export default function Typewriter({
  text,
  speed = 80,
  delay = 500,
  className = '',
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsDone(false);

    let currentIndex = 0;
    let timerId: NodeJS.Timeout;

    const startTyping = () => {
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text.charAt(currentIndex));
          currentIndex++;
          
          const randomSpeed = speed + (Math.random() * 40 - 20);
          timerId = setTimeout(typeNextChar, randomSpeed);
        } else {
          setIsDone(true);
        }
      };

      typeNextChar();
    };

    const initialTimeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timerId);
    };
  }, [text, speed, delay]);

  return (
    <span className={`inline-flex items-center flex-wrap justify-center ${className}`}>
      <span>{displayedText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        className={`inline-block ml-1 h-5 w-1 rounded-full ${
          isDone ? 'bg-rose-500/40' : 'bg-rose-500'
        }`}
        style={{
          height: '1.25em',
          verticalAlign: 'middle',
        }}
      />
    </span>
  );
}
