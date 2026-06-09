<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

<nav class="bar">
  <a href="/">The Sequences</a>
  <a href="/toc">Contents</a>
</nav>
{@render children()}
