// auth
export interface IUserSignIn {
  login: string;
  password: string;
}

export interface IUserSignUp extends IUserSignIn {
  name: string;
}

export interface ISuccessSignIn {
  token: string;
}

// user
export interface IUser {
  id: string;
  name: string;
  login: string;
}

// boards
export interface INewBoard {
  title: string;
  owner: string;
  users: string[];
}

export interface IBoard extends INewBoard {
  id: string;
}

// columns
export interface INewColumn {
  title: string;
  order: number;
}

export interface IColumn extends INewColumn {
  id: string;
  boardId: string;
}

export interface INewSetColumns extends INewColumn {
  boardId: string;
}

export interface IUpdateSetColumns {
  id: string;
  order: number;
}

// tasks
export interface INewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface ITask extends INewTask {
  id: string;
  boardId: string;
  columnId: string;
}

export interface IUpdateTask extends INewTask {
  columnId: string;
}

export interface IUpdateSetTasks {
  id: string;
  order: number;
  columnId: string;
}

// files
export interface IFile {
  id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

// points
export interface INewPoint {
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}

export interface IPoint extends INewPoint {
  id: string;
}

export interface IUpdateSetPoints {
  id: string;
  done: boolean;
}

export interface IUpdatePoint {
  title: string;
  done: boolean;
}

// error
export interface IErrorResponse {
  statusCode: number;
  message: string;
}
