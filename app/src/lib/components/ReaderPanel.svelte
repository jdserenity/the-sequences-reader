<script lang="ts">
  import { marked } from 'marked';
  import { getEssayBody } from '$lib/corpus';
  import { attachScrollTracking } from '$lib/progress';
  import { showRead } from '$lib/app.svelte';
  import { getEssayReaderMeta, scrollToHashInPanel } from '$lib/reader-nav';

  let { essayId }: { essayId: string } = $props();
  let scrollEl: HTMLDivElement | undefined = $state();

  const meta = $derived(getEssayReaderMeta(essayId));
  const html = $derived.by(() => {
    const body = getEssayBody(essayId);
    return body !== undefined ? (marked.parse(body) as string) : '';
  });

  function onProseClick(e: MouseEvent): void {
    const a = (e.target as HTMLElement).closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href?.startsWith('#')) return;
    e.preventDefault();
    e.stopPropagation();
    scrollToHashInPanel(scrollEl, href);
  }

  $effect(() => {
    const id = essayId;
    const el = scrollEl;
    if (!el) return;
    return attachScrollTracking(id, el);
  });
</script>

<svelte:head>
  {#if meta}<title>{meta.title} · The Sequences</title>{/if}
</svelte:head>

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
              <button type="button" aria-label="Next essay: {meta.nextTitle}" onclick={() => showRead(meta.nextId)}>
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
