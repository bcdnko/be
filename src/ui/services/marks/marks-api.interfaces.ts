import {
  ChapterRef,
  VerseRef,
} from '../../../core/interfaces/Bible.interfaces';

export enum VerseMarkSymbol {
  SYMBOL_EXCLAMATION = '1',
  SYMBOL_QUESTION = '2',
  SYMBOL_HEART = '3',
  SYMBOL_STAR = '4',
}

export enum VerseMarkType {
  SYMBOL = 1,
}

export interface VerseMark {
  type: VerseMarkType;
  value: string;
}

export const MarkMap: Map<VerseMarkSymbol, VerseMark> = new Map([
  [
    VerseMarkSymbol.SYMBOL_EXCLAMATION,
    { type: VerseMarkType.SYMBOL, value: '!' },
  ],
  [VerseMarkSymbol.SYMBOL_QUESTION, { type: VerseMarkType.SYMBOL, value: '?' }],
  [VerseMarkSymbol.SYMBOL_HEART, { type: VerseMarkType.SYMBOL, value: '♡' }],
  [VerseMarkSymbol.SYMBOL_STAR, { type: VerseMarkType.SYMBOL, value: '★' }],
]);

export interface VerseMarks {
  [verseMarkSymbol: string]: boolean;
}

export interface ChapterMarks {
  [verseNum: string]: VerseMarks;
}

export interface MarksApi {
  addMark(symbol: VerseMarkSymbol, verseRef: VerseRef): Promise<void>;
  removeMark(symbol: VerseMarkSymbol, verseRef: VerseRef): Promise<void>;
  getChapterMarks(chapterRef: ChapterRef): Promise<ChapterMarks>;
}
