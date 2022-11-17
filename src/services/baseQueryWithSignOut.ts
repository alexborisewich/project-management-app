import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

import { baseQuery } from './baseQuery';

import { setUser } from 'store';
import { removeSavedUser } from 'utils';

export const baseQueryWithSignOut: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(setUser(null));
    removeSavedUser();
  }

  return result;
};
