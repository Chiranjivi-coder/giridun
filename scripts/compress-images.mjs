import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');

// Configuration per directory / image type
function getOptionsForFile(filePath) {
  const rel = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/');

  // Hero slideshow images
  if (rel.startsWith('hero/')) {
    return {
      maxWidth: 1920,
      maxHeight: 1200,
      quality: 78,
    };
  }

  // Goshala gallery photos
  if (rel.startsWith('goshala_images/')) {
    return {
      maxWidth: 1200,
      maxHeight: 1200,
      quality: 78,
    };
  }

  // Product photos and catalog
  if (rel.startsWith('products/')) {
    return {
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 78,
    };
  }

  // Root public images
  return {
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 78,
  };
}

async function getAllImageFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip videos folder
      if (entry.name === 'goshala_videos') continue;
      results = results.concat(await getAllImageFiles(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

async function compressImage(filePath) {
  const originalStats = fs.statSync(filePath);
  const originalSize = originalStats.size;
  const ext = path.extname(filePath).toLowerCase();
  const rel = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/');
  const opts = getOptionsForFile(filePath);

  try {
    // Read to memory buffer first to avoid Windows file locks
    const inputBuffer = fs.readFileSync(filePath);
    const pipeline = sharp(inputBuffer);
    const metadata = await pipeline.metadata();

    // Check if resize needed
    const needsResize =
      (metadata.width && metadata.width > opts.maxWidth) ||
      (metadata.height && metadata.height > opts.maxHeight);

    if (needsResize) {
      pipeline.resize({
        width: opts.maxWidth,
        height: opts.maxHeight,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    let buffer;
    if (ext === '.jpg' || ext === '.jpeg') {
      buffer = await pipeline
        .jpeg({
          quality: opts.quality,
          mozjpeg: true,
          chromaSubsampling: '4:2:0',
        })
        .toBuffer();
    } else if (ext === '.png') {
      // For logo.png, keep lossless high quality
      if (path.basename(filePath).toLowerCase() === 'logo.png') {
        buffer = await pipeline
          .png({ compressionLevel: 9, effort: 9 })
          .toBuffer();
      } else {
        buffer = await pipeline
          .png({
            quality: 80,
            compressionLevel: 9,
            effort: 8,
            palette: true,
          })
          .toBuffer();
      }
    } else if (ext === '.webp') {
      buffer = await pipeline
        .webp({ quality: opts.quality, effort: 6 })
        .toBuffer();
    }

    // Only overwrite if we achieved a smaller size
    if (buffer && buffer.length > 0 && buffer.length < originalSize) {
      fs.writeFileSync(filePath, buffer);
      const saved = originalSize - buffer.length;
      const pct = ((saved / originalSize) * 100).toFixed(1);
      console.log(
        `✓ [${rel}] ${(originalSize / 1024).toFixed(1)} KB -> ${(buffer.length / 1024).toFixed(1)} KB (-${pct}%)`
      );
      return {
        path: rel,
        originalSize,
        compressedSize: buffer.length,
        saved,
      };
    } else {
      console.log(
        `- [${rel}] Already optimal (${(originalSize / 1024).toFixed(1)} KB)`
      );
      return {
        path: rel,
        originalSize,
        compressedSize: originalSize,
        saved: 0,
      };
    }
  } catch (err) {
    console.error(`✗ Error processing ${rel}:`, err.message);
    return {
      path: rel,
      originalSize,
      compressedSize: originalSize,
      saved: 0,
      error: err.message,
    };
  }
}

async function main() {
  console.log('Starting image compression scan in public/ ...');
  const files = await getAllImageFiles(PUBLIC_DIR);
  console.log(`Found ${files.length} images to check.\n`);

  let totalOriginal = 0;
  let totalCompressed = 0;
  let compressedCount = 0;

  for (const file of files) {
    const res = await compressImage(file);
    totalOriginal += res.originalSize;
    totalCompressed += res.compressedSize;
    if (res.saved > 0) compressedCount++;
  }

  const totalSaved = totalOriginal - totalCompressed;
  const pctTotal = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : '0';

  console.log('\n=======================================');
  console.log(`Summary:`);
  console.log(`Images scanned: ${files.length}`);
  console.log(`Images newly compressed: ${compressedCount}`);
  console.log(`Current total size: ${(totalCompressed / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Data saved this run: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB (-${pctTotal}%)`);
  console.log('=======================================');
}

main().catch(console.error);
