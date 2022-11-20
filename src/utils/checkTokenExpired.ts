import { removeSavedUser } from './localStorage';

import { useAppDispatch, useAppSelector } from 'hooks';
import { setUser } from 'store';

export const CheckTokenExpired = () => {
  const state = useAppSelector((state) => state.app.user);
  const tokenExpired = new Date((state?.exp || 0) * 1000);
  const currentDate = new Date();
  const dispatch = useAppDispatch();
  if (currentDate > tokenExpired && state?.token) {
    removeSavedUser();
    dispatch(setUser(null));
  } else return;
};
