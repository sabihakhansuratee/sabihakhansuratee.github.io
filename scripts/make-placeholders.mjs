// Generates placeholder images for the site's placeholder content.
//
// Safe to delete once real photos/screenshots have replaced every placeholder
// (see `npm run check:placeholders`, added in Phase 6). Safe to re-run at any
// time — it always overwrites the same files with the same specs.
//
// Usage: node scripts/make-placeholders.mjs

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mediaRoot = join(__dirname, '..', 'src', 'assets', 'media');

// A small set of flat, muted, desaturated fills — neutral enough not to fight
// whatever palette Phase 3 lands on, and unmistakably "not real design work."
const fills = {
  stone: { r: 200, g: 196, b: 189 },
  slate: { r: 178, g: 184, b: 190 },
  clay: { r: 196, g: 178, b: 168 },
  moss: { r: 182, g: 190, b: 172 },
  fog: { r: 210, g: 210, b: 210 },
};

function labelSvg(width, height, label, dark = false) {
  const textColor = dark ? '#3a3a3a' : '#f2f2f0';
  const fontSize = Math.max(18, Math.round(Math.min(width, height) / 18));
  const lines = label.split('\n');
  const lineHeight = fontSize * 1.4;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
  const text = lines
    .map(
      (line, i) =>
        `<text x="50%" y="${startY + i * lineHeight}" font-family="Helvetica, Arial, sans-serif" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${line}</text>`
    )
    .join('\n');
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${text}</svg>`);
}

async function makeFlat({ path, width, height, fill, label, oversized = false }) {
  await mkdir(dirname(path), { recursive: true });
  const dark = fill.r + fill.g + fill.b > 550;

  let img;
  if (oversized) {
    // Gaussian noise defeats JPEG compression, genuinely producing a multi-MB
    // file — the point is to exercise Astro's image optimisation for real.
    img = sharp({
      create: {
        width,
        height,
        channels: 3,
        noise: { type: 'gaussian', mean: (fill.r + fill.g + fill.b) / 3, sigma: 40 },
      },
    });
  } else {
    img = sharp({
      create: { width, height, channels: 3, background: fill },
    });
  }

  const labelText = `${label}\n${width}×${height}px`;
  const composited = img.composite([{ input: labelSvg(width, height, labelText, dark), top: 0, left: 0 }]);

  if (oversized) {
    await composited.jpeg({ quality: 95, chromaSubsampling: '4:4:4' }).toFile(path);
  } else {
    await composited.jpeg({ quality: 82 }).toFile(path);
  }
}

const specs = [
  // Case studies
  { path: 'case-studies/halyard-fellows/cover.jpg', width: 1600, height: 900, fill: fills.stone, label: 'halyard-fellows/cover.jpg' },

  { path: 'case-studies/meridian-forum/cover.jpg', width: 1600, height: 900, fill: fills.slate, label: 'meridian-forum/cover.jpg' },
  { path: 'case-studies/meridian-forum/inline-1.jpg', width: 1600, height: 1000, fill: fills.slate, label: 'meridian-forum/inline-1.jpg' },
  { path: 'case-studies/meridian-forum/inline-2.jpg', width: 1200, height: 1200, fill: fills.slate, label: 'meridian-forum/inline-2.jpg' },
  { path: 'case-studies/meridian-forum/inline-3.jpg', width: 1600, height: 1000, fill: fills.slate, label: 'meridian-forum/inline-3.jpg' },

  { path: 'case-studies/northwind-symposium/cover.jpg', width: 1600, height: 900, fill: fills.clay, label: 'northwind-symposium/cover.jpg' },
  { path: 'case-studies/northwind-symposium/inline-1.jpg', width: 1600, height: 1000, fill: fills.clay, label: 'northwind-symposium/inline-1.jpg' },
  { path: 'case-studies/northwind-symposium/inline-2.jpg', width: 1200, height: 1200, fill: fills.clay, label: 'northwind-symposium/inline-2.jpg' },
  { path: 'case-studies/northwind-symposium/inline-3.jpg', width: 1600, height: 1000, fill: fills.clay, label: 'northwind-symposium/inline-3.jpg' },
  { path: 'case-studies/northwind-symposium/inline-4.jpg', width: 1200, height: 1200, fill: fills.clay, label: 'northwind-symposium/inline-4.jpg' },
  { path: 'case-studies/northwind-symposium/inline-5.jpg', width: 1600, height: 1000, fill: fills.clay, label: 'northwind-symposium/inline-5.jpg' },

  { path: 'case-studies/solstice-roundtable/cover.jpg', width: 1600, height: 900, fill: fills.moss, label: 'solstice-roundtable/cover.jpg' },

  // Gallery — mixed aspect ratios on purpose
  { path: 'gallery/halyard-fellows-banner.jpg', width: 2400, height: 800, fill: fills.stone, label: 'halyard-fellows-banner.jpg' },
  { path: 'gallery/halyard-fellows-certificate.jpg', width: 1600, height: 1131, fill: fills.stone, label: 'halyard-fellows-certificate.jpg' },
  { path: 'gallery/meridian-forum-signage.jpg', width: 1200, height: 2000, fill: fills.slate, label: 'meridian-forum-signage.jpg' },
  { path: 'gallery/meridian-forum-booklet.jpg', width: 2000, height: 1300, fill: fills.slate, label: 'meridian-forum-booklet.jpg' },
  { path: 'gallery/meridian-forum-story-tile.jpg', width: 1080, height: 1920, fill: fills.slate, label: 'meridian-forum-story-tile.jpg' },
  { path: 'gallery/northwind-symposium-backdrop.jpg', width: 4000, height: 1000, fill: fills.clay, label: 'northwind-symposium-backdrop.jpg', oversized: true },
  { path: 'gallery/northwind-symposium-badge.jpg', width: 1200, height: 1200, fill: fills.clay, label: 'northwind-symposium-badge.jpg' },
  { path: 'gallery/northwind-symposium-recap-video-poster.jpg', width: 1600, height: 900, fill: fills.clay, label: 'northwind-symposium-recap-video-poster.jpg' },
  { path: 'gallery/northwind-symposium-linkedin-tile.jpg', width: 1200, height: 1200, fill: fills.clay, label: 'northwind-symposium-linkedin-tile.jpg' },
  { path: 'gallery/solstice-roundtable-flyer.jpg', width: 1600, height: 2263, fill: fills.moss, label: 'solstice-roundtable-flyer.jpg' },
  { path: 'gallery/solstice-roundtable-linkedin-recap.jpg', width: 1200, height: 1200, fill: fills.moss, label: 'solstice-roundtable-linkedin-recap.jpg' },
  { path: 'gallery/website-banner-refresh.jpg', width: 2600, height: 700, fill: fills.fog, label: 'website-banner-refresh.jpg' },

  // About + site
  { path: 'about/headshot.jpg', width: 800, height: 800, fill: fills.fog, label: 'about/headshot.jpg' },
  { path: 'site/og-image.jpg', width: 1200, height: 630, fill: fills.fog, label: 'site/og-image.jpg' },
];

for (const spec of specs) {
  const fullPath = join(mediaRoot, spec.path);
  await makeFlat({ ...spec, path: fullPath });
  console.log(`✓ ${spec.path} (${spec.width}×${spec.height})`);
}

console.log(`\nDone — ${specs.length} placeholder images written to src/assets/media/`);
