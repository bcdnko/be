import { z } from 'zod';

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

const VerseMarksSchema = z.record(
  z.string().describe('verse mark symbol'),
  z.boolean().describe('verse mark flag')
);

const ChapterMarksSchema = z.record(
  z.string().describe('verse number'),
  VerseMarksSchema
);

export const AllMarksSchema = z.record(
  z.string().describe('book_chapter'),
  ChapterMarksSchema
);

export type VerseMarks = z.infer<typeof VerseMarksSchema>;
export type ChapterMarks = z.infer<typeof ChapterMarksSchema>;
export type AllMarks = z.infer<typeof AllMarksSchema>;

export interface MarksApi {
  getAllMarks(): Promise<AllMarks>;
  setAllMarks(marks: AllMarks): Promise<void>;
  addMark(symbol: VerseMarkSymbol, verseRef: VerseRef): Promise<void>;
  removeMark(symbol: VerseMarkSymbol, verseRef: VerseRef): Promise<void>;
  getChapterMarks(chapterRef: ChapterRef): Promise<ChapterMarks>;
}
