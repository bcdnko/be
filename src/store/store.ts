import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  }
});

export type AppDispatch = typeof store.dispatch;

export default store;

