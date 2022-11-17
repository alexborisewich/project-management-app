import { configureStore } from '@reduxjs/toolkit';

import reducer from './appSlice';

import api from 'services';

export const store = configureStore({
  reducer: {
    app: reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export default store;
