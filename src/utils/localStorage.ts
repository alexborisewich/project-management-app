import { LOCAL_STORAGE_KEYS } from 'data';
import { ISignedInUser } from 'interfaces';

export const saveUser = (user: ISignedInUser) => localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user));

export const loadUser = () => {
  if (localStorage.getItem(LOCAL_STORAGE_KEYS.user)) {
    return JSON.parse(localStorage[LOCAL_STORAGE_KEYS.user] as string) as ISignedInUser;
  } else return null;
};

export const removeSavedUser = () => localStorage.removeItem(LOCAL_STORAGE_KEYS.user);
