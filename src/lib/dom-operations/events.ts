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
