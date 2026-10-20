// One-off helper: builds responsive WebP/AVIF derivatives of gallery photos.
// Originals are only read, never modified.
//
//   npm i sharp   (in a scratch folder, not in this repo)
//   NODE_PATH=<scratch>/node_modules node scripts/make-gallery-derivatives.js [ratchaburi|legacy|all]
//
// ratchaburi -> export/assets/gallery/ratchaburi-e-card/web/rc-<id>-<width>.{webp,avif}
// legacy     -> export/assets/gallery/legacy-web/<name>-<width>.{webp,avif}
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const GALLERY = path.join(__dirname, '..', 'export', 'assets', 'gallery');
const WIDTHS = { P: [480, 720, 1080], L: [800, 1200, 1800] };
const IDS = [3, 17, 48, 36, 20, 94, 75, 107, 148, 204, 196, 170, 262, 193, 224, 215, 279];

const JOBS = {
  ratchaburi: {
    out: path.join(GALLERY, 'ratchaburi-e-card', 'web'),
    items: IDS.map((id) => ({
      file: path.join(GALLERY, 'ratchaburi-e-card', 'Kae Ta Pre-Wedding Social-' + id + '.jpg'),
      name: 'rc-' + id,
    })),
  },
  // The four photos of the previous gallery (Git b573ee7). All are 2:3 portraits.
  legacy: {
    out: path.join(GALLERY, 'legacy-web'),
    items: ['DSC05603', 'DSC05675', 'DSC05711', 'DSC05730'].map((n) => ({
      file: path.join(GALLERY, n + '.JPG'),
      name: n.toLowerCase(),
    })),
  },
};

async function run(job) {
  fs.mkdirSync(job.out, { recursive: true });
  for (const item of job.items) {
    const meta = await sharp(item.file).metadata();
    const widths = WIDTHS[meta.width > meta.height ? 'L' : 'P'];
    for (const w of widths) {
      const base = path.join(job.out, item.name + '-' + w);
      await sharp(item.file).rotate().resize({ width: w }).webp({ quality: 78, effort: 4 }).toFile(base + '.webp');
      await sharp(item.file).rotate().resize({ width: w }).avif({ quality: 55, effort: 4 }).toFile(base + '.avif');
    }
    console.log('done', item.name);
  }
}

(async () => {
  const which = process.argv[2] || 'all';
  const names = which === 'all' ? Object.keys(JOBS) : [which];
  for (const n of names) {
    if (!JOBS[n]) throw new Error('unknown job: ' + n);
    await run(JOBS[n]);
  }
})();
