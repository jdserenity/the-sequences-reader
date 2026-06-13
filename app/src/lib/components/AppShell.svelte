<script lang="ts">
  import { app, showRead, showToc, trackOffset } from '$lib/app.svelte';
  import { isSwipeLeft, isSwipeRight, touchGestureLock, type Point } from '$lib/swipe';
  import BottomNav from './BottomNav.svelte';
  import ReaderPanel from './ReaderPanel.svelte';
  import TocPanel from './TocPanel.svelte';

  let touchStart: Point | null = null;
  let touchLock: ReturnType<typeof touchGestureLock> = null;
  const offset = $derived(trackOffset(app.panel));

  function onTouchStart(e: TouchEvent): void {
    const t = e.touches[0];
    if (!t) return;
    touchStart = { x: t.clientX, y: t.clientY };
    touchLock = null;
  }

  function onTouchMove(e: TouchEvent): void {
    if (!touchStart || touchLock) return;
    const t = e.touches[0];
    if (!t) return;
    touchLock = touchGestureLock(touchStart, { x: t.clientX, y: t.clientY });
  }

  function onTouchEnd(e: TouchEvent): void {
    if (!touchStart || touchLock !== 'horizontal') {
      touchStart = null;
      touchLock = null;
      return;
    }
    const t = e.changedTouches[0];
    if (!t) return;
    const end = { x: t.clientX, y: t.clientY };
    if (app.panel === 'read' && isSwipeLeft(touchStart, end)) showToc();
    else if (app.panel === 'toc' && isSwipeRight(touchStart, end)) showRead();
    touchStart = null;
    touchLock = null;
  }
</script>

<div class="app" role="application" ontouchstart={onTouchStart} ontouchmove={onTouchMove} ontouchend={onTouchEnd}>
  <div class="app-viewport">
    <div class="app-track" style:transform="translateX({offset})">
      <section class="app-panel" aria-hidden={app.panel !== 'read'}>
        <ReaderPanel essayId={app.essayId} />
      </section>
      <section class="app-panel" aria-hidden={app.panel !== 'toc'}>
        <TocPanel />
      </section>
    </div>
  </div>
  <BottomNav />
</div>
