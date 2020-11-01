import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store/rootReducer';
import { BibleState } from 'features/Bible/Bible.interfaces';

const bibleStateSlice = createSlice({
  name: 'bibleState',
  initialState: {
    version: null,
    book: null,
    chapter: null,
  },
  reducers: {},
});

//export const {} = createSlice.actions;

export const bibleStateReducer = bibleStateSlice.reducer;

export const selectBibleState = (state: RootState): BibleState => {
  return state.bibleState;
};

