import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { hashById } from 'core/utils/hashById';
import { RootState } from 'store/rootReducer';
import { BibleVersion } from 'features/Bible/Bible.interfaces';
import { BibleVersionStored } from 'core/interfaces/Bible.interfaces';
import { getBibleVersionUrl } from 'features/Bible/BibleUrls';

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
    all: [],
    hashed: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBibleVersions.fulfilled, (state, action) => {
      const versions = action.payload.map((version: BibleVersionStored): BibleVersion => {
        return {
          ...version,
          url: getBibleVersionUrl(version)
        };
      });

      return {
        all: versions,
        hashed: hashById(versions),
      };
    });
  }
});

export const bibleVersionsReducer = versionsSlice.reducer;

export const selectVersions = (state: RootState): BibleVersion[] => {
  return state.bibleVersions.all;
};

export const selectHashedVersions = (state: RootState): { [key: string]: BibleVersion } => {
  return state.bibleVersions.hashed;
};

