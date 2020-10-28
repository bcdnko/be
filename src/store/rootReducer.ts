import { combineReducers } from '@reduxjs/toolkit';
import { versionsReducer } from './bible/versions';

const rootReducer = combineReducers({
  bibleVersions: versionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

