import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hashById } from '../../core/utils/hashById';
import { RootState } from '../rootReducer';

export const fetchBibleVersions = createAsyncThunk(
  'bibleVersions/fetchAll',
  async (thunkAPI) => {
    const response = await fetch('/bible/versions.json');
    return response.json();
  }
);

const versionsSlice = createSlice({
  name: 'bibleVersions',
  initialState: {
    all: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBibleVersions.fulfilled, (state, action) => {
      state.all = hashById(action.payload);
    });
  }
});

//export const {} = createSlice.actions;
export const versionsReducer = versionsSlice.reducer;
export const selectVersions = (state: RootState) => state.bibleVersions.all;

