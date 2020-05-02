import { Injectable } from '@angular/core';

import {
  BibleState,
} from './bible.interfaces';

@Injectable()
export class BibleNavigationService {
  getPreviousChapter(state: BibleState): BibleState {
    if (state.chapter > 1) {
      return {
        ...state,
        chapter: state.chapter - 1,
      };
    }

    return null;
  }

  getNextChapter(state: BibleState): BibleState {
    if (state.chapter !== state.book.chapters) {
      return {
        ...state,
        chapter: state.chapter + 1,
      };
    }

    return null;
  }
}
