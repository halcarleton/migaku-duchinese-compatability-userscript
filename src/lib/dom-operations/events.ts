import type { CharSet } from "../types/shared";
import { getSelectedCharSet, type PageFooter } from "./lesson";

export interface CharSetChangeEvent {
  charSet: CharSet;
}
export async function onCharSetChange(
  fn: (e: CharSetChangeEvent) => void,
  pageFooter: PageFooter
) {
  pageFooter.characterSetToggle.element.addEventListener("click", async () => {
    const selectedCharSet = await getSelectedCharSet(pageFooter);

    fn({ charSet: selectedCharSet });
  });
}

export async function onClassChange(
  element: Element,
  callback: (previous: string, next: string) => void
) {
  const observer = new MutationObserver((mutations) => {
    const firstMutation = mutations[0];
    const previousClassName = firstMutation?.oldValue || "";
    const nextClassName = element.className;

    callback(previousClassName, nextClassName);
  });

  observer.observe(element, {
    attributes: true,
    attributeFilter: ["class"],
    attributeOldValue: true,
  });
}
