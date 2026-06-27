<script lang="ts">
  import { marked } from 'marked';
  import { getEssayBody } from '$lib/corpus';
  import { attachScrollTracking, addHighlight, getHighlightsForEssay, markEssayRead } from '$lib/progress';
  import { showRead } from '$lib/app.svelte';
  import { essayScrollFraction } from '$lib/essay-scroll';
  import { getEssayReaderMeta, scrollToHashInPanel } from '$lib/reader-nav';
  import { applyHighlightMarks, getRangeFromSelection, getSelectionAnchor, type TextRange } from '$lib/highlight-dom';
  import { highlightState } from '$lib/progress.svelte';

  let { essayId }: { essayId: string } = $props();
  let scrollEl: HTMLDivElement | undefined = $state();
  let proseEl: HTMLElement | undefined = $state();
  let scrollProgress = $state(0);
  let pendingHighlight = $state<TextRange | null>(null);
  let highlightToolbar = $state<{ top: number; left: number } | null>(null);

  const meta = $derived(getEssayReaderMeta(essayId));
  const html = $derived.by(() => {
    const body = getEssayBody(essayId);
    return body !== undefined ? (marked.parse(body) as string) : '';
  });

  function updateScrollProgress(): void {
    if (!scrollEl) return;
    scrollProgress = essayScrollFraction(scrollEl.scrollTop, scrollEl.scrollHeight, scrollEl.clientHeight);
  }

  function dismissHighlightToolbar(): void {
    pendingHighlight = null;
    highlightToolbar = null;
  }

  function onProseClick(e: MouseEvent): void {
    const a = (e.target as HTMLElement).closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href?.startsWith('#')) return;
    e.preventDefault();
    e.stopPropagation();
    dismissHighlightToolbar();
    scrollToHashInPanel(scrollEl, href);
  }

  function paintHighlights(): void {
    if (!proseEl) return;
    proseEl.innerHTML = html;
    const marks = getHighlightsForEssay(essayId);
    if (!marks.length) return;
    applyHighlightMarks(proseEl, marks);
  }

  function onProseMouseUp(): void {
    if (!proseEl) return;
    const range = getRangeFromSelection(proseEl);
    const anchor = getSelectionAnchor(proseEl);
    if (!range || !anchor) { dismissHighlightToolbar(); return; }
    pendingHighlight = range;
    highlightToolbar = anchor;
  }

  function onConfirmHighlight(): void {
    if (!pendingHighlight) return;
    if (!addHighlight(essayId, pendingHighlight)) { dismissHighlightToolbar(); return; }
    window.getSelection()?.removeAllRanges();
    dismissHighlightToolbar();
    paintHighlights();
  }

  function onMarkReadAndNext(nextId: string): void {
    markEssayRead(essayId);
    showRead(nextId);
  }

  $effect(() => {
    const id = essayId;
    const el = scrollEl;
    dismissHighlightToolbar();
    if (!el) return;
    const detach = attachScrollTracking(id, el);
    const onScroll = () => { updateScrollProgress(); dismissHighlightToolbar(); };
    el.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(() => updateScrollProgress());
    return () => {
      el.removeEventListener('scroll', onScroll);
      detach();
    };
  });

  $effect(() => {
    const _id = essayId;
    const _html = html;
    highlightState.epoch;
    const el = proseEl;
    if (!el) return;
    queueMicrotask(() => paintHighlights());
  });
</script>

<svelte:head>
  {#if meta}<title>{meta.title} · The Sequences Reader</title>{/if}
</svelte:head>

<svelte:window onmousedown={(e) => {
  const t = e.target as HTMLElement;
  if (t.closest('.prose') || t.closest('.highlight-toolbar')) return;
  dismissHighlightToolbar();
}} />

<div class="read-panel-wrap">
  <div class="essay-progress" aria-hidden="true">
    <div class="essay-progress-fill" style:transform="scaleX({scrollProgress})"></div>
  </div>
  {#if highlightToolbar && pendingHighlight}
    <div class="highlight-toolbar" style:top="{highlightToolbar.top}px" style:left="{highlightToolbar.left}px">
      <button type="button" onclick={onConfirmHighlight}>Highlight</button>
    </div>
  {/if}
  <div class="panel-scroll read-panel" bind:this={scrollEl}>
    {#if meta}
      <main>
        <h1 class="essay-title">{meta.title}</h1>
        <article class="prose" bind:this={proseEl} onclickcapture={onProseClick} onmouseup={onProseMouseUp}>
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
