import { isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { IAPIError } from 'interfaces';
import { setUser } from 'store';
import { removeSavedUser } from 'utils';

import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: PayloadAction<IAPIError>) => {
  if (isRejectedWithValue(action)) {
    const { data } = action.payload;
    if (data.statusCode === 401) {
      removeSavedUser();
      api.dispatch(setUser(null));
    }
    toast.error(data.message);
  }
  return next(action);
};
