import { BibleBookStored } from "../interfaces/Bible.interfaces";

export const BibleNavigationService = {
  getPreviousChapterUrl(versionId: string, book: BibleBookStored, chapter: number): string | null {
    if (chapter > 1) {
      return `/bible/${versionId}/${book.id}/${chapter - 1}`;
    }

    return null;
  },

  getNextChapterUrl(versionId: string, book: BibleBookStored, chapter: number): string | null {
    if (chapter !== book.chapters) {
      return `/bible/${versionId}/${book.id}/${chapter + 1}`;
    }

    return null;
  }
}
