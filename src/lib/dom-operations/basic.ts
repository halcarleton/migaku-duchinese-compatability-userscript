import { waitFor, type WaitForOptions } from "../wait";

export function getAllBySelector(
  selector: string,
  parent?: Element
): Element[] {
  return [...(parent || document).querySelectorAll(selector)];
}

export async function getNBySelector(
  selector: string,
  qty: number,
  options: Partial<WaitForOptions> = {},
  parent?: Element
): Promise<Element[]> {
  let localOptions: Partial<WaitForOptions> = {
    ...options,
    err:
      options.err ||
      new Error(`Exceeded time limit while querying selector: "${selector}"`),
  };

  let foundCount = 0;
  const matchedElements = await waitFor(() => {
    const elements = getAllBySelector(selector, parent);

    if (elements.length === qty) {
      return elements;
    }

    foundCount = elements.length;
    return null;
  }, localOptions);

  return matchedElements;
}

export async function getBySelector(
  selector: string,
  options: Partial<WaitForOptions> = {},
  parent?: Element
): Promise<Element> {
  const matchedElements = await getNBySelector(selector, 1, options, parent);

  return matchedElements[0];
}
