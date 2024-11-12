import { getBySelector } from "./basic";
import { onClassChange } from "./events";

enum MigakuClasses {
  BRANCH = "-mgk-branch",
}

let migakuClasses: string[] = [];

export async function manageMigakuBodyClasses() {
  const body = await getBySelector("body");

  onClassChange(body, (prevClass, nextClass) => {
    const prevClassNames = new Set(
      prevClass.split(/\s+/).filter((value) => value)
    );
    const nextClassNames = new Set(
      nextClass.split(/\s+/).filter((value) => value)
    );

    if (nextClassNames.has(MigakuClasses.BRANCH)) {
      migakuClasses = [...nextClassNames].filter((className) =>
        className.startsWith("-mgk")
      );
    } else {
      [...migakuClasses].forEach((className) => {
        body.classList.add(className);
      });
    }
  });
}
