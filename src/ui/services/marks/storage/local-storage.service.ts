import {
  ChapterRef,
  VerseRef,
} from '../../../../core/interfaces/Bible.interfaces';
import {
  ChapterMarks,
  MarksApi,
  VerseMarkSymbol,
} from '../marks-api.interfaces';

const STORAGE_KEY = 'marks';

function getChapterKey(ref: ChapterRef) {
  return ref.bookId + '_' + ref.chapter;
}

export class MarksApiLocalStorage implements MarksApi {
  private _getAllMarks() {
    const rawMarks = localStorage.getItem(STORAGE_KEY);
    const marks = rawMarks ? JSON.parse(rawMarks) : ({} as ChapterMarks);

    if (!marks) {
      throw new Error('Can not read marks');
    }

    return marks;
  }

  private async _updateMark(
    symbol: VerseMarkSymbol,
    ref: VerseRef,
    value: boolean
  ): Promise<void> {
    const chapterKey = getChapterKey(ref);

    const allMarks = this._getAllMarks();
    const chapterMarks = allMarks[chapterKey] ?? {};
    const verseMarks = chapterMarks[ref.verseNum] ?? {};

    if (value) {
      verseMarks[symbol] = true;
    } else {
      delete verseMarks[symbol];
    }

    const result = {
      ...allMarks,
      [chapterKey]: {
        ...chapterMarks,
        [ref.verseNum]: verseMarks,
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  }

  async addMark(symbol: VerseMarkSymbol, ref: VerseRef): Promise<void> {
    return this._updateMark(symbol, ref, true);
  }

  async removeMark(symbol: VerseMarkSymbol, ref: VerseRef): Promise<void> {
    return this._updateMark(symbol, ref, false);
  }

  async getChapterMarks(ref: ChapterRef): Promise<ChapterMarks> {
    const allMarks = this._getAllMarks();
    const marks = allMarks[getChapterKey(ref)];

    console.log(marks);
    return marks ?? {};
  }
}
