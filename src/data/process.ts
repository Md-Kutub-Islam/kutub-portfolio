// "How I build" — process stages (sticky, scroll-driven).

export type Stage = { num: string; title: string; body: string };

export const PROCESS: Stage[] = [
  {
    num: '01',
    title: 'Understand',
    body: 'Understand the product, the users and the actual problem before writing a line of code.',
  },
  {
    num: '02',
    title: 'Design',
    body: 'Break messy requirements into clear UI, states and interaction flows.',
  },
  {
    num: '03',
    title: 'Build',
    body: 'Build the frontend, the APIs and the product functionality that ties them together.',
  },
  {
    num: '04',
    title: 'Iterate',
    body: 'Test, debug, optimize and improve based on how people actually use it.',
  },
];
