<script lang="ts">
  import { app, showRead, showToc } from '$lib/app.svelte';
  import { getScroll } from '$lib/progress';

  function onReadClick(): void {
    if (app.panel === 'read') {
      const el = document.querySelector<HTMLElement>('.read-panel');
      if (el) el.scrollTop = getScroll(app.essayId);
    } else showRead();
  }
</script>

<nav class="bottom-bar" aria-label="Main">
  <button type="button" class:active={app.panel === 'read'} aria-label="Resume reading" aria-current={app.panel === 'read' ? 'page' : undefined} onclick={onReadClick}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  </button>
  <button type="button" class:active={app.panel === 'toc'} aria-label="Table of contents" aria-current={app.panel === 'toc' ? 'page' : undefined} onclick={showToc}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  </button>
</nav>
