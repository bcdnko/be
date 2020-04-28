import {
  Language,
  LanguageId,
} from '../core/interfaces/language.interfaces';

export type BibleVersionId = string;
export type BibleBookId = number;
export type BibleBookAlias = string;
export type TestamentId = 'old' | 'new';
export type CrossVersionId = number;

export interface BibleLanguage extends Language {
  defaultVersionId: BibleVersionId;
}

export interface BibleVersion {
  id: BibleVersionId;
  title: string;
  titleShort?: string;
  langId: LanguageId;
  copyright?: string;
  version?: string;
  updated: string;
}

export interface BibleBooksByTestament {
  old: BibleBook[];
  new: BibleBook[];
}

export interface BibleBookChapter {
  number: number;
  route: any[];
}

export interface BibleBook {
  id: BibleBookId;
  cvId: CrossVersionId;
  versionId: BibleVersionId;
  title: string;
  titleShort?: string;
  chapters: number;
  chaptersArray: BibleBookChapter[];
  testament: TestamentId;
  description?: string;
  aliases?: BibleBookAlias[];
}

export interface BibleVerse {
  id: number;
  cvId: CrossVersionId;
  bookId: BibleBookId;
  chapter: number;
  no: number;
  text: string;
}

export interface BibleState {
  version: BibleVersion;
  versionBooks: BibleBook[];
  book: BibleBook;
  chapter: number;
  selectedVerses: BibleVerse[];
}

