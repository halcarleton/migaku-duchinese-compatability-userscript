import { waitFor, type WaitForOptions } from "../wait";

export function getAllBySelector(selector: string): Element[] {
  return [...document.querySelectorAll(selector)];
}

export async function getNBySelector(
  selector: string,
  qty: number,
  options: Partial<WaitForOptions> = {}
): Promise<Element[]> {
  let localOptions: Partial<WaitForOptions> = {
    ...options,
    err:
      options.err ||
      new Error(`Exceeded time limit while querying selector: "${selector}"`),
  };

  let foundCount = 0;
  const matchedElements = await waitFor(() => {
    const elements = getAllBySelector(selector);

    if (elements.length === qty) {
      return elements;
    }

    foundCount = elements.length;
    return null;
  }, localOptions);

  return matchedElements;
}

export async function getBySelector(selector: string): Promise<Element> {
  const matchedElements = await getNBySelector(selector, 1);

  return matchedElements[0];
}
