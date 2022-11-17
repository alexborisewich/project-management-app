import { ISignedInUser } from './app';

export interface IAppState {
  user: ISignedInUser | null;
}
