import {
  BibleBookId,
  IBibleVerse,
} from '../../../core/interfaces/Bible.interfaces';
import { VerseMark } from '../hooks/userStorage/types/marks';
import { VerseRef } from '../hooks/userStorage/types/refs';

function verseRef(bookId: BibleBookId, chapter: number, verseNum: number) {
  return `${bookId}_${chapter}_${verseNum}`;
}

export function getVerseRefKey({ bookId, chapter, verseNum }: VerseRef) {
  return verseRef(bookId, chapter, verseNum);
}

export function getVerseRefKeyFromVerse({ bookId, chapter, no }: IBibleVerse) {
  return verseRef(bookId, chapter, no);
}

export function getVerseRefKeyFromMark({
  bookId,
  chapter,
  verseNum,
}: VerseMark) {
  return verseRef(bookId, chapter, verseNum);
}
