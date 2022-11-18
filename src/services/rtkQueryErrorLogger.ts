import { isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';

import { IErrorResponse } from 'interfaces';
import { setUser } from 'store';
import { removeSavedUser } from 'utils';

import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action: PayloadAction<IErrorResponse>) => {
    if (isRejectedWithValue(action)) {
      const data = action.payload;
      if (data.statusCode === 401) {
        removeSavedUser();
        api.dispatch(setUser(null));
      }
    }
    return next(action);
  };
