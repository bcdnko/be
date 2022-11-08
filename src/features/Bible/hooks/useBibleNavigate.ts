import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BibleBookStored, BibleVerse } from '../../../core/interfaces/Bible.interfaces';
import { isOffscreen } from '../../../core/util/htmlView';
import { url } from '../../../core/util/url';

type Props = {
  versionId?: string,
  chapter?: number,
  book?: BibleBookStored,
  verses?: BibleVerse[],
};

function chapterUrl(versionId: string, bookId: number, chapter: number): string {
  return url([
   'bible',
    versionId,
    bookId.toString(),
    chapter.toString(),
  ]);
}

export function useBibleNavigate({
  versionId,
  chapter,
  book,
  verses,
}: Props) {
  const navigate = useNavigate();

  return useMemo(() => {
    const goTo = (versionId: string, bookId: number, chapter: number) => {
      navigate(
        chapterUrl(versionId, bookId, chapter),
        { preventScrollReset: true}
      );
    };

    const changeChapter = (chapter: number) => {
      versionId && book && goTo(versionId, book.id, chapter);
    };

    const getPrevChapterUrl = (): string | null => {
      if (!versionId || !book || !chapter || chapter <= 1) {
        return null;
      }

      return chapterUrl(versionId, book.id, chapter - 1);
    };

    const getNextChapterUrl = (): string | null => {
      if (!versionId || !book || !chapter || chapter >= book.chapters) {
        return null;
      }

      return chapterUrl(versionId, book.id, chapter + 1);
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

      changeActiveVerse: (no: number | null) => {
        if (!verses) {
          return;
        }

        if (!no) {
          navigate('#', { preventScrollReset: true });
          return;
        }

        if (no > verses.length) {
          no = verses.length;
        }

        if (no < 1) {
          no = 1;
        }

        navigate('#' + no, { preventScrollReset: true });

        const el = document.getElementById('v-' + no);

        if (el && isOffscreen(el).any) {
          el.scrollIntoView({ block: 'center'});
        }
      },
    };
  }, [navigate, versionId, book, chapter, verses]);
}
