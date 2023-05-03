import { VerseRef } from './refs';

export type VerseMarkValue = string;

export interface VerseMark extends VerseRef {
  type: 'symbol';
  value: VerseMarkValue;
}

export type VerseMarks = Record<VerseMarkValue, VerseMark>;
export type VerseMarksGroupped = Record<string, VerseMarks>;
