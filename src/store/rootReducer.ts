import { combineReducers } from '@reduxjs/toolkit';

import { configReducer } from './config';
import { versionsReducer } from './bible/versions';
import { settingsReducer } from './settings/settings';

const rootReducer = combineReducers({
  config: configReducer,
  settings: settingsReducer,
  bibleVersions: versionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

