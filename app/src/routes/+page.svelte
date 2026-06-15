<script lang="ts">
  import { onMount } from 'svelte';
  import AppShell from '$lib/components/AppShell.svelte';
  import { initApp } from '$lib/app.svelte';

  onMount(() => { void initApp(); });
</script>

<AppShell />
