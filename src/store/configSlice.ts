import { createSlice } from '@reduxjs/toolkit';

import { config } from '../config';

const configSlice = createSlice({
  name: 'config',
  initialState: config,
  reducers: {},
});

export const configReducer = configSlice.reducer;

