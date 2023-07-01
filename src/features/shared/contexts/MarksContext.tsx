import React, { useEffect, useState } from 'react';
import { useBibleVerseMarkActions } from '../hooks/userStorage/idb/useIdbBibleVerseMarkActions';
import { VerseMarksGroupped } from '../hooks/userStorage/types/marks';
import { useBibleContext } from './BibleChapterContext';
import { useUserStorageContext } from './UserStorageContext';

export interface MarksContextValue {
  marks: VerseMarksGroupped;
  actions: ReturnType<typeof useBibleVerseMarkActions>;
}

export const MarksContext = React.createContext<MarksContextValue | undefined>(
  undefined
);

export function MarksContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [marks, setMarks] = useState<VerseMarksGroupped>({});

  const db = useUserStorageContext();
  const actions = useBibleVerseMarkActions(db);

  const { getChapterMarks } = actions;
  const { chapterContext } = useBibleContext();

  useEffect(() => {
    if (!chapterContext) {
      return;
    }

    getChapterMarks({
      versionId: chapterContext.version.id,
      bookId: chapterContext.book.id,
      chapter: chapterContext.chapter,
    }).then(setMarks);
  }, [getChapterMarks, chapterContext]);

  return (
    <MarksContext.Provider
      value={{
        marks,
        actions,
      }}
    >
      {children}
    </MarksContext.Provider>
  );
}

export function useMarksContext() {
  return React.useContext(MarksContext);
}
