// Central site configuration — identity, contact, links, navigation.
// Links left as "" are treated as "not provided yet" and are hidden in the UI
// (no broken or placeholder links ever render). Paste real URLs here.

export const SITE = {
  name: 'Md Kutub Islam',
  shortName: 'Kutub',
  initial: 'K',
  role: 'Frontend Engineer',
  secondary: 'Full-Stack Capable Developer',
  tagline: 'I build modern web products — from interface to backend.',
  location: 'India',
  locationLong: 'Based in India',
  availability: 'Available for work',
  openTo: 'Open to opportunities',
  email: 'mdkutubislam09@gmail.com',
  // Canonical origin — keep in sync with `site` in astro.config.mjs
  url: 'https://mdkutubislam.com',
  title: 'Md Kutub Islam — Frontend Engineer & Full-Stack Developer',
  description:
    'Frontend Engineer and full-stack capable developer building modern SaaS products, web applications and AI-powered experiences with Vue.js, React.js, Node.js and PostgreSQL.',
} as const;

// Social / external profiles. Fill these in — empty strings stay hidden.
export const LINKS: Record<'github' | 'linkedin' | 'twitter' | 'resume', string> = {
  github: 'https://github.com/Md-Kutub-Islam',
  linkedin: 'https://www.linkedin.com/in/md-kutub-islam-623916262/',
  twitter: 'https://x.com/devkutub',
  resume: '/Kutub_Islam_Frontend_Engineer_Resume.pdf',
};

export type NavItem = { num: string; label: string; href: string };

export const NAV: NavItem[] = [
  { num: '01', label: 'About', href: '#about' },
  { num: '02', label: 'Work', href: '#work' },
  { num: '03', label: 'Stack', href: '#stack' },
  { num: '04', label: 'Experience', href: '#experience' },
  { num: '05', label: 'Contact', href: '#contact' },
];

/** True when a link has been configured. */
export const has = (url: string | undefined): url is string => !!url && url.trim().length > 0;
