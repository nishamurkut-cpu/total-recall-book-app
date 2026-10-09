import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const toCrc = Buffer.concat([typeBuf, data]);
  const crcVal = crc32(toCrc);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);

  return Buffer.concat([lenBuf, toCrc, crcBuf]);
}

function createPng(width, height, isMaskable = false) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8 bits per channel
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw image data with row filter 0
  const rowStride = width * 4;
  const rawData = Buffer.alloc(height * (1 + rowStride));

  const cx = width / 2;
  const cy = height / 2;
  const rOuter = (width / 2) * (isMaskable ? 0.72 : 0.88);
  const rInner = rOuter * 0.92;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + rowStride);
    rawData[rowOffset] = 0; // Filter 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Default background: Slate 950 (#090d16)
      let r = 9, g = 13, b = 22, a = 255;

      // Outer glow / gradient background
      const bgGrad = Math.min(1, Math.max(0, dist / (width * 0.7)));
      r = Math.round(15 + (1 - bgGrad) * 15);
      g = Math.round(23 + (1 - bgGrad) * 15);
      b = Math.round(42 + (1 - bgGrad) * 18);

      // Decorative rounded badge shield
      const cornerR = width * 0.18;
      // Badge box inside safe area
      const badgePad = isMaskable ? width * 0.18 : width * 0.08;
      const bx = Math.abs(x - cx);
      const by = Math.abs(y - cy);
      const bMaxX = width / 2 - badgePad;
      const bMaxY = height / 2 - badgePad;

      // Inside badge box?
      const inBox = (bx <= bMaxX && by <= bMaxY - cornerR) ||
                    (bx <= bMaxX - cornerR && by <= bMaxY) ||
                    (Math.hypot(bx - (bMaxX - cornerR), by - (bMaxY - cornerR)) <= cornerR);

      // Border outline
      const isBorder = inBox && (
        bx >= bMaxX - 6 || by >= bMaxY - 6 ||
        (bx > bMaxX - cornerR && by > bMaxY - cornerR && Math.hypot(bx - (bMaxX - cornerR), by - (bMaxY - cornerR)) >= cornerR - 6)
      );

      if (inBox) {
        // Deep indigo / navy card interior
        r = 15; g = 23; b = 42;
      }

      if (isBorder) {
        // Golden amber border
        r = 245; g = 158; b = 11;
      }

      // Medical cross in center
      const crossW = width * (isMaskable ? 0.09 : 0.12);
      const crossH = width * (isMaskable ? 0.32 : 0.40);
      const inVerticalBar = Math.abs(dx) <= crossW && Math.abs(dy) <= crossH;
      const inHorizontalBar = Math.abs(dy) <= crossW && Math.abs(dx) <= crossH;

      if (inVerticalBar || inHorizontalBar) {
        // Vibrant Medical Cross - Emerald / Teal + Amber accents
        if (Math.abs(dx) <= crossW * 0.4 || Math.abs(dy) <= crossW * 0.4) {
          // Center core: bright amber gold
          r = 251; g = 191; b = 36;
        } else {
          // Emerald medical teal
          r = 16; g = 185; b = 129;
        }
      }

      // Star / Caduceus dots at 4 corners of cross
      const dotDist = crossH * 0.75;
      if (
        (Math.hypot(dx - dotDist, dy - dotDist) < width * 0.025) ||
        (Math.hypot(dx + dotDist, dy - dotDist) < width * 0.025) ||
        (Math.hypot(dx - dotDist, dy + dotDist) < width * 0.025) ||
        (Math.hypot(dx + dotDist, dy + dotDist) < width * 0.025)
      ) {
        r = 245; g = 158; b = 11;
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, false));
fs.writeFileSync(path.join(publicDir, 'favicon.png'), createPng(64, 64, false));

console.log('Successfully generated all PWA icons!');
