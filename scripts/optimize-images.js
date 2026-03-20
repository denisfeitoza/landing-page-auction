#!/usr/bin/env node
/**
 * Image Optimization Script — GoldPrime Site
 * Converts JPG/PNG frames to WebP for better performance on slow connections (3mb).
 *
 * Rules:
 * - frame_000 (initial) and frame_225 (final): WebP quality 90, full resolution — never downscaled
 * - Intermediate frames (006-224): WebP quality 78 (desktop) + quality 68 / max 540px (mobile)
 * - Auction images (PNG): WebP quality 85
 * - run: node scripts/optimize-images.js
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, basename, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const FRAMES_DIR = join(ROOT, 'public/iphone-sequence');
const AUCTION_DIR = join(ROOT, 'public/auction');

let totalSaved = 0;
let filesProcessed = 0;

function formatBytes(b) {
    if (b < 1024) return `${b}B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)}KB`;
    return `${(b / 1024 / 1024).toFixed(2)}MB`;
}

async function getSize(filePath) {
    try {
        const s = await stat(filePath);
        return s.size;
    } catch {
        return 0;
    }
}

async function convertFrame(srcPath, dstPath, options) {
    const originalSize = await getSize(srcPath);
    await sharp(srcPath)
        .webp(options)
        .toFile(dstPath);
    const newSize = await getSize(dstPath);
    const saved = originalSize - newSize;
    totalSaved += saved;
    filesProcessed++;
    return { originalSize, newSize, saved };
}

async function processFrames() {
    console.log('\n📸 Processing iphone-sequence frames...');

    const files = (await readdir(FRAMES_DIR))
        .filter(f => f.endsWith('.jpg') && f.startsWith('frame_'))
        .sort();

    let idx = 0;
    for (const file of files) {
        idx++;
        const srcPath = join(FRAMES_DIR, file);
        const baseName = basename(file, '.jpg');

        // Parse frame number: e.g. frame_000 => 0
        const frameNum = parseInt(baseName.replace('frame_', ''), 10);

        const dstDesktop = join(FRAMES_DIR, `${baseName}.webp`);
        const dstMobile = join(FRAMES_DIR, `${baseName}-mobile.webp`);

        // Determine quality strategy
        const isKeyFrame = frameNum === 0 || frameNum === 225;

        if (isKeyFrame) {
            // KEY FRAMES: full quality WebP, no resize, no mobile version
            // (frame_000 = initial view, frame_225 = final view — must stay pristine)
            const r = await convertFrame(srcPath, dstDesktop, { quality: 90, effort: 4 });
            console.log(
                `  ✅ [KEY] ${file} → ${baseName}.webp — ${formatBytes(r.originalSize)} → ${formatBytes(r.newSize)} (saved ${formatBytes(r.saved)})`
            );
        } else {
            // INTERMEDIATE FRAMES: desktop WebP + mobile WebP (scaled)
            // Desktop version
            const rDesktop = await convertFrame(srcPath, dstDesktop, { quality: 78, effort: 4 });

            // Mobile version (max 540px wide, lower quality)
            const originalSize = await getSize(srcPath);
            await sharp(srcPath)
                .resize({ width: 540, withoutEnlargement: true })
                .webp({ quality: 68, effort: 4 })
                .toFile(dstMobile);
            const mobileSize = await getSize(dstMobile);
            totalSaved += (originalSize - mobileSize);

            if (idx % 20 === 0 || idx <= 5) {
                console.log(
                    `  🖼  [${idx}/${files.length}] ${file} → desktop:${formatBytes(rDesktop.newSize)} | mobile:${formatBytes(mobileSize)}`
                );
            }
        }
    }

    console.log(`\n  Done processing ${files.length} frames.`);
}

async function processAuctionImages() {
    console.log('\n🏷️  Processing auction images...');

    const files = (await readdir(AUCTION_DIR))
        .filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

    for (const file of files) {
        const srcPath = join(AUCTION_DIR, file);
        const ext = extname(file);
        const baseName = basename(file, ext);
        const dstPath = join(AUCTION_DIR, `${baseName}.webp`);

        const r = await convertFrame(srcPath, dstPath, { quality: 85, effort: 4 });
        console.log(
            `  ✅ ${file} → ${baseName}.webp — ${formatBytes(r.originalSize)} → ${formatBytes(r.newSize)} (saved ${formatBytes(r.saved)})`
        );
    }
}

async function processOtherPublicImages() {
    console.log('\n📁 Processing other public images...');

    const publicDir = join(ROOT, 'public');
    const files = (await readdir(publicDir))
        .filter(f => (f.endsWith('.jpg') || f.endsWith('.jpeg')) && !f.startsWith('.'));

    for (const file of files) {
        const srcPath = join(publicDir, file);
        const ext = extname(file);
        const baseName = basename(file, ext);
        const dstPath = join(publicDir, `${baseName}.webp`);

        const r = await convertFrame(srcPath, dstPath, { quality: 82, effort: 4 });
        console.log(
            `  ✅ ${file} → ${baseName}.webp — ${formatBytes(r.originalSize)} → ${formatBytes(r.newSize)} (saved ${formatBytes(r.saved)})`
        );
    }
}

async function main() {
    console.log('🚀 GoldPrime — Image Optimizer (Sharp)');
    console.log('=========================================');

    const startTime = Date.now();

    await processFrames();
    await processAuctionImages();
    await processOtherPublicImages();

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n=========================================');
    console.log(`✅ Done! Processed ${filesProcessed} files in ${elapsed}s`);
    console.log(`💾 Total disk space saved: ${formatBytes(totalSaved)}`);
    console.log('=========================================\n');
}

main().catch(console.error);
