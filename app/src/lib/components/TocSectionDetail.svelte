<script lang="ts">
  import { showRead } from '$lib/app.svelte';
  import { isEssayRead } from '$lib/progress';
  import { getBookForSection, type TocSectionKey } from '$lib/tocSections';

  let { sectionKey }: { sectionKey: TocSectionKey } = $props();

  const book = $derived(getBookForSection(sectionKey));
</script>

{#if book}
  <div class="toc-detail">
    <h2 class="toc-detail-title">{book.title}</h2>
    {#each book.sequences as seq}
      <p class="sequence">{seq.title}</p>
      <ol>
        {#each seq.essays as essay}
          <li><button type="button" class="linkish" class:read={isEssayRead(essay.id)} onclick={() => showRead(essay.id)}>{essay.title}</button></li>
        {/each}
      </ol>
    {/each}
  </div>
{/if}
