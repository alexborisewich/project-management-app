import { IAppState } from 'interfaces';
import { loadUser } from 'utils';

const loadingLocal = loadUser();
export const initialState: IAppState = {
  user: loadingLocal,
};
