import { getVerseRefKeyFromMark } from '../../../helpers/verse';
import { VerseMark, VerseMarksGroupped, VerseMarkStored } from '../types/marks';
import { MarksChapterRef } from '../types/refs';
import { INDEXEDDB_BIBLE_MARKS_STORE } from './schema';
import { promisifyIdbRequest } from './useIdbUserStorage';

function getStorageError() {
  return new Error('User db is not opened. Should not happen in any case');
}

function getMarksStore(tx: IDBTransaction): IDBObjectStore {
  return tx.objectStore(INDEXEDDB_BIBLE_MARKS_STORE);
}

function startMarksTransaction(
  db: IDBDatabase,
  mode: IDBTransactionMode
): IDBTransaction {
  return db?.transaction(INDEXEDDB_BIBLE_MARKS_STORE, mode);
}

async function idbGetMark(
  tx: IDBTransaction,
  { bookId, chapter, verseNum, type, value }: VerseMark
): Promise<VerseMarkStored[]> {
  const verseMarks = await promisifyIdbRequest<VerseMarkStored[]>(() =>
    getMarksStore(tx).index('verseRef').getAll([bookId, chapter, verseNum])
  );

  const marks = verseMarks.filter((_) => _.type === type && _.value === value);

  return marks;
}

async function idbPutMark(
  tx: IDBTransaction,
  { bookId, chapter, verseNum, type, value }: VerseMark
): Promise<void> {
  await promisifyIdbRequest<IDBValidKey>(() =>
    getMarksStore(tx).put({
      // versionId,
      bookId,
      chapter,
      verseNum,
      type,
      value,
    })
  );
}

function idbDeleteMark(
  tx: IDBTransaction,
  mark: VerseMarkStored
): Promise<void> {
  return promisifyIdbRequest(() => getMarksStore(tx).delete(mark.id));
}

async function idbGetChapterMarks(
  tx: IDBTransaction,
  chapterRef: MarksChapterRef
): Promise<VerseMark[]> {
  return promisifyIdbRequest<VerseMarkStored[]>(() =>
    getMarksStore(tx)
      .index('chapterRef')
      .getAll([chapterRef.bookId, chapterRef.chapter])
  );
}

export function useBibleVerseMarkActions(db: IDBDatabase | undefined) {
  return {
    getChapterMarks: async (chapterRef: MarksChapterRef) => {
      if (!db) {
        throw getStorageError();
      }

      const tx = startMarksTransaction(db, 'readonly');
      const marks = await idbGetChapterMarks(tx, chapterRef);

      return marks.reduce<VerseMarksGroupped>((acc, mark: VerseMark) => {
        const key = getVerseRefKeyFromMark(mark);
        const marks = acc[key] ?? {};
        marks[mark.value] = mark;
        acc[key] = marks;

        return acc;
      }, {});
    },

    putMark: async (mark: VerseMark): Promise<void> => {
      if (!db) {
        throw getStorageError();
      }

      const tx = startMarksTransaction(db, 'readwrite');

      if (!(await idbGetMark(tx, mark)).length) {
        return idbPutMark(tx, mark);
      }

      tx.commit();
    },

    deleteMark: async (mark: VerseMark): Promise<void> => {
      if (!db) {
        throw getStorageError();
      }

      const tx = startMarksTransaction(db, 'readwrite');
      const currentMark = await idbGetMark(tx, mark);

      if (currentMark.length) {
        return Promise.all(
          currentMark.map((mark) => idbDeleteMark(tx, mark))
        ).then();
      }

      tx.commit();
    },
  };
}
