import {
  Language,
  LanguageId,
} from './Language.interfaces';

export type BibleVersionId = string;
export type BibleBookId = number;
export type BibleBookAlias = string;
export type TestamentId = 'old' | 'new';
export type CrossVersionId = string;

export interface BibleVersionStored {
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

export interface BibleBookStored {
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

export type BibleBooksByTestament = {
  title: string;
  books: BibleBookStored[];
}[];

export interface BibleVerseStored {
  id: number;
  cvId: CrossVersionId;
  bookId: BibleBookId;
  chapter: number;
  no: number;
  text: string;
}

export interface StrongWord {
  id: string;
  word: string;
  pron: string;
  pronAlt?: string;
  meaning: string;
}

export interface StrongDictionary {
  [key: string]: StrongWord;
}

