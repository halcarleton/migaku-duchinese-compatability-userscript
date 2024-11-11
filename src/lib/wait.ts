export function wait(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

const defaultInterval = 500;
const defaultTimeout = 5000;
const defaultWaitForError: Error = new Error(
  "Exceeded time limit while waiting."
);

export interface WaitForOptions {
  interval: number;
  timeout: number;
  err: Error;
}

export const defaultWaitForOptions: WaitForOptions = {
  err: new Error("Exceeded time limit while waiting."),
  interval: 500,
  timeout: 5000,
};

export async function waitFor<T>(
  fn: () => T,
  options: Partial<WaitForOptions> = {}
) {
  const completeOptions: WaitForOptions = Object.assign(
    {},
    defaultWaitForOptions,
    options
  );
  let start = Date.now();
  let result = fn();
  while (!result) {
    if (Date.now() - start > completeOptions.timeout) {
      throw completeOptions.err;
    }
    await wait(completeOptions.interval);
    result = fn();
  }

  return result;
}
