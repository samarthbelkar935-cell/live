let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a warm, delicate, sliding chime/harp sound for the envelope opening.
 */
export function playEnvelopeOpenSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Use a soft romantic pentatonic scale (F4, A4, C5, D5, F5, A5, C6)
    const freqs = [349.23, 440.00, 523.25, 587.33, 698.46, 880.00, 1046.50];

    freqs.forEach((freq, index) => {
      const noteTime = now + index * 0.10;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Soft triangle wave for sweet warm woodwind/chime texture
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      // Low pass filter to make it gentle and warm
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, noteTime);
      filter.frequency.exponentialRampToValueAtTime(800, noteTime + 0.5);

      // Smooth envelope attack and decay
      gainNode.gain.setValueAtTime(0, noteTime);
      gainNode.gain.linearRampToValueAtTime(0.12, noteTime + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.6);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.7);
    });
  } catch (error) {
    console.warn('AudioContext failed to play envelope sound:', error);
  }
}

/**
 * Plays a rich, magical heart-burst sound with a heartbeat thump and star-shower twinkle cascade.
 */
export function playHeartBurstSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // 1. Double Heartbeat Thump (Warm, deep physical beat representation)
    const thumpTimes = [0, 0.12];
    thumpTimes.forEach((delay) => {
      const thumpTime = now + delay;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, thumpTime);
      osc.frequency.exponentialRampToValueAtTime(40, thumpTime + 0.15);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, thumpTime);

      gainNode.gain.setValueAtTime(0, thumpTime);
      gainNode.gain.linearRampToValueAtTime(0.35, thumpTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, thumpTime + 0.22);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(thumpTime);
      osc.stop(thumpTime + 0.3);
    });

    // 2. Sparkly Star Cascade (Rapid high crystal sparkles)
    // Notes: G5, A5, C6, E6, G6, A6, C7, E7, G7, B7
    const twinkleFreqs = [783.99, 880.00, 1046.50, 1318.51, 1567.98, 1760.00, 2093.00, 2637.02, 3135.96, 3951.07];

    twinkleFreqs.forEach((freq, index) => {
      const sparkleTime = now + 0.05 + index * 0.05 + Math.random() * 0.015;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, sparkleTime);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, sparkleTime);

      gainNode.gain.setValueAtTime(0, sparkleTime);
      gainNode.gain.linearRampToValueAtTime(0.06, sparkleTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, sparkleTime + 0.4);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(sparkleTime);
      osc.stop(sparkleTime + 0.5);
    });

    // 3. Warm shimmering background pad (Cmaj9 chord harmony to resolve)
    const chordFreqs = [130.81, 196.00, 246.94, 329.63, 392.00, 493.88]; // C3, G3, B3, E4, G4, B4
    chordFreqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(250, now + 1.8);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.08, now + 0.4);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.4);
    });

  } catch (error) {
    console.warn('AudioContext failed to play heart burst sound:', error);
  }
}
