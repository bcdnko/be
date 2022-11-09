import {
  LanguageId,
} from './Language.interfaces';

export type BibleVersionId = string;
export type BibleBookId = number;
export type BibleBookAlias = string;
export type BibleVerseId = number;
export type TestamentId = 'old' | 'new';
export type CrossVersionId = string;

export interface IBibleVersionStored {
  id: BibleVersionId;
  title: string;
  titleShortest: string;
  titleShort: string;
  langId: LanguageId;
  copyright?: string;
  version?: string;
  updated: string;
  strongId?: string;
}

export interface IBibleVersion extends IBibleVersionStored {
}

export interface IBibleBookStored {
  id: BibleBookId;
  cvId: CrossVersionId;
  versionId: BibleVersionId;
  title: string;
  titleShort: string;
  chapters: number;
  chapterTitle?: string;
  testament: TestamentId;
  description?: string;
  aliases: BibleBookAlias[];
}

export interface IBibleBook extends IBibleBookStored {
}

export type BibleBooksByTestament = {
  title: string;
  books: IBibleBook[];
}[];

export interface IBibleVerseStored {
  id: BibleVerseId;
  cvId: CrossVersionId;
  bookId: BibleBookId;
  chapter: number;
  no: number;
  text: string;
}

export interface IBibleTextToken {
  type: 'strong' | 'punctuation' | 'word' | 'space';
  text: string;
  markers?: string[];
}

export interface IBibleVerse extends IBibleVerseStored {
  textParsed: IBibleTextToken[];
}

export interface IStrongWord {
  id: string;
  word: string;
  pron: string;
  pronAlt?: string;
  meaning: string;
}

export interface IStrongDictionary {
  [key: string]: IStrongWord;
}

export type IVerseSelection = number[];
