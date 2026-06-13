<script lang="ts">
  import { onMount } from 'svelte';
  import { corpusWordCount, countableEssayCount, tocFrontMatter, tocReference } from '$lib/corpus';
  import { showRead } from '$lib/app.svelte';
  import { getReadStats, getReadGeneration, isEssayRead } from '$lib/progress';
  import {
    delay,
    TOC_DETAIL_ENTER_MS,
    TOC_DETAIL_ENTER_SLOW_MS,
    TOC_DETAIL_EXIT_MS,
    TOC_DETAIL_EXIT_MULTI_MS,
    TOC_FIRST_SPLIT_MS,
    TOC_VIGNETTE_OUT_MS,
  } from '$lib/tocAnim';
  import { tocBookSections, type TocSectionKey } from '$lib/tocSections';
  import { canOpenSection, isAtSectionLimit, MAX_DETAIL_TILES_DESKTOP, toggleOpenSection } from '$lib/tocTiles';
  import { formatWordCount } from '$lib/wordCount';
  import TocSectionDetail from './TocSectionDetail.svelte';

  const MOBILE_MAX = 767;

  let openSections = $state<TocSectionKey[]>([]);
  let exitingKeys = $state<TocSectionKey[]>([]);
  let enteringKeys = $state<TocSectionKey[]>([]);
  let enteringSlow = $state(false);
  let layoutSplit = $state(false);
  let showVignette = $state(false);
  let firstSplitAnim = $state(false);
  let trackShifting = $state(false);
  let animating = $state(false);
  let isMobile = $state(true);

  const readGeneration = $derived(getReadGeneration());
  const stats = $derived.by(() => { readGeneration; return getReadStats(countableEssayCount); });
  const detailKeys = $derived.by(() => {
    const keys = [...openSections];
    for (const k of exitingKeys) if (!keys.includes(k)) keys.push(k);
    return keys;
  });
  const trackGrouped = $derived(openSections.length > 0 || exitingKeys.length > 0);
  const atLimit = $derived(isAtSectionLimit(openSections, isMobile));

  onMount(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const sync = () => {
      isMobile = mq.matches;
      if (isMobile && openSections.length > 1) openSections = openSections.slice(-1);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  });

  async function openSection(key: TocSectionKey): Promise<void> {
    const firstOpen = openSections.length === 0;
    const slowEnter = openSections.length >= 1;
    if (firstOpen) {
      firstSplitAnim = true;
      layoutSplit = true;
      showVignette = true;
      await delay(TOC_FIRST_SPLIT_MS);
      firstSplitAnim = false;
    }
    openSections = toggleOpenSection(openSections, key, isMobile);
    enteringSlow = slowEnter;
    enteringKeys = [key];
    await delay(slowEnter ? TOC_DETAIL_ENTER_SLOW_MS : TOC_DETAIL_ENTER_MS);
    enteringKeys = [];
    enteringSlow = false;
  }

  async function closeSection(key: TocSectionKey): Promise<void> {
    const lastClosing = openSections.length === 1;
    const multiClose = openSections.length >= 2;
    exitingKeys = [key];
    openSections = openSections.filter((k) => k !== key);
    if (multiClose) trackShifting = true;
    if (lastClosing) layoutSplit = false;
    await delay(multiClose ? TOC_DETAIL_EXIT_MULTI_MS : TOC_DETAIL_EXIT_MS);
    exitingKeys = [];
    trackShifting = false;
    if (lastClosing) {
      showVignette = false;
      await delay(TOC_VIGNETTE_OUT_MS);
    }
  }

  async function onSectionClick(key: TocSectionKey): Promise<void> {
    if (animating) return;
    if (openSections.includes(key)) {
      animating = true;
      try { await closeSection(key); }
      finally { animating = false; }
      return;
    }
    if (!canOpenSection(openSections, key, isMobile)) return;
    animating = true;
    try { await openSection(key); }
    finally { animating = false; }
  }
</script>

<div class="toc-stage">
  <div class="toc-tiles-track" class:grouped={trackGrouped} class:shifting={trackShifting}>
    <div
      class="toc-pebble toc-pebble-toc"
      class:layout-split={layoutSplit}
      class:vignette={showVignette}
      class:first-split={firstSplitAnim}
    >
      <div class="toc-pebble-scroll">
        <div class="toc">
          <h1 class="toc-primary">The Sequences</h1>
          <p class="toc-secondary">Table of Contents</p>
          <p class="toc-stats">
            <span class="toc-stat">{stats.read} essays read</span>
            <span class="toc-stat-sep">·</span>
            <span class="toc-stat">{stats.percent.toFixed(1)}% of {stats.total}</span>
            <span class="toc-stat-sep">·</span>
            <span class="toc-stat">{formatWordCount(corpusWordCount)}</span>
          </p>
          <nav class="toc-sections" aria-label="Sections">
            {#each tocFrontMatter as item (item.id)}
              <div class="toc-direct-link">
                <button type="button" class="linkish" class:read={readGeneration >= 0 && isEssayRead(item.id)} onclick={() => showRead(item.id)}>{item.title}</button>
              </div>
            {/each}
            {#each tocBookSections as section (section.key)}
              {@const open = openSections.includes(section.key)}
              {@const blocked = atLimit && !open}
              <button
                type="button"
                class="toc-section-btn"
                class:open
                class:blocked
                disabled={blocked || animating}
                aria-disabled={blocked || animating}
                title={blocked ? `Close a section first (${MAX_DETAIL_TILES_DESKTOP} open)` : undefined}
                onclick={() => onSectionClick(section.key)}
              >{section.title}</button>
            {/each}
            {#each tocReference as item (item.id)}
              <div class="toc-direct-link">
                <button type="button" class="linkish ref" onclick={() => showRead(item.id)}>{item.title}</button>
              </div>
            {/each}
          </nav>
        </div>
      </div>
    </div>
    {#each detailKeys as key (key)}
      <div
        class="toc-pebble toc-pebble-detail"
        class:layout-split={layoutSplit || exitingKeys.includes(key)}
        class:vignette={showVignette}
        class:entering={enteringKeys.includes(key) && !enteringSlow}
        class:entering-slow={enteringKeys.includes(key) && enteringSlow}
        class:exiting={exitingKeys.includes(key) && !trackShifting}
        class:exiting-multi={exitingKeys.includes(key) && trackShifting}
      >
        <div class="toc-pebble-scroll">
          <TocSectionDetail sectionKey={key} />
        </div>
      </div>
    {/each}
  </div>
</div>
