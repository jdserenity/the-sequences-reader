<script lang="ts">
  import { corpus } from '$lib/corpus';
</script>

<main class="toc">
  <h1>Contents</h1>
  {#if corpus.standalone.length}
    <h2>Front matter</h2>
    <ol>
      {#each corpus.standalone as item}
        <li><a href="/read/{item.id}">{item.title}</a></li>
      {/each}
    </ol>
  {/if}
  {#each corpus.books as book}
    <p class="book-title">{book.title}</p>
    {#each book.sequences as seq}
      <p class="sequence">{seq.title}</p>
      <ol>
        {#each seq.essays as essay}
          <li><a href="/read/{essay.id}">{essay.title}</a></li>
        {/each}
      </ol>
    {/each}
  {/each}
</main>
