import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import store from 'store';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { user } = (getState() as ReturnType<typeof store.getState>).app;
    if (user) {
      headers.set('authorization', `Bearer ${user.token}`);
      sessionStorage.setItem('tokenData', JSON.stringify(user.token));
    }
    return headers;
  },
});
