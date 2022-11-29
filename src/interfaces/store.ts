import { ISignedInUser } from './app';

export interface IAppState {
  user: ISignedInUser | null;
  boardId: string;
}
