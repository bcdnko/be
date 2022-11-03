import { BibleVersionId } from './Bible.interfaces';

export interface Config {
  version: string; // ?????????????????
  projectName: string;
  defaultVersionId: BibleVersionId;
  defaultLanguage: string;
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
  showChaptersDropDown: boolean,
}

export interface ISettings {
  version: number;
  general: {
    showGoToTopButton: boolean,
  };
  chapter: IChapterSettings;
  bookSelector: IBookSelectorSettings;
}

