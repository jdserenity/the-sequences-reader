export const SPLASH_DURATION_MS = 2600;
export const SPLASH_DURATION_REDUCED_MS = 900;

export type InkBlob = {
  ox: number;
  oy: number;
  angle: number;
  speed: number;
  scale: number;
  phase: number;
  drift: number;
};

export const INK = { core: '#141414', edge: '#1a1a1a', wisp: '#0d5c55' };
export const PAPER = '#faf9f7';

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function splashProgress(elapsed: number, duration: number): number {
  return Math.min(1, Math.max(0, elapsed / duration));
}

/** Overlay stays opaque through the bloom; dissolves in the last ~28% of the timeline. */
export function overlayOpacity(progress: number): number {
  if (progress < 0.72) return 1;
  return 1 - easeOutCubic((progress - 0.72) / 0.28);
}

/** Ink expansion 0→1 over the first ~62% of the splash. */
export function inkExpansion(progress: number): number {
  return easeOutCubic(Math.min(1, progress / 0.62));
}

export function createInkBlobs(count: number): InkBlob[] {
  const blobs: InkBlob[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const dist = 0.04 + Math.random() * 0.1;
    blobs.push({
      ox: 0.5 + Math.cos(angle) * dist,
      oy: 0.5 + Math.sin(angle) * dist,
      angle,
      speed: 0.35 + Math.random() * 0.45,
      scale: 0.75 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      drift: 0.08 + Math.random() * 0.14,
    });
  }
  return blobs;
}

export function blobCenter(blob: InkBlob, expansion: number, w: number, h: number): { x: number; y: number } {
  const drift = blob.drift * expansion;
  const x = (blob.ox + Math.cos(blob.angle + blob.phase) * drift * 0.35) * w;
  const y = (blob.oy + Math.sin(blob.angle + blob.phase) * drift * 0.35) * h;
  return { x, y };
}

export function blobRadius(blob: InkBlob, expansion: number, maxDim: number): number {
  return maxDim * (0.12 + blob.scale * 0.88) * expansion * blob.speed;
}

export function inkWashAlpha(progress: number): number {
  const bloom = easeInOutCubic(Math.min(1, progress / 0.55));
  const hold = progress < 0.72 ? 1 : 1 - (progress - 0.72) / 0.28;
  return bloom * hold * 0.92;
}

export function blobCountForWidth(width: number): number {
  if (width < 480) return 6;
  if (width < 900) return 8;
  return 10;
}
