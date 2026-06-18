export interface Particle {
  id: number;
  x: number; // percentage width
  size: number;
  delay: number;
  duration: number;
  type: 'heart' | 'sparkle' | 'bubble';
  color: string;
}

export interface Milestone {
  id: number;
  title: string;
  date: string;
  description: string;
  emoji: string;
  colorClass: string;
}
