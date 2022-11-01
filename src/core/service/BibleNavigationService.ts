import { BibleBookStored } from '../interfaces/Bible.interfaces';
import { url } from '../util/url';

function chapterUrl(versionId: string, bookId: number, chapter: number): string {
  return url([
   'bible',
    versionId,
    bookId.toString(),
    chapter.toString(),
  ]);
}

export const BibleNavigationService = {
  chapterUrl,

  getPreviousChapterUrl(versionId: string, book: BibleBookStored, chapter: number): string | null {
    if (chapter > 1) {
      return chapterUrl(versionId, book.id, (chapter - 1));
    }

    return null;
  },

  getNextChapterUrl(versionId: string, book: BibleBookStored, chapter: number): string | null {
    if (chapter !== book.chapters) {
      return chapterUrl(versionId, book.id, (chapter + 1));
    }

    return null;
  }
}
