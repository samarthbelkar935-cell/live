import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Sparkles, X, Camera } from 'lucide-react';

interface NameSetupSectionProps {
  onSetupComplete: (config: {
    targetName: string;
    proposalMessage: string;
    vibe: string;
    authorName: string;
    proposalDate?: string;
    theme: 'rose' | 'midnight' | 'gold';
    bannerImage?: string;
    romanticAtmosphere: boolean;
  }) => void;
}

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxW = 800;
        const maxH = 450;
        let w = img.width;
        let h = img.height;
        if (w > maxW || h > maxH) {
          if (w / h > maxW / maxH) {
            h = Math.round((h * maxW) / w);
            w = maxW;
          } else {
            w = Math.round((w * maxH) / h);
            h = maxH;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.65);
          resolve(dataUrl);
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export default function NameSetupSection({ onSetupComplete }: NameSetupSectionProps) {
  const [targetName, setTargetName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [vibe, setVibe] = useState('romantic');
  const [theme, setTheme] = useState<'rose' | 'midnight' | 'gold'>('rose');
  const [authorName, setAuthorName] = useState('');
  const [proposalDate, setProposalDate] = useState('');
  const [error, setError] = useState('');

  // Banner states
  const [romanticAtmosphere, setRomanticAtmosphere] = useState(true);
  const [bannerSource, setBannerSource] = useState<'none' | 'preset' | 'upload' | 'url'>('none');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset1');
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const bannerPresets = [
    { id: 'preset1', name: 'Starry Romance', url: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=300&auto=format&fit=crop' },
    { id: 'preset2', name: 'Sunset Serenade', url: 'https://images.unsplash.com/photo-1501908731068-40048283553a?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1501908731068-40048283553a?q=80&w=300&auto=format&fit=crop' },
    { id: 'preset3', name: 'Cherry Blossom Walk', url: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?q=80&w=300&auto=format&fit=crop' },
    { id: 'preset4', name: 'Fairytale Forest', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=300&auto=format&fit=crop' }
  ];

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

    let finalBannerImage: string | undefined = undefined;
    if (bannerSource === 'preset') {
      const activePreset = bannerPresets.find(p => p.id === selectedPresetId);
      finalBannerImage = activePreset ? activePreset.url : undefined;
    } else if (bannerSource === 'upload') {
      finalBannerImage = uploadedImage || undefined;
    } else if (bannerSource === 'url') {
      finalBannerImage = customUrl.trim() || undefined;
    }

    onSetupComplete({
      targetName: targetName.trim(),
      proposalMessage: finalMessage,
      vibe,
      authorName: authorName.trim() || 'Samarth',
      proposalDate: proposalDate || undefined,
      theme,
      bannerImage: finalBannerImage,
      romanticAtmosphere,
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

        {/* Background Theme Palette Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-display font-semibold text-gray-700 tracking-wide">
            Select Background Theme Palette
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'rose', name: 'Soft Rose', color: 'bg-rose-400', preview: 'bg-gradient-to-tr from-rose-100 via-pink-50 to-rose-200' },
              { id: 'midnight', name: 'Midnight Blue', color: 'bg-slate-900', preview: 'bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-900' },
              { id: 'gold', name: 'Gold & White', color: 'bg-amber-400', preview: 'bg-gradient-to-tr from-stone-50 via-amber-50/40 to-stone-100' }
            ].map((th) => {
              const active = theme === th.id;
              return (
                <button
                  type="button"
                  key={th.id}
                  onClick={() => setTheme(th.id as 'rose' | 'midnight' | 'gold')}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer group ${
                    active
                      ? 'bg-white border-rose-400 shadow-md ring-1 ring-rose-400/30'
                      : 'bg-white/40 border-white/40 hover:bg-white/70 hover:shadow-xs'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full border-2 ${active ? 'border-rose-400' : 'border-gray-200/60'} ${th.preview} flex items-center justify-center shadow-inner mb-2 overflow-hidden transition-all group-hover:scale-105`}>
                    <div className={`w-3.5 h-3.5 rounded-full ${th.color} shadow-xs`} />
                  </div>
                  <span className={`text-[11px] font-display font-semibold transition-colors ${active ? 'text-rose-600' : 'text-gray-600'}`}>
                    {th.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Background Banner Image Option */}
        <div className="space-y-3 p-5 rounded-3xl bg-white/40 border border-white/50 shadow-sm">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-rose-500 animate-pulse" />
            <label className="block text-sm font-display font-semibold text-gray-800 tracking-wide">
              Background Banner Image (Hero Cover)
            </label>
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed -mt-1">
            Display a beautiful decorative banner at the top of your proposal card to make it feel deeply personalized and immersive.
          </p>

          {/* Banner Source Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-gray-200/50 backdrop-blur-xs rounded-xl text-center">
            {[
              { id: 'none', name: 'None' },
              { id: 'preset', name: 'AI Art' },
              { id: 'upload', name: 'Upload' },
              { id: 'url', name: 'Web URL' }
            ].map((src) => (
              <button
                type="button"
                key={src.id}
                onClick={() => setBannerSource(src.id as 'none' | 'preset' | 'upload' | 'url')}
                className={`py-1.5 px-1 rounded-lg text-[11px] font-semibold tracking-wide transition-all cursor-pointer ${
                  bannerSource === src.id
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-white/30'
                }`}
              >
                {src.name}
              </button>
            ))}
          </div>

          {/* Preset options */}
          {bannerSource === 'preset' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2 pt-1"
            >
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                <span>Select from AI-generated Romantic Art:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {bannerPresets.map((preset) => {
                  const active = selectedPresetId === preset.id;
                  return (
                    <button
                      type="button"
                      key={preset.id}
                      onClick={() => setSelectedPresetId(preset.id)}
                      className={`relative rounded-xl overflow-hidden aspect-[16/9] border-2 transition-all group text-left cursor-pointer ${
                        active
                          ? 'border-rose-500 ring-2 ring-rose-400/20 shadow-md scale-[1.02]'
                          : 'border-white/60 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={preset.thumb}
                        alt={preset.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
                        <span className="text-[10px] font-semibold text-white truncate w-full">
                          {preset.name}
                        </span>
                      </div>
                      {active && (
                        <div className="absolute top-1 right-1 bg-rose-500 text-white rounded-full p-0.5 shadow-md">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Upload option with Drag and Drop */}
          {bannerSource === 'upload' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2 pt-1"
            >
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold mb-2">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload a Representative Photo:</span>
              </div>

              {!uploadedImage ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={async (e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file && file.type.startsWith('image/')) {
                      const compressed = await compressImage(file);
                      setUploadedImage(compressed);
                    }
                  }}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-rose-500 bg-rose-500/10'
                      : 'border-gray-300 hover:border-rose-400 hover:bg-white/40'
                  }`}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = async (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const compressed = await compressImage(file);
                        setUploadedImage(compressed);
                      }
                    };
                    input.click();
                  }}
                >
                  <div className="flex flex-col items-center justify-center space-y-2 select-none">
                    <Camera className="w-8 h-8 text-rose-400" />
                    <p className="text-xs font-semibold text-gray-700">Drag & drop your photo or click to browse</p>
                    <p className="text-[10px] text-gray-400">Supports JPG, PNG (automatic smart compression)</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-rose-100 shadow-sm">
                  <img
                    src={uploadedImage}
                    alt="Uploaded user banner preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => setUploadedImage('')}
                      className="bg-white/90 hover:bg-white text-rose-600 rounded-full p-2.5 shadow-md flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>Remove and Re-upload</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Web URL option */}
          {bannerSource === 'url' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2 pt-1"
            >
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold mb-2">
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Paste Custom Image Web URL:</span>
              </div>
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/50 focus:border-rose-400 focus:bg-white/90 outline-none transition-all font-sans text-xs text-gray-800 placeholder-gray-400 shadow-inner"
              />
              <p className="text-[10px] text-gray-400 leading-normal pl-1">
                Tip: Copy any image address from Unsplash or Pinterest to showcase your favorite memories!
              </p>
              {customUrl.trim() && (
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-rose-100 shadow-sm mt-2">
                  <img
                    src={customUrl}
                    alt="Custom URL preview"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/vibrant/800/450?blur=4';
                    }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/60 px-2 py-0.5 rounded text-[9px] text-white font-mono">
                    Image Preview
                  </div>
                </div>
              )}
            </motion.div>
          )}
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

        {/* Romantic Atmosphere Backdrop Toggle */}
        <div className="space-y-3 p-5 rounded-3xl bg-white/40 border border-white/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
              <div>
                <label className="block text-sm font-display font-semibold text-gray-800 tracking-wide">
                  Romantic Atmosphere Effect
                </label>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Adds falling cherry blossom petals or snow matching your theme.
                </p>
              </div>
            </div>
            
            {/* Custom IOS-style Switch Toggle */}
            <button
              type="button"
              onClick={() => setRomanticAtmosphere(!romanticAtmosphere)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out outline-none ${
                romanticAtmosphere ? 'bg-pink-500' : 'bg-gray-350'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-250 ease-in-out ${
                  romanticAtmosphere ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
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
