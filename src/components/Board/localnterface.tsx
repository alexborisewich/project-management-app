export interface iUsersCount {
  _id: string;
  name: string;
  login: string;
}
export interface iUser {
  name: string;
  login: string;
  password: string;
}

export interface iUserEntry {
  login: string;
  password: string;
}
export interface iToken {
  token: string;
}

export interface iCreateBoard {
  title: string;
  owner: string;
  users: string[];
}
export interface iDecode {
  id: string;
  login: string;
  iat: number;
  exp: number;
}
export interface iBoards {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}
