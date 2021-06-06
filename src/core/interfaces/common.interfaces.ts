import { BibleVersionId } from './Bible.interfaces';

export interface Config {
  version: string; // ?????????????????
  projectName: string;
  defaultVersionId: BibleVersionId;
  defaultLanguage: string;
}

export interface Settings {
  showGoToTopButton: boolean,

  showStrongInText: boolean,
  highlightJesusWords: boolean,
  fullBookHeadersInText: boolean,

  showChaptersInText: boolean,
  showChaptersInBookSelector: boolean,
  hugePrevNextChapterBtns: boolean,
}

