import { createSlice } from '@reduxjs/toolkit';

import { defaultSettings } from '../settings/defaultSettings';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: defaultSettings,
  reducers: {},
});

export const settingsReducer = settingsSlice.reducer;

