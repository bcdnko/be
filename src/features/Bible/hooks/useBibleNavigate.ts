import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BibleBookId,
  BibleChapterId,
  BibleVerseId,
  BibleVersionId,
  IBibleChapterRef,
  IBibleVerse,
} from '../../../core/interfaces/Bible.interfaces';
import { isOffscreen } from '../../../core/util/htmlView';
import { url } from '../../../core/util/url';

function chapterUrl(
  versionId: BibleVersionId,
  bookId: BibleBookId,
  chapter: BibleChapterId,
  verse?: number
): string {
  return url(
    ['bible', versionId, bookId.toString(), chapter.toString()],
    verse?.toString()
  );
}

type Props = {
  chapterRef?: IBibleChapterRef;
  verses?: IBibleVerse[]; // TODO move outside
};

export function useBibleNavigate({ chapterRef, verses }: Props) {
  const navigate = useNavigate();

  return useMemo(() => {
    const goTo = (
      versionId: BibleVersionId,
      bookId: BibleBookId,
      chapter: BibleChapterId,
      verse?: number
    ) => {
      navigate(chapterUrl(versionId, bookId, chapter, verse), {
        preventScrollReset: true,
      });
    };

    const changeChapter = (chapter: BibleChapterId) => {
      chapterRef && goTo(chapterRef.version.id, chapterRef.book.id, chapter);
    };

    const getPrevChapterUrl = (): string | undefined => {
      if (!chapterRef || chapterRef.chapter <= 1) {
        return undefined;
      }

      return chapterUrl(
        chapterRef.version.id,
        chapterRef.book.id,
        chapterRef.chapter - 1
      );
    };

    const getNextChapterUrl = (): string | undefined => {
      if (!chapterRef || chapterRef.chapter >= chapterRef.book.chapters) {
        return undefined;
      }

      return chapterUrl(
        chapterRef.version.id,
        chapterRef.book.id,
        chapterRef.chapter + 1
      );
    };

    return {
      chapterUrl,
      goTo,
      changeChapter,
      getPrevChapterUrl,
      getNextChapterUrl,

      goToPrevChapter: () => {
        const url = getPrevChapterUrl();
        url && navigate(url, { preventScrollReset: true });
      },

      goToNextChapter: () => {
        const url = getNextChapterUrl();
        url && navigate(url, { preventScrollReset: true });
      },

      // TODO move outside
      changeActiveVerse: (num?: BibleVerseId) => {
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
    };
  }, [navigate, chapterRef, verses]);
}
