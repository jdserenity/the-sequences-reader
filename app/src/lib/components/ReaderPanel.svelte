<script lang="ts">
  import { marked } from 'marked';
  import { getEssayBody } from '$lib/corpus';
  import { attachScrollTracking, markEssayRead } from '$lib/progress';
  import { showRead } from '$lib/app.svelte';
  import { essayScrollFraction } from '$lib/essay-scroll';
  import { getEssayReaderMeta, scrollToHashInPanel } from '$lib/reader-nav';

  let { essayId }: { essayId: string } = $props();
  let scrollEl: HTMLDivElement | undefined = $state();
  let scrollProgress = $state(0);

  const meta = $derived(getEssayReaderMeta(essayId));
  const html = $derived.by(() => {
    const body = getEssayBody(essayId);
    return body !== undefined ? (marked.parse(body) as string) : '';
  });

  function updateScrollProgress(): void {
    if (!scrollEl) return;
    scrollProgress = essayScrollFraction(scrollEl.scrollTop, scrollEl.scrollHeight, scrollEl.clientHeight);
  }

  function onProseClick(e: MouseEvent): void {
    const a = (e.target as HTMLElement).closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href?.startsWith('#')) return;
    e.preventDefault();
    e.stopPropagation();
    scrollToHashInPanel(scrollEl, href);
  }

  function onMarkReadAndNext(nextId: string): void {
    markEssayRead(essayId);
    showRead(nextId);
  }

  $effect(() => {
    const id = essayId;
    const el = scrollEl;
    if (!el) return;
    const detach = attachScrollTracking(id, el);
    const onScroll = () => updateScrollProgress();
    el.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(() => updateScrollProgress());
    return () => {
      el.removeEventListener('scroll', onScroll);
      detach();
    };
  });
</script>

<svelte:head>
  {#if meta}<title>{meta.title} · The Sequences Reader</title>{/if}
</svelte:head>

<div class="read-panel-wrap">
  <div class="essay-progress" aria-hidden="true">
    <div class="essay-progress-fill" style:transform="scaleX({scrollProgress})"></div>
  </div>
  <div class="panel-scroll read-panel" bind:this={scrollEl}>
    {#if meta}
      <main>
        <h1 class="essay-title">{meta.title}</h1>
        <article class="prose" data-source-url={meta.sourceUrl} onclickcapture={onProseClick}>
          {@html html}
        </article>
        <nav class="essay-nav" aria-label="Essay navigation">
          <div class="essay-nav-icons">
            {#if meta.prevId}
              <div class="essay-nav-item">
                <button type="button" aria-label="Previous essay: {meta.prevTitle}" onclick={() => showRead(meta.prevId)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                  </svg>
                </button>
                {#if meta.prevTitle}<span class="essay-nav-label">{meta.prevTitle}</span>{/if}
              </div>
            {/if}
            {#if meta.nextId}
              <div class="essay-nav-item">
                <button type="button" aria-label="Mark read and continue: {meta.nextTitle}" onclick={() => onMarkReadAndNext(meta.nextId!)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </button>
                {#if meta.nextTitle}<span class="essay-nav-label">{meta.nextTitle}</span>{/if}
              </div>
            {/if}
          </div>
          {#if meta.bookTitle}
            <hr class="essay-nav-rule" />
            <p class="essay-book-label">{meta.bookTitle}</p>
          {/if}
        </nav>
      </main>
    {/if}
  </div>
</div>
