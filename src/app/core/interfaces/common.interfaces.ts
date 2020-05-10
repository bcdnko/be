import { BibleVersionId } from '../../bible/bible.interfaces';

export interface Config {
  defaultVersionId: BibleVersionId;
  defaultLanguage: string;
}

export interface Settings {
  general: {
    showGoToTopButton: boolean,
  },
  bible: {
    showStrong: boolean,
    highlightJesusWords: boolean,
    fullBookHeadersInText: boolean,

    showChaptersInText: boolean,
    showChaptersInBookSelector: boolean,
    hugePrevNextChapterBtns: boolean,
  },
}

export interface AppState {
  started: boolean;
}

export interface User {
  name: string;
  settings: Settings;
}

