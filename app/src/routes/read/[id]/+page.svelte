<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.essay.title} · The Sequences</title>
</svelte:head>

<main>
  <p class="muted">
    {#if data.essay.sequence_title}{data.essay.sequence_title} · {/if}
    {#if data.essay.book_title}{data.essay.book_title}{/if}
  </p>
  <article class="prose">
    {@html data.html}
  </article>
  <nav class="bar" style="border: none; padding-left: 0;">
    {#if data.prev}<a href="/read/{data.prev.id}">← {data.prev.title}</a>{/if}
    <a href="/toc">Contents</a>
    {#if data.next}<a href="/read/{data.next.id}">{data.next.title} →</a>{/if}
  </nav>
  <p class="muted" style="font-size: 0.85rem;">
    <a href={data.essay.source_url} rel="noopener">Original</a>
  </p>
</main>
