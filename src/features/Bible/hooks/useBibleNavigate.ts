import { useNavigate } from 'react-router-dom';
import {
  BibleBookId,
  BibleChapterId,
  BibleVerseId,
  BibleVersionId,
  IBibleChapterContext,
  IBibleVerse,
  IVerseRange,
} from '../../../core/interfaces/Bible.interfaces';
import { isOffscreen } from '../../../core/util/htmlView';
import { url } from '../../../core/util/url';
import { useBibleContext } from '../../shared/contexts/BibleChapterContext';

export function chapterUrl(
  {
    versionId,
    bookId,
    chapter,
  }: { versionId: BibleVersionId; bookId: BibleBookId; chapter: number },
  opts: { preserveHash?: boolean } = {}
): string {
  return url(
    ['bible', versionId, bookId, chapter],
    opts.preserveHash ? window.location.hash : undefined
  );
}

// TODO add type
export function verseUrl({
  versionId,
  bookId,
  chapter,
  verses,
}: {
  versionId: BibleVersionId;
  bookId: BibleBookId;
  chapter: number;
  verses: IVerseRange;
}): string {
  return url(['bible', versionId, bookId, chapter], verses.join(','));
}

export function getPrevChapterUrl(
  chapterContext: IBibleChapterContext
): string | undefined {
  if (!chapterContext || chapterContext.chapter <= 1) {
    return undefined;
  }

  return chapterUrl({
    versionId: chapterContext.version.id,
    bookId: chapterContext.book.id,
    chapter: chapterContext.chapter - 1,
  });
}

export function getNextChapterUrl(
  chapterContext: IBibleChapterContext
): string | undefined {
  if (
    !chapterContext ||
    chapterContext.chapter >= chapterContext.book.chapters
  ) {
    return undefined;
  }

  return chapterUrl({
    versionId: chapterContext.version.id,
    bookId: chapterContext.book.id,
    chapter: chapterContext.chapter + 1,
  });
}

export function useBibleNavigate() {
  const navigate = useNavigate();
  const { chapterContext } = useBibleContext();

  return {
    changeActiveVerse(num?: BibleVerseId, verses?: IBibleVerse[]) {
      if (num === undefined) {
        navigate('#', { preventScrollReset: true });
        return;
      }

      if (num <= 0) {
        return;
      }

      if (!verses) {
        return;
      }

      if (num > verses.length) {
        num = verses.length;
      }

      if (num < 1) {
        num = 1;
      }

      navigate('#' + num, { preventScrollReset: true });

      const el = document.getElementById('v-' + num);

      if (el && isOffscreen(el).any) {
        el.scrollIntoView({ block: 'center' });
      }
    },

    navigateBible({
      versionId,
      bookId,
      chapter,
      verse,
    }: {
      versionId: BibleVersionId;
      bookId: BibleBookId;
      chapter: BibleChapterId;
      verse?: number;
    }) {
      if (verse) {
        navigate(verseUrl({ versionId, bookId, chapter, verses: [verse] }));
      } else {
        navigate(chapterUrl({ versionId, bookId, chapter }));
      }
    },

    goToPrevChapter: () => {
      if (!chapterContext) {
        return;
      }
      const url = getPrevChapterUrl(chapterContext);
      url && navigate(url, { preventScrollReset: true });
    },

    goToNextChapter: () => {
      if (!chapterContext) {
        return;
      }
      const url = getNextChapterUrl(chapterContext);
      url && navigate(url, { preventScrollReset: true });
    },
  };
}
