<script lang="ts">
  import { onMount } from 'svelte';
  import AppShell from '$lib/components/AppShell.svelte';
  import { initApp } from '$lib/app.svelte';

  let appReady = $state(false);

  onMount(async () => {
    await initApp();
    appReady = true;
  });
</script>

{#if appReady}
  <AppShell />
{/if}
