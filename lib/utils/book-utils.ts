import { Book, Chapter, PageContent, DisplayPage } from "@/lib/types/book";

/**
 * Converts a PageContent item to a DisplayPage item that can be rendered in the UI
 * @param pageContent The PageContent from the book definition
 */
export function convertToDisplayPage(pageContent: PageContent): DisplayPage {
  switch (pageContent.type) {
    case "text":
      // Convert text content to lines for display
      const paragraphs = pageContent.content.split(/\n\n+/);
      const lines = paragraphs.length > 0 ? 
        paragraphs.flatMap((p) => [p, ""]).slice(0, -1) : // Add empty lines between paragraphs
        [pageContent.content || ""];
      return { type: "text", lines };
    
    case "chatbot":
      return { type: "chatbot" };
    
    case "form":
      return { type: "form", fields: pageContent.fields };
    
    case "audio":
      return { type: "audio", url: pageContent.url, htmlContent: pageContent.htmlContent };
  }
}

/**
 * Get all display pages for a given chapter
 * @param chapter The chapter to get pages from
 */
export function getChapterDisplayPages(chapter: Chapter): DisplayPage[] {
  if (!chapter.pages || chapter.pages.length === 0) {
    // Fallback if no pages are defined
    return [{ type: "text", lines: ["[No content available]"] }];
  }
  
  return chapter.pages.map(convertToDisplayPage);
}

/**
 * Gets the total number of pages in a chapter
 * @param chapter The chapter to count pages for
 */
export function getChapterPageCount(chapter: Chapter): number {
  if (!chapter.pages) return 0;
  return chapter.pages.length;
}

/**
 * Calculates the total number of pages in a book
 * @param book The book to calculate pages for
 */
export function getBookPageCount(book: Book): number {
  return book.chapters.reduce((total, chapter) => {
    return total + getChapterPageCount(chapter);
  }, 0);
}
