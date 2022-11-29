import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';

import { ISignedInUser } from 'interfaces';

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ISignedInUser | null>) => void (state.user = action.payload),
    setBoardId: (state, action: PayloadAction<string>) => void (state.boardId = action.payload),
  },
});

export default appSlice.reducer;
export const { setUser, setBoardId } = appSlice.actions;
