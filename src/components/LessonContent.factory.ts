import {
  lessonContentTag,
  type LessonContentProps,
} from "./LessonContent.svelte";

export interface HTMLPlainTextLessonContentElement
  extends HTMLElement,
    LessonContentProps {}

export default function lessonContentFactory(props: LessonContentProps) {
  const baseElement = document.createElement(lessonContentTag);
  const element: HTMLPlainTextLessonContentElement = Object.assign(
    baseElement,
    props
  );

  return element;
}
