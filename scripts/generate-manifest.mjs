
import fs from 'fs';
import path from 'path';

const framesDir = path.join(process.cwd(), 'public', 'frames');
const manifestPath = path.join(framesDir, 'manifest.json');

// Ensure frames directory exists
if (!fs.existsSync(framesDir)) {
  console.error('Frames directory not found:', framesDir);
  process.exit(1);
}

// Read files
const files = fs.readdirSync(framesDir);

// Filter and sort images
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
const frames = files
  .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
  .sort((a, b) => {
    // Try to sort numerically if possible
    const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
    if (numA !== numB) return numA - numB;
    return a.localeCompare(b);
  })
  .map(file => `/frames/${file}`);

// Write manifest
const manifest = {
  frames,
  count: frames.length,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Manifest generated with ${frames.length} frames at ${manifestPath}`);
