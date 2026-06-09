<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import InkSplash from '$lib/InkSplash.svelte';
  import {
    getNavigationType,
    hasSeenSplash,
    markSplashSeen,
    shouldPlaySplash,
  } from '$lib/splash-gate';

  let { children } = $props();
  let splashState = $state<'pending' | 'playing' | 'done'>('pending');

  onMount(() => {
    const navType = getNavigationType(performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]);
    splashState = shouldPlaySplash(navType, hasSeenSplash(localStorage)) ? 'playing' : 'done';
  });

  const finishSplash = () => {
    splashState = 'done';
    markSplashSeen(localStorage);
  };
</script>

{#if splashState === 'playing'}
  <InkSplash oncomplete={finishSplash} />
{/if}

<div class="shell" class:obscured={splashState !== 'done'}>
  {@render children()}
</div>

<style>
  .obscured { visibility: hidden; }
</style>
