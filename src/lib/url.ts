export function isLessonPage(url: string) {
  try {
    const urlInst = new URL(url);
    const isLessonsPath = /^\/lessons\//.test(urlInst.pathname);
    const isChapter = urlInst.searchParams.has("chapter");
    const isCourse = urlInst.searchParams.has("from");

    return isLessonsPath && (isChapter || isCourse);
  } catch (e) {
    console.error(e);
    return false;
  }
}
