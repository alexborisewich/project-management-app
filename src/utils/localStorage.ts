import { LOCAL_STORAGE_KEYS } from 'data';
import { ISignedInUser } from 'interfaces';

export const saveUser = (user: ISignedInUser) => localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user));

export const getSavedUser = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.user)
    ? (JSON.parse(localStorage[LOCAL_STORAGE_KEYS.user] as string) as ISignedInUser)
    : null;

export const isSavedUserValid = ({ exp }: ISignedInUser) => (exp ? exp * 1000 > Date.now() : false);

export const removeSavedUser = () => localStorage.removeItem(LOCAL_STORAGE_KEYS.user);
