import { LOCAL_STORAGE_KEYS } from 'data';
import { ISignedInUser } from 'interfaces';

export const saveUser = (user: ISignedInUser) => localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user));

export const removeSavedUser = () => localStorage.removeItem(LOCAL_STORAGE_KEYS.user);
