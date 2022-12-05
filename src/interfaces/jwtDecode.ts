import { JwtPayload } from 'jwt-decode';

export interface IExtendedJwtPayload extends JwtPayload {
  id: string;
  login: string;
}
