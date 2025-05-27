import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const inputDir = path.resolve('public/images/hi-res');
const outputDir = path.resolve('public/images/lqip');

try {
  const files = await fs.readdir(inputDir);

  await fs.mkdir(outputDir, { recursive: true });

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    const outputPath = path.join(outputDir, `${baseName}-lqip.webp`);
    try {
      await sharp(inputPath)
        .resize({ width: 128 })
        .blur(1)
        .webp({quality: 80})
        .toFile(outputPath);
    } catch (e) {
      if (e instanceof Error) console.error(`Error in file ${file}:`, e.message);
    }
  }
} catch (e) {
  if (e instanceof Error) console.error('Error reading folder:', e.message);
}

