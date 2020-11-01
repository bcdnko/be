import {
  BibleVersionStored,
  BibleBookStored,
  BibleVerseStored,
} from 'core/interfaces/Bible.interfaces';

export interface BibleVersion extends BibleVersionStored {
  url: string;
}

export interface BibleBook extends BibleBookStored {
  chaptersArray: BibleBookChapter[];
  aliasesIndex: string[];
  route: any[];
}

export type BibleBooksByTestament = {
  title: string;
  books: BibleBook[];
}[];

export interface BibleBookChapter {
  no: number;
  url: string;
}

export interface BibleVerse extends BibleVerseStored {
  parsedText: BibleTextToken[];
}

export interface BibleState {
  version: BibleVersion | null;
  book: BibleBook | null;
  chapter: number | null;
}

export interface BibleTextToken {
  type: 'strong' | 'punctuation' | 'word' | 'space';
  text: string;
  markers?: string[];
}

