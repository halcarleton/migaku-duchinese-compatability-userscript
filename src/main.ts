import initialize from "./lib/initialize";
import { isLessonPage } from "./lib/url";

interface NavigateEvent extends Event {
  destination: { url: string };
}

async function main() {
  let currentUrl = "";
  const { mount, mounted, refresh, unmount } = await initialize();

  async function handleNavigate(url: string): Promise<void> {
    const isDupeNavigation = currentUrl === url;
    const toLessonPage = isLessonPage(url);

    if (isDupeNavigation) {
      return;
    }

    currentUrl = url;

    if (mounted() && toLessonPage) {
      await refresh();
    } else if (mounted() && !toLessonPage) {
      await unmount();
    } else if (!mounted() && toLessonPage) {
      await mount();
    }
  }

  function handleNavigateEvent(e: NavigateEvent) {
    return handleNavigate(e.destination.url);
  }

  window.addEventListener("popstate", handleNavigateEvent as any);

  navigation.addEventListener("navigate", handleNavigateEvent);
}

main();
