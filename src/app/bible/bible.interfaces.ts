import {
  Language,
  LanguageId,
} from '../core/interfaces/language.interfaces';

export type BibleVersionId = string;
export type BibleBookId = number;
export type BibleBookAlias = string;
export type TestamentId = 'old' | 'new';
export type CrossVersionId = string;

export interface BibleLanguage extends Language {
  defaultVersionId: BibleVersionId;
}

export interface BibleVersionStored {
  id: BibleVersionId;
  title: string;
  titleShortest: string;
  titleShort: string;
  langId: LanguageId;
  copyright?: string;
  version?: string;
  updated: string;
}

export interface BibleVersion extends BibleVersionStored {
  route: any[];
}

export interface BibleBookStored {
  id: BibleBookId;
  cvId: CrossVersionId;
  versionId: BibleVersionId;
  title: string;
  titleShort: string;
  chapters: number;
  testament: TestamentId;
  description?: string;
  aliases: BibleBookAlias[];
}

export interface BibleBook extends BibleBookStored {
  chaptersArray: BibleBookChapter[];
  aliasesIndex: string[];
  route: any[];
}

export interface BibleBookChapter {
  no: number;
  route: any[];
}

export interface BibleVerse {
  id: number;
  cvId: CrossVersionId;
  bookId: BibleBookId;
  chapter: number;
  no: number;
  text: string;
}

export type BibleBooksByTestament = {
  title: string;
  books: BibleBook[];
}[];

export interface BibleState {
  version: BibleVersion;
  versionBooks: BibleBook[];
  book: BibleBook;
  chapter: number;
  selectedVerses: BibleVerse[];
}

