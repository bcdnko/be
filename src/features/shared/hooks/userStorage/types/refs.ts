import {
  BibleBookId,
  BibleVersionId,
} from '../../../../../core/interfaces/Bible.interfaces';

// TODO move out
export interface MarksChapterRef {
  versionId?: BibleVersionId;
  bookId: BibleBookId;
  chapter: number;
}

export interface MarksVerseRef extends MarksChapterRef {
  verseNum: number;
}
