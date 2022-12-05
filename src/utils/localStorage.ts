import { LOCAL_STORAGE_KEYS } from 'data';
import { ISignedInUser } from 'interfaces';

export const saveUser = (user: ISignedInUser) => localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user));
export const saveBoardId = (boardId: string) =>
  localStorage.setItem(LOCAL_STORAGE_KEYS.boardId, JSON.stringify(boardId));

export const getSavedUser = () =>
  localStorage.getItem(LOCAL_STORAGE_KEYS.user)
    ? (JSON.parse(localStorage[LOCAL_STORAGE_KEYS.user] as string) as ISignedInUser)
    : null;

export const getBoardId = () => JSON.parse(localStorage[LOCAL_STORAGE_KEYS.boardId] as string) as string;

export const isSavedUserValid = ({ exp }: ISignedInUser) => (exp ? exp * 1000 > Date.now() : false);

export const removeSavedUser = () => localStorage.removeItem(LOCAL_STORAGE_KEYS.user);
