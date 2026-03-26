// Interfaces base del proyecto portfolio

/// <reference types="astro/client" />

// Hero section
export interface HeroData {
  name: string;
  role: string;
  bio: string;
  ctaLabel: string;
  ctaHref: string;
  photo: string;
  social: SocialLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

// Projects section
export interface ProjectCard {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  status: 'online' | 'down' | 'pending';
}

// Skills section
export interface SkillCard {
  id: number;
  title: string;
  accentColor: string;
  icon: string;
  items: SkillItem[];
}

export interface SkillItem {
  category: string;
  skills: string[];
}

// Experience timeline
export interface TimelineNode {
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
  techStack: string[];
  svgX: number;
  svgY: number;
  side: 'left' | 'right';
}

// Testimonials
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

// Contact form
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

// UI components
export interface SectionDividerProps {
  labelKey: string;
  direction?: 'left' | 'right';
  baseVelocity?: number;
}

// Logo Marquee
export interface LogoItem {
  id:   string;  // clave para el svgMap
  name: string;  // texto accesible (aria-label)
}