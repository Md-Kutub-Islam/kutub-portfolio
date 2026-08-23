// One-off asset generator. Rasterizes the SVG mark into PNG icons and builds
// the 1200x630 Open Graph card. Run with: node scripts/gen-assets.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public');

const BG = '#0a0a0b';
const FG = '#eceae4';
const DIM = '#a3a29c';
const MUTED = '#6d6c66';
const ACCENT = '#f6efe1';
const LINE = 'rgba(236,234,228,0.14)';

// Square icon mark (a stylized K + accent dot on a rounded near-black tile)
const iconSvg = (s) => `
<svg width="${s}" height="${s}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="14" fill="${BG}"/>
  <path d="M20 15 L20 49 M20 33 L40 15 M25 31 L42 49" fill="none" stroke="${FG}" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="46" cy="19" r="3.4" fill="${ACCENT}"/>
</svg>`;

// Open Graph card — editorial, near-monochrome
const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="100%" cy="0%" r="90%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.10"/>
      <stop offset="55%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="72" y="72" width="1056" height="1" fill="${LINE}"/>
  <rect x="72" y="558" width="1056" height="1" fill="${LINE}"/>

  <g font-family="'DejaVu Sans','Arial',sans-serif">
    <text x="72" y="104" fill="${MUTED}" font-size="22" letter-spacing="6">PORTFOLIO</text>
    <text x="1128" y="104" fill="${MUTED}" font-size="22" letter-spacing="4" text-anchor="end">2025</text>

    <text x="70" y="322" fill="${FG}" font-size="118" font-weight="700" letter-spacing="-4">Md Kutub Islam</text>
    <text x="72" y="392" fill="${DIM}" font-size="40" font-weight="400" letter-spacing="-1">Frontend Engineer &#183; Full-Stack Capable Developer</text>

    <text x="72" y="540" fill="${MUTED}" font-size="24" letter-spacing="1">Based in India &#183; Available for work</text>
    <text x="1128" y="540" fill="${MUTED}" font-size="24" letter-spacing="1" text-anchor="end">mdkutubislam.com</text>
  </g>

  <circle cx="1104" cy="516" r="6" fill="${ACCENT}"/>
</svg>`;

const jobs = [
  ['favicon-32.png', iconSvg(32), 32],
  ['apple-touch-icon.png', iconSvg(180), 180],
  ['icon-192.png', iconSvg(192), 192],
  ['icon-512.png', iconSvg(512), 512],
];

for (const [name, svg, size] of jobs) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(out, name));
  console.log('wrote', name);
}
await sharp(Buffer.from(ogSvg)).png().toFile(join(out, 'og-image.png'));
console.log('wrote og-image.png');
