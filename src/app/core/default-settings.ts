import { Settings } from './interfaces/common.interfaces';

export const defaultSettings: Settings = {
  general: {
    showGoToTopButton: true,
  },
  bible: {
    showStrong: false,
    highlightJesusWords: true,
    fullBookHeadersInText: true,

    showChaptersInText: true,
    showChaptersInBookSelector: true,
    hugePrevNextChapterBtns: true,
  },
};
