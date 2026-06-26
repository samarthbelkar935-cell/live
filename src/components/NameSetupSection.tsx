import React, { useState } from 'react';
import { motion } from 'motion/react';

interface NameSetupSectionProps {
  onSetupComplete: (config: {
    targetName: string;
    proposalMessage: string;
    vibe: string;
    authorName: string;
    proposalDate?: string;
  }) => void;
}

export default function NameSetupSection({ onSetupComplete }: NameSetupSectionProps) {
  const [targetName, setTargetName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [vibe, setVibe] = useState('romantic');
  const [authorName, setAuthorName] = useState('');
  const [proposalDate, setProposalDate] = useState('');
  const [error, setError] = useState('');

  const messagePresets = [
    'Will you forever be mine? ❤️',
    'Will you embark on a lifetime of sweet adventures with me? 💍',
    'In this lifetime and the next, will you be my forever? ✨',
    'Will you write our sweet forever story with me, hand-in-hand? 📖',
    'Custom Question...'
  ];

  const vibesList = [
    { id: 'romantic', name: 'Poetic & Deep', icon: '🌹', desc: 'Warm gradients, deep roses & celestial stardust.' },
    { id: 'playful', name: 'Whimsical & Playful', icon: '🧸', desc: 'Bubblegum hues, soft sparkles & lovely Stitch energies.' },
    { id: 'cinematic', name: 'Cinematic & Dreamy', icon: '🌌', desc: 'Ethereal purple fog, glowing orbits & twilight mystery.' },
    { id: 'royal', name: 'Royal & Timeless', icon: '👑', desc: 'Refined golden glimmers, classic serif charm & velvet whispers.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetName.trim()) {
      setError('Please provide the beautiful name of your special someone ❤️');
      return;
    }
    setError('');

    const finalMessage = 
      selectedPresetIdx === messagePresets.length - 1
        ? (customMessage.trim() || 'Will you forever be mine? ❤️')
        : messagePresets[selectedPresetIdx];

    onSetupComplete({
      targetName: targetName.trim(),
      proposalMessage: finalMessage,
      vibe,
      authorName: authorName.trim() || 'Samarth',
      proposalDate: proposalDate || undefined,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
      className="relative z-10 w-full max-w-2xl bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[40px] p-6 sm:p-10 flex flex-col my-8 mx-4 text-gray-800"
    >
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100/80 text-rose-600 rounded-full text-xs font-semibold uppercase tracking-widest border border-rose-200/50 shadow-xs">
          ✨ Premium Proposal Creator
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-gray-900 mt-3 leading-tight font-medium">
          Craft a Magical Proposal ❤️
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
          Create an intimate, high-end romantic landing page with interactive runaway buttons, secret letter stacks, and custom story milestones.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Input */}
        <div className="space-y-2">
          <label className="block text-sm font-display font-semibold text-gray-700 tracking-wide">
            Who is this proposal for?
          </label>
          <div className="relative">
            <input
              type="text"
              value={targetName}
              onChange={(e) => {
                setTargetName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter name..."
              className="w-full px-5 py-3.5 rounded-2xl bg-white/60 border border-white/50 focus:border-rose-400 focus:bg-white/90 outline-none transition-all font-sans font-medium text-base text-gray-800 placeholder-gray-400 shadow-inner"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">❤️</span>
          </div>
          {error && (
            <p className="text-xs font-semibold text-rose-500 animate-pulse mt-1 pl-1">
              ⚠️ {error}
            </p>
          )}
        </div>

        {/* Vibe Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-display font-semibold text-gray-700 tracking-wide">
            Choose Proposal Atmosphere
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vibesList.map((v) => {
              const active = vibe === v.id;
              return (
                <button
                  type="button"
                  key={v.id}
                  onClick={() => setVibe(v.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-rose-500/10 border-rose-400 shadow-sm ring-1 ring-rose-400/30'
                      : 'bg-white/40 border-white/40 hover:bg-white/60'
                  }`}
                >
                  <span className="text-2xl mt-0.5">{v.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 tracking-wide uppercase">
                      {v.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-display font-semibold text-gray-700 tracking-wide">
            The Romantic Question
          </label>
          <div className="flex flex-wrap gap-2">
            {messagePresets.map((p, idx) => {
              const active = selectedPresetIdx === idx;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedPresetIdx(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium border cursor-pointer transition-all ${
                    active
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                      : 'bg-white/40 border-white/50 text-gray-600 hover:bg-white/70'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          {selectedPresetIdx === messagePresets.length - 1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-2"
            >
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your bespoke romantic question here..."
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 focus:border-rose-400 focus:bg-white/95 outline-none transition-all text-sm text-gray-800 placeholder-gray-400 resize-none shadow-inner"
              />
            </motion.div>
          )}
        </div>

        {/* Who is creating this? */}
        <div className="space-y-2">
          <label className="block text-sm font-display font-semibold text-gray-700 tracking-wide">
            Your Signature Name (Who is proposing?)
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-5 py-3 rounded-xl bg-white/60 border border-white/50 focus:border-rose-400 focus:bg-white/90 outline-none transition-all font-sans text-sm text-gray-800 placeholder-gray-400 shadow-inner"
          />
        </div>

        {/* Proposal Date & Time Countdown (Optional) */}
        <div className="space-y-2">
          <label className="block text-sm font-display font-semibold text-gray-700 tracking-wide">
            Proposal Date & Time (Optional)
          </label>
          <input
            type="datetime-local"
            value={proposalDate}
            onChange={(e) => setProposalDate(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/60 border border-white/50 focus:border-rose-400 focus:bg-white/90 outline-none transition-all font-sans text-sm text-gray-800 placeholder-gray-400 shadow-inner"
          />
          <p className="text-[11px] text-gray-500 leading-relaxed pl-1">
            Setting a future date/time enables a live, elegant countdown clock displaying Days, Hours, Minutes, and Seconds until your beautiful milestone. 🪐
          </p>
        </div>

        {/* Submit */}
        <div className="pt-2 text-center">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-display font-semibold text-base rounded-2xl shadow-lg hover:shadow-xl hover:shadow-rose-500/20 active:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            Create Magical Proposal ✨
          </motion.button>
        </div>

      </form>
    </motion.div>
  );
}
