import {
  BibleBookId,
  BibleVersionId,
} from '../../../../../core/interfaces/Bible.interfaces';

export interface ChapterRef {
  versionId?: BibleVersionId;
  bookId: BibleBookId;
  chapter: number;
}

export interface VerseRef extends ChapterRef {
  verseNum: number;
}
