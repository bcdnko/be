import { BibleVersionId } from './Bible.interfaces';

export interface Config {
  projectName: string;
  defaultVersionId: BibleVersionId;
  defaultLanguage: string;
  defaultDictionaryId: string;
}

export interface IChapterSettings {
  showVerseNumber: boolean;
  showChapterList: boolean;
  fullBookHeader: boolean;
  showStrong: boolean;
  highlightJesusWords: boolean;
  hugePrevNextChapterBtns: boolean;
  vimKeys: boolean;
}

export interface IBookSelectorSettings {
  showChaptersDropDown: boolean;
}

export interface ISettings {
  version: number;
  general: {
    showGoToTopButton: boolean;
    defaultBibleVersionId: BibleVersionId;
    defaultDictionaryId: string;
  };
  chapter: IChapterSettings;
  bookSelector: IBookSelectorSettings;
}
