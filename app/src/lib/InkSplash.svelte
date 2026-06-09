<script lang="ts">
  import { onMount } from 'svelte';
  import {
    blobCenter,
    blobCountForWidth,
    blobRadius,
    createInkBlobs,
    inkExpansion,
    inkWashAlpha,
    overlayOpacity,
    PAPER,
    splashProgress,
    SPLASH_DURATION_MS,
    SPLASH_DURATION_REDUCED_MS,
    type InkBlob,
  } from './ink-bloom';

  let { oncomplete }: { oncomplete: () => void } = $props();

  let root: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let opacity = $state(1);

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? SPLASH_DURATION_REDUCED_MS : SPLASH_DURATION_MS;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) { oncomplete(); return; }

    let w = 0, h = 0, dpr = 1, blobs: InkBlob[] = [], raf = 0;
    const start = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = root.clientWidth;
      h = root.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      blobs = createInkBlobs(blobCountForWidth(w));
    };

    const drawBlob = (blob: InkBlob, expansion: number, wash: number) => {
      const { x, y } = blobCenter(blob, expansion, w, h);
      const r = blobRadius(blob, expansion, Math.max(w, h));
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(20, 20, 20, ${0.95 * wash})`);
      g.addColorStop(0.35, `rgba(26, 26, 26, ${0.7 * wash})`);
      g.addColorStop(0.72, `rgba(13, 92, 85, ${0.22 * wash})`);
      g.addColorStop(1, 'rgba(250, 249, 247, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = splashProgress(elapsed, duration);
      const expansion = inkExpansion(progress);
      const wash = inkWashAlpha(progress);
      opacity = overlayOpacity(progress);

      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, w, h);

      if (wash > 0.01) {
        ctx.filter = `blur(${6 + expansion * 10}px)`;
        ctx.globalCompositeOperation = 'multiply';
        for (const blob of blobs) drawBlob(blob, expansion, wash);

        const cx = w * 0.5, cy = h * 0.5;
        const coreR = Math.max(w, h) * (0.08 + expansion * 0.42);
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
        core.addColorStop(0, `rgba(10, 10, 10, ${0.55 * wash})`);
        core.addColorStop(0.5, `rgba(26, 26, 26, ${0.35 * wash})`);
        core.addColorStop(1, 'rgba(250, 249, 247, 0)');
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
        ctx.fill();

        ctx.filter = `blur(${14 + expansion * 18}px)`;
        ctx.globalCompositeOperation = 'source-over';
        for (let i = 0; i < blobs.length; i++) {
          const b = blobs[i];
          const feather = blobRadius(b, expansion * 0.85, Math.max(w, h)) * 1.15;
          const { x, y } = blobCenter(b, expansion, w, h);
          const edge = ctx.createRadialGradient(x, y, feather * 0.55, x, y, feather);
          edge.addColorStop(0, 'rgba(250, 249, 247, 0)');
          edge.addColorStop(0.65, `rgba(13, 92, 85, ${0.08 * wash})`);
          edge.addColorStop(1, `rgba(26, 26, 26, ${0.12 * wash})`);
          ctx.fillStyle = edge;
          ctx.beginPath();
          ctx.arc(x, y, feather, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.filter = 'none';
      if (progress < 1) raf = requestAnimationFrame(frame);
      else { opacity = 0; oncomplete(); }
    };

    resize();
    raf = requestAnimationFrame(frame);
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  });
</script>

<div
  class="ink-splash"
  bind:this={root}
  style:opacity
  style:pointer-events={opacity > 0 ? 'auto' : 'none'}
  aria-hidden="true"
>
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .ink-splash {
    position: fixed;
    inset: 0;
    z-index: 10000;
    width: 100%;
    height: 100dvh;
    background: #faf9f7;
    overflow: hidden;
    touch-action: none;
  }
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
