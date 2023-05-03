import { useEffect, useState } from 'react';
import { ChapterRef, VerseRef } from '../types/refs';
import { VerseMarksGroupped, VerseMark, VerseMarkValue } from '../types/marks';
import { UserStorage, USER_STORE_BIBLE_MARKS } from './schema';
import { getVerseRefKeyFromMark } from '../../../helpers/verse';

function getStorageError() {
  return new Error('User db is not opened. Should not happen in any case');
}

async function setMark(
  db: UserStorage | undefined,
  verseRef: VerseRef,
  mark: VerseMarkValue
): Promise<void> {
  if (!db) {
    throw getStorageError();
  }

  const tx = db?.transaction(USER_STORE_BIBLE_MARKS, 'readwrite');
  const store = tx.objectStore(USER_STORE_BIBLE_MARKS);

  // TODO check if not set

  await store.put({
    // versionId: undefined,
    bookId: verseRef.bookId,
    chapter: verseRef.chapter,
    verseNum: verseRef.verseNum,
    type: 'symbol',
    value: mark,
  });

  await tx.done;
}

async function getChapterMarks(
  db: UserStorage | undefined,
  chapterRef: ChapterRef
): Promise<VerseMarksGroupped> {
  if (!db) {
    throw getStorageError();
  }

  const tx = db?.transaction(USER_STORE_BIBLE_MARKS, 'readwrite');

  return tx
    .objectStore(USER_STORE_BIBLE_MARKS)
    .index('chapterRef')
    .getAll([chapterRef.bookId, chapterRef.chapter])
    .then((marks: VerseMark[]) =>
      marks.reduce<VerseMarksGroupped>((acc, mark: VerseMark) => {
        const key = getVerseRefKeyFromMark(mark);
        const marks = acc[key] ?? {};
        marks[mark.value] = mark;
        acc[key] = marks;

        return acc;
      }, {})
    );
}

export function useBibleVerseMarks(
  db: UserStorage | undefined,
  chapterRef: ChapterRef
) {
  const [marks, setMarks] = useState<VerseMarksGroupped>({});

  const loadChapterMarks = async (db: UserStorage, chapterRef: ChapterRef) => {
    const marks = await getChapterMarks(db, chapterRef);
    setMarks(marks);
    return marks;
  };

  useEffect(() => {
    if (!db || !chapterRef) {
      return;
    }

    loadChapterMarks(db, chapterRef);
  }, [db, chapterRef]);

  return {
    marks,
    putMark: (verseNum: number, mark: VerseMarkValue) => {
      if (!db || !chapterRef) {
        throw new Error('Unexpected error: no db or chapterRef');
      }

      const verseRef = {
        ...chapterRef,
        verseNum,
      };

      setMark(db, verseRef, mark).then(() => loadChapterMarks(db, chapterRef));
    },
  };
}
