<script lang="ts">
  import { corpus } from '$lib/corpus';
  const first = corpus.essays[0];
</script>

<main>
  <h1>The Sequences</h1>
  <p class="muted">Personal offline reader. {corpus.essays.length} essays.</p>
  <p><a href="/toc">Table of contents</a></p>
  {#if first}
    <p><a href="/read/{first.id}">Start reading →</a></p>
  {/if}
</main>
