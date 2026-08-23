// Professional experience. Sourced from the résumé.

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  // `primary` points shown by default; the rest reveal on expand.
  primary: string[];
  more: string[];
  tags: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: 'Wiseboxs Softworks Pvt. Ltd.',
    role: 'Frontend Engineer',
    period: 'March 2025 — May 2026',
    location: 'India',
    summary:
      'Built product frontends across EdTech commerce, CPaaS and social tooling — shipping accessible, performant interfaces alongside backend, QA and product teams.',
    primary: [
      'Raised an EdTech commerce platform’s accessibility & performance score from below 60 to 90+.',
      'Built the frontend for a CPaaS platform, including RCS messaging interfaces.',
      'Built WhatsApp template management and contributed frontend features to Krafon.',
    ],
    more: [
      'Implemented complex forms, dynamic rendering and file uploads.',
      'Managed application state with Pinia and Redux Toolkit.',
      'Collaborated across frontend, backend, QA and product teams.',
      'Contributed to sprint planning, code reviews and production releases.',
    ],
    tags: ['Vue.js', 'Pinia', 'Redux Toolkit', 'Accessibility', 'Performance', 'CPaaS', 'RCS'],
  },
];
