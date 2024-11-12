<script lang="ts">
  interface FormattedContentProps {
    content: string;
  }

  let { content }: FormattedContentProps = $props();

  let sections = $derived(content?.split(/\n/g) || []);
</script>

<div>
  {#each sections as section}
    <div class="content-section">{section}</div>
  {/each}
</div>

<style>
  .content-section {
    margin: 2em 0;
  }
</style>
