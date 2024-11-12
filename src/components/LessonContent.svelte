<svelte:options
  customElement={{ tag: "plain-text-lesson-content", shadow: "none" }}
/>

<script lang="ts" module>
  export interface LessonContentProps {
    characterSet: CharSet;
    loading: boolean;
    traditional: string;
    simplified: string;
  }
  export const lessonContentTag = 'plain-text-lesson-content';
</script>

<script lang="ts">
  import type { CharSet } from "../lib/types/shared";
  import FormattedContent from "./FormattedContent.svelte";

  let { characterSet, loading, traditional, simplified }: LessonContentProps = $props();

  let content = $derived(
    characterSet === "simplified" ? simplified : traditional
  );
</script>

<div class={loading ? 'loading' : ''}>
  <div class="plain-text-lesson-content"><FormattedContent {content} /></div>
  <div class='loading-indicator'>Loading</div>
</div>


<style>
  .plain-text-lesson-content {
    padding: 0 2em;
    font-weight: 400;
  }

  .loading .plain-text-lesson-content {
    display: none;
  }

  .loading-indicator {
    display: none;
  }

  .loading .loading-indicator {
    display: block
  }
</style>
