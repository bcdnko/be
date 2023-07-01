import React, { useMemo } from 'react';
import {
  IBibleBook,
  IBibleChapterContext,
  IBibleVerse,
  IBibleVersion,
} from '../../../core/interfaces/Bible.interfaces';
import { useBibleContextLoader } from '../hooks/data/api/useBibleContextLoader';
import { useVersesFromHash } from '../hooks/hashParams/useVersesFromHash';
import { useBibleRouteParams } from '../hooks/useBibleParams';

// TODO remove ?
export interface IBibleContext {
  chapterContext?: IBibleChapterContext;
  versions?: IBibleVersion[];
  books?: IBibleBook[];
  verses?: IBibleVerse[];
}

export const BibleContext = React.createContext<IBibleContext>({});

export function BibleContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const { versionId, bookId, chapter } = useBibleRouteParams();
  const { selectedVerses } = useVersesFromHash();

  const { versions, books, version, book, verses } = useBibleContextLoader({
    versionId,
    bookId,
    chapter,
  });

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
  return React.useContext(BibleContext);
}
