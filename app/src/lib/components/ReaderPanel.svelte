<script lang="ts">
  import { marked } from 'marked';
  import { getEssay, getEssayBody, getNeighbors } from '$lib/corpus';
  import { attachScrollTracking } from '$lib/progress';
  import { showRead } from '$lib/app.svelte';

  let { essayId }: { essayId: string } = $props();
  let scrollEl: HTMLDivElement | undefined = $state();

  const essay = $derived(getEssay(essayId));
  const html = $derived.by(() => {
    const body = getEssayBody(essayId);
    return body !== undefined ? (marked.parse(body) as string) : '';
  });
  const neighbors = $derived(getNeighbors(essayId));
  const prev = $derived(neighbors.prev);
  const next = $derived(neighbors.next);

  $effect(() => {
    const id = essayId;
    const el = scrollEl;
    if (!el) return;
    return attachScrollTracking(id, el);
  });
</script>

<svelte:head>
  {#if essay}<title>{essay.title} · The Sequences</title>{/if}
</svelte:head>

<div class="panel-scroll read-panel" bind:this={scrollEl}>
  {#if essay}
    <main>
      <p class="muted">
        {#if essay.sequence_title}{essay.sequence_title} · {/if}
        {#if essay.book_title}{essay.book_title}{/if}
      </p>
      <article class="prose">
        {@html html}
      </article>
      <nav class="essay-nav">
        {#if prev}<button type="button" class="linkish" onclick={() => showRead(prev.id)}>← {prev.title}</button>{/if}
        {#if next}<button type="button" class="linkish" onclick={() => showRead(next.id)}>{next.title} →</button>{/if}
      </nav>
      <p class="muted" style="font-size: 0.85rem;">
        <a href={essay.source_url} rel="noopener">Original</a>
      </p>
    </main>
  {/if}
</div>
