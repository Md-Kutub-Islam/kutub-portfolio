// Selected work. Facts sourced from the résumé — no invented metrics or URLs.
// liveUrl / repoUrl are "" until provided; the UI hides unconfigured links.
//
// `kind` drives the personal-vs-professional distinction in the UI:
//   'personal'     → self-owned products (Brain Dump, ReplyZen)
//   'professional' → client / employer work at Wiseboxs (CPaaS, EdTech, Krafon)
// NDA-protected professional work is described through publicly safe technical
// contribution only — no confidential product, backend, client or asset detail.

export type Project = {
  slug: string;
  index: string; // display order label
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  role: string;
  context?: string; // e.g. professional vs. personal framing
  year: string;
  status: 'Live' | 'In development' | 'Product work';
  features: string[];
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  featured?: boolean;
  kind: 'personal' | 'professional';
  company?: string; // employer for professional work (badge label)
  nda?: boolean; // NDA-protected — surfaces a discreet notice, hides links
  // Optional headline metric rendered as a prominent stat (e.g. a before→after).
  metric?: { from: string; to: string; label: string };
  // Abstract preview identity (CSS-driven, no fake screenshots)
  accentPreview: 'braindump' | 'replyzen' | 'krafon' | 'cpaas' | 'edtech';
};

export const PROJECTS: Project[] = [
  {
    slug: 'braindump',
    index: '01',
    title: 'Brain Dump',
    subtitle: 'AI-powered thought organization & productivity app',
    summary:
      'A full-stack productivity application that turns messy brain dumps into structured tasks and plans using AI.',
    description:
      'Brain Dump takes unstructured, natural-language thoughts and turns them into an organized plan. You write everything on your mind; AI parses it into actionable tasks and sorts them across Today, Tomorrow, This Week and Someday. Unfinished work rolls over automatically, so the plan stays honest without manual upkeep.',
    role: 'Solo full-stack — product, frontend, API, database & AI',
    context: 'Personal product',
    year: '2025',
    status: 'Live',
    features: [
      'Natural-language brain dump processing',
      'AI-powered thought organization',
      'Today / Tomorrow / This Week / Someday categorization',
      'Automatic rollover of unfinished tasks',
      'Active, pending & completed task management',
      'Mobile-first interface',
      'Astro.js marketing & business site',
      'Tauri mobile application direction',
    ],
    stack: [
      'Vue.js',
      'TypeScript',
      'Tailwind CSS',
      'Tauri',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Supabase',
      'Prisma',
      'Astro.js',
      'Gemini AI',
    ],
    liveUrl: 'https://braindump.de5.net/',
    repoUrl: '',
    featured: true,
    kind: 'personal',
    accentPreview: 'braindump',
  },
  {
    slug: 'replyzen',
    index: '02',
    title: 'ReplyZen',
    subtitle: 'Instagram DM automation platform',
    summary:
      'A full-stack Instagram automation platform that turns public comments into direct-message workflows for creators and businesses.',
    description:
      'ReplyZen connects Instagram accounts through the Meta Graph API and listens for engagement via webhooks. Keyword triggers fire automated public replies and DMs — text, image or link — with dynamic variables, Follow Gates and Email Gates for lead capture. Captured leads are managed and exportable, with background processing handled through Redis queues.',
    role: 'Full-stack ownership — frontend, APIs, integrations & queues',
    context: 'Personal product',
    year: '2025',
    status: 'In development',
    features: [
      'Instagram account integration via Meta Graph API',
      'Webhook-driven engagement handling',
      'Keyword triggers & public comment replies',
      'DM automation — text, image & link messages',
      'Dynamic variables in responses',
      'Follow Gate & Email Gate lead capture',
      'Lead management with CSV export',
      'Authentication (JWT) & background processing',
      'Redis queues & PostgreSQL persistence',
      'REST APIs',
    ],
    stack: [
      'Vue.js',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Redis',
      'Tailwind CSS',
      'JWT',
      'Meta Graph API',
      'Webhooks',
      'Cloudflare',
    ],
    liveUrl: '',
    repoUrl: 'https://github.com/Md-Kutub-Islam/replyzen-pubilc',
    featured: true,
    kind: 'personal',
    accentPreview: 'replyzen',
  },
  {
    slug: 'cpaas',
    index: '03',
    title: 'CPaaS',
    subtitle: 'Communications Platform as a Service',
    summary:
      'A cloud communications platform that enables businesses to add channels like SMS, Voice and conversational channels through APIs. I focused on the frontend — UI design and implementation.',
    description:
      'CPaaS (Communications Platform as a Service) is a cloud-based communication platform that enables businesses to add channels such as SMS, Voice and conversational messaging through APIs. My contribution was primarily frontend development, UI design and implementation at Wiseboxs. Highlights include building the RCS Message module supporting text, file, rich card and carousel message types, WhatsApp template management functionality, migrating the existing UI codebase from Vuetify to Quasar Framework, and building a visual flow-chart interface for creating and structuring chatbot/bot workflows, including structuring and visualizing backend data within the interface.',
    role: 'Frontend development, UI design & implementation',
    context: 'Professional · Wiseboxs',
    year: '2025',
    status: 'Product work',
    features: [
      'Built RCS Message module supporting text, file, rich card & carousel message types',
      'Built WhatsApp template management functionality',
      'Migrated existing UI codebase from Vuetify to Quasar Framework',
      'Built a visual flow-chart interface for creating & structuring chatbot/bot workflows',
      'Structured and visualized backend data in the flow-chart interface',
      'Worked with Vue.js, Quasar Framework, Pinia and TypeScript',
      'Worked closely with product and backend requirements while implementing the frontend',
    ],
    stack: ['Vue.js', 'Quasar Framework', 'Pinia', 'TypeScript'],
    liveUrl: '',
    repoUrl: '',
    kind: 'professional',
    company: 'Wiseboxs',
    nda: true,
    accentPreview: 'cpaas',
  },
  {
    slug: 'edtech-commerce',
    index: '04',
    title: 'EdTech Commerce',
    subtitle: 'Frontend performance, accessibility & production work',
    summary:
      'An existing EdTech commerce platform where I worked on frontend improvements, performance optimization, accessibility and live production fixes.',
    description:
      'I worked on an existing, in-production EdTech commerce platform at Wiseboxs — focusing on frontend quality, performance and accessibility rather than building the application from scratch. Key contributions included elevating accessibility / performance scores from below 60 to 90+, fixing production bugs and frontend issues, integrating PostHog for product analytics, and delivering responsive frontend UX enhancements.',
    role: 'Frontend performance, accessibility & production fixes',
    context: 'Professional · Wiseboxs',
    year: '2025',
    status: 'Product work',
    features: [
      'Improved frontend performance and overall user experience',
      'Worked on improving accessibility/performance from below 60 to 90+',
      'Fixed production bugs and frontend issues',
      'Integrated PostHog for product analytics',
      'Worked on responsive frontend improvements',
      'Worked with Vue.js, Quasar Framework and Pinia',
      'Worked on an existing production product rather than building from scratch',
    ],
    stack: ['Vue.js', 'Quasar Framework', 'Pinia', 'PostHog'],
    liveUrl: '',
    repoUrl: '',
    kind: 'professional',
    company: 'Wiseboxs',
    nda: true,
    metric: { from: '< 60', to: '90+', label: 'ACCESSIBILITY / PERFORMANCE IMPROVEMENT' },
    accentPreview: 'edtech',
  },
  {
    slug: 'krafon',
    index: '05',
    title: 'Krafon',
    subtitle: 'Social media scheduling SaaS',
    summary:
      'A social media scheduling SaaS I contributed to as part of my product work at Wiseboxs — analytics, integrations, SEO and complex frontend features.',
    description:
      'At Wiseboxs I worked on Krafon, a social media scheduling product. I built frontend features including Facebook analytics integration, Instagram account connectivity and authentication flows, improved SEO, and implemented social-media preview generation alongside complex forms, dynamic rendering and state management.',
    role: 'Frontend feature development',
    context: 'Product work at Wiseboxs Softworks',
    year: '2025',
    status: 'Product work',
    features: [
      'Facebook Analytics integration',
      'Instagram account connectivity',
      'Authentication flows',
      'SEO improvements',
      'Social media preview generation',
      'Complex forms & dynamic rendering',
      'Frontend state management',
    ],
    stack: ['Vue.js', 'Pinia', 'Tailwind CSS', 'REST APIs', 'SEO'],
    liveUrl: '',
    repoUrl: '',
    kind: 'professional',
    company: 'Wiseboxs',
    accentPreview: 'krafon',
  },
];

export const getProject = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);
