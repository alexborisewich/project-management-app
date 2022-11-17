import jwtDecode from 'jwt-decode';

import { IExtendedJwtPayload } from 'interfaces';

export const decodeUserToken = (token: string) => {
  const { id, exp } = jwtDecode<IExtendedJwtPayload>(token);
  return { token, id, exp };
};
