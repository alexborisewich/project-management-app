import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => void (state.token = action.payload),
  },
});

export default appSlice.reducer;
export const { setToken } = appSlice.actions;
