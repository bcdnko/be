import { MarksVerseRef } from './refs';

export type VerseMarkValue = string;
export type VerseMarkType = 'symbol';

export interface VerseMark extends MarksVerseRef {
  type: VerseMarkType;
  value: VerseMarkValue;
}

export interface VerseMarkStored extends VerseMark {
  id: number;
}

export type VerseMarks = Record<VerseMarkValue, VerseMark>;
export type VerseMarksGroupped = Record<string, VerseMarks>;
