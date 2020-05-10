import { BibleVersionId } from '../../bible/bible.interfaces';

export interface Config {
  defaultVersionId: BibleVersionId;
  defaultLanguage: string;
}

// Made it one level to avoid importing libs for deep extend
// that is needed when a new option is added and user has no
// the option in his saved settings
export interface Settings {
  showGoToTopButton: boolean,

  showStrongInText: boolean,
  highlightJesusWords: boolean,
  fullBookHeadersInText: boolean,

  showChaptersInText: boolean,
  showChaptersInBookSelector: boolean,
  hugePrevNextChapterBtns: boolean,
}

export interface AppState {
  started: boolean;
}

export interface User {
  name: string;
  settings: Settings;
}

