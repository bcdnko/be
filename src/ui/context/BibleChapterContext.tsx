import React, { useMemo } from 'react';
import {
  ChapterRef,
  IBibleBook,
  IBibleChapterContext,
  IBibleVerse,
  IBibleVersion,
} from '../../core/interfaces/Bible.interfaces';
import { useBibleContextLoader } from '../hooks/api/bible/useBibleContextLoader';
import { useVersesFromHash } from '../hooks/actions/bible/useVersesFromHash';
import { useBibleRouteParams } from '../hooks/actions/bible/useBibleParams';

export interface IBibleContext {
  chapterRef: ChapterRef;
  chapterContext?: IBibleChapterContext;
  versions?: IBibleVersion[];
  books?: IBibleBook[];
  verses?: IBibleVerse[];
}

export const BibleContext = React.createContext<IBibleContext>(undefined!);

export function BibleContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const { versionId, bookId, chapter } = useBibleRouteParams();
  const { selectedVerses } = useVersesFromHash();

  const chapterRef = useMemo(
    () => ({
      versionId,
      bookId,
      chapter,
    }),
    [versionId, bookId, chapter]
  );

  const { versions, books, version, book, verses } =
    useBibleContextLoader(chapterRef);

  const chapterContext = useMemo(() => {
    if (!version || !book || !chapter || !selectedVerses) {
      return undefined;
    }

    return {
      version,
      book,
      chapter,
      selectedVerses,
    };
  }, [version, book, chapter, selectedVerses]);

  return (
    <BibleContext.Provider
      value={{
        chapterContext,
        chapterRef,
        versions,
        books,
        verses,
      }}
    >
      {children}
    </BibleContext.Provider>
  );
}

export function useBibleContext() {
  if (BibleContext === undefined) {
    throw new Error('BibleContext was not defined');
  }

  return React.useContext(BibleContext);
}
