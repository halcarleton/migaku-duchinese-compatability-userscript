import lessonContentFactory, {
  type HTMLPlainTextLessonContentElement,
} from "../../components/LessonContent.factory";
import { CharSet } from "../types/shared";
import { waitFor } from "../wait";
import { getBySelector } from "./basic";
import { onCharSetChange } from "./events";

export interface LessonElement {
  element: Element;
}
export interface LessonContent extends LessonElement {
  plainTextLessonContent: HTMLPlainTextLessonContentElement;
}
export interface CourseNavigation extends LessonElement {
  previous?: LessonElement;
  next?: LessonElement;
}
export interface LessonFooter extends LessonElement {}
export interface PageFooter extends LessonElement {
  characterSetToggle: LessonElement;
}
export interface LessonElements {
  courseNavigation: CourseNavigation;
  lessonContainer: LessonElement;
  lessonContent: LessonContent;
  lessonFooter: LessonFooter;
  pageFooter: PageFooter;
}

async function getCourseNavigation(): Promise<CourseNavigation> {
  const element = await getBySelector(".course-navigation");

  return { element };
}

async function getLessonContainer(): Promise<LessonElement> {
  const element = await getBySelector("#du-lesson-container");

  return { element };
}

async function getLessonContent(): Promise<LessonContent> {
  const element = await getBySelector(".lesson-content");
  const plainTextLessonContent = lessonContentFactory({
    characterSet: CharSet.traditional,
    simplified: "",
    traditional: "",
    loading: true,
  });
  const lessonContent: LessonContent = {
    element,
    plainTextLessonContent,
  };

  return lessonContent;
}

export async function getLessonTextContent(
  lessonContent: LessonContent,
  previous?: string
): Promise<string> {
  const textContent: string = await waitFor(() => {
    const canvasEls = [...lessonContent.element.querySelectorAll("canvas")];
    const content = canvasEls
      .map((el) => el.textContent || "")
      .join("")
      .trim();
    const hasChanged = content !== previous;

    if (content.includes("Loading") || !hasChanged) {
      return "";
    }

    return content;
  });

  return textContent;
}

async function getLessonFooter(): Promise<LessonFooter> {
  const element = await getBySelector(".du-lesson-footer");

  return { element };
}

async function getPageFooter(): Promise<PageFooter> {
  const element = await getBySelector(".du-footer-fixed-bottom");
  const characterSetToggleEl =
    element.querySelectorAll(".du-button-charset")[0];
  const characterSetToggle: LessonElement = { element: characterSetToggleEl };
  return { characterSetToggle, element };
}

export async function getLessonElements(): Promise<LessonElements> {
  const [
    courseNavigation,
    lessonContainer,
    lessonContent,
    lessonFooter,
    pageFooter,
  ] = await Promise.all([
    getCourseNavigation(),
    getLessonContainer(),
    getLessonContent(),
    getLessonFooter(),
    getPageFooter(),
  ]);

  const lessonElements = {
    courseNavigation,
    lessonContainer,
    lessonContent,
    lessonFooter,
    pageFooter,
  };

  return lessonElements;
}

export async function getSelectedCharSet(
  pageFooter: PageFooter
): Promise<CharSet> {
  const simplifiedIndicatorMatches =
    pageFooter.characterSetToggle.element.getElementsByClassName(
      "du-button-charset-sc"
    );

  return simplifiedIndicatorMatches.length
    ? CharSet.simplified
    : CharSet.traditional;
}

export async function applyPlainTextUI(lessonElements: LessonElements) {
  const characterSet = await getSelectedCharSet(lessonElements.pageFooter);
  lessonElements.lessonContent.plainTextLessonContent.characterSet =
    characterSet;

  onCharSetChange((e) => {
    lessonElements.lessonContent.plainTextLessonContent.characterSet =
      e.charSet;
  }, lessonElements.pageFooter);

  lessonElements.lessonContent.element.parentElement?.replaceChild(
    lessonElements.lessonContent.plainTextLessonContent,
    lessonElements.lessonContent.element
  );
}

export async function applyOriginalUI(lessonElements: LessonElements) {
  lessonElements.lessonContent.plainTextLessonContent.parentElement?.replaceChild(
    lessonElements.lessonContent.element,
    lessonElements.lessonContent.plainTextLessonContent
  );
}
