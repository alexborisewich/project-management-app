import { configureStore } from '@reduxjs/toolkit';

import reducer from './appSlice';

import { api } from 'services';
import { rtkQueryErrorLogger } from 'services/rtkQueryErrorLogger';

const store = configureStore({
  reducer: {
    app: reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
