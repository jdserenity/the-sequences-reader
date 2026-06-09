<script lang="ts">
  import { corpus } from '$lib/corpus';
  import { showRead } from '$lib/app.svelte';
</script>

<div class="toc">
  <h1>Contents</h1>
  {#if corpus.standalone.length}
    <h2>Front matter</h2>
    <ol>
      {#each corpus.standalone as item}
        <li><button type="button" class="linkish" onclick={() => showRead(item.id)}>{item.title}</button></li>
      {/each}
    </ol>
  {/if}
  {#each corpus.books as book}
    <p class="book-title">{book.title}</p>
    {#each book.sequences as seq}
      <p class="sequence">{seq.title}</p>
      <ol>
        {#each seq.essays as essay}
          <li><button type="button" class="linkish" onclick={() => showRead(essay.id)}>{essay.title}</button></li>
        {/each}
      </ol>
    {/each}
  {/each}
</div>
