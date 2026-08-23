// Technology stack — grouped, typography-first (no percentage bars).
// `note` is the secondary detail revealed on hover/focus.

export type Tech = { name: string; note?: string };
export type StackGroup = { key: string; label: string; items: Tech[] };

export const STACK: StackGroup[] = [
  {
    key: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'Vue.js', note: 'Primary framework' },
      { name: 'React.js', note: 'Component architecture' },
      { name: 'TypeScript', note: 'Type-safe by default' },
      { name: 'JavaScript', note: 'ES2023+' },
      { name: 'Next.js', note: 'React SSR / routing' },
      { name: 'Nuxt.js', note: 'Vue SSR / routing' },
      { name: 'Tailwind CSS', note: 'Design systems' },
      { name: 'Quasar', note: 'Vue app framework' },
      { name: 'Vuetify', note: 'Material components' },
      { name: 'HTML', note: 'Semantic & accessible' },
      { name: 'CSS', note: 'Modern layout & motion' },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    items: [
      { name: 'Node.js', note: 'Runtime' },
      { name: 'Express.js', note: 'API layer' },
      { name: 'REST APIs', note: 'Design & integration' },
    ],
  },
  {
    key: 'database',
    label: 'Database',
    items: [
      { name: 'PostgreSQL', note: 'Relational store' },
      { name: 'MongoDB', note: 'Document store' },
      { name: 'Redis', note: 'Queues & cache' },
      { name: 'Prisma', note: 'Type-safe ORM' },
      {name: 'Supabase',note: 'PostgreSQL DB for Supabase'}
    ],
  },
  {
    key: 'platform',
    label: 'Product / Platform',
    items: [
      { name: 'Astro.js', note: 'Content & marketing' },
      { name: 'Tauri', note: 'Cross-platform apps' },
      { name: 'Supabase', note: 'Auth & Postgres' },
      { name: 'Docker', note: 'Containers' },
      { name: 'Cloudflare', note: 'Edge & networking' },
      { name: 'Vercel', note: 'Deploy & preview' },
    ],
  },
  {
    key: 'ai',
    label: 'AI / Development',
    items: [
      { name: 'Cursor', note: 'AI-native editor' },
      { name: 'GitHub Copilot', note: 'In-editor assist' },
      { name: 'Claude', note: 'Reasoning & build' },
      { name: 'ChatGPT', note: 'Ideation & research' },
      { name: 'Prompt Engineering', note: 'Applied AI workflows' },
    ],
  },
];
