import { DBSchema, IDBPDatabase } from 'idb';
import { BibleBookId } from '../../../../../core/interfaces/Bible.interfaces';
import { VerseMark } from '../types/marks';

export const USER_STORE_BIBLE_MARKS = 'bible-marks';

export interface UserStorageSchema extends DBSchema {
  [USER_STORE_BIBLE_MARKS]: {
    key: number;
    value: VerseMark;
    indexes: {
      typeValue: [string, string];
      chapterRef: [BibleBookId, number];
      verseRef: [BibleBookId, number, number];
    };
  };
}

export type UserStorage = IDBPDatabase<UserStorageSchema>;
