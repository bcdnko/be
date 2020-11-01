import { combineReducers } from '@reduxjs/toolkit';

import { configReducer } from './configSlice';
import { bibleVersionsReducer } from './bible/versionsSlice';
import { bibleStateReducer } from './bible/bibleStateSlice';
import { settingsReducer } from './settings/settingsSlice';

const rootReducer = combineReducers({
  config: configReducer,
  settings: settingsReducer,
  bibleVersions: bibleVersionsReducer,
  bibleState: bibleStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

