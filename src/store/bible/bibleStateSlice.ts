import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { BibleState } from 'features/Bible/Bible.interfaces';

const bibleStateSlice = createSlice({
  name: 'bibleState',
  initialState: {
    version: null,
    book: null,
    chapter: null,
  },
  reducers: {
    // TODO
    changeChapter: (state, action: PayloadAction<any>) => {
      const { versionId, bookId, chapter } = action.payload;

      return {
        version: versionId,
        book: bookId,
        chapter: chapter,
      };
    }
  },
});

export const { changeChapter } = bibleStateSlice.actions;

export const bibleStateReducer = bibleStateSlice.reducer;

export const selectBibleState = (state: RootState): BibleState => {
  return state.bibleState;
};

