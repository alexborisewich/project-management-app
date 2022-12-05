// auth
export interface IUserSignIn {
  login: string;
  password: string;
}

export interface IUserSignUp extends IUserSignIn {
  name: string;
}

export interface ISuccessSignIn {
  exp?: number;
  id: string;
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
  _id: string;
  id: string;
}
export interface IGetBoardById extends INewBoard {
  _id: string;
}

// columns
export interface INewColumn {
  title: string;
  order: number;
}

export interface IColumn extends INewColumn {
  _id: string;
  id: string;
  boardId: string;
}

export interface INewSetColumns extends INewColumn {
  boardId: string;
}

export interface IUpdateSetColumns {
  id?: string;
  order: number;
  _id?: string;
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
  id?: string;
  order: number;
  columnId: string;
  _id?: string;
}

// files
export interface IFile {
  id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
}

export interface IFileUpload {
  boardId: string;
  taskId: string;
  file: File;
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

export interface IAPIError {
  data: IErrorResponse;
  status: number;
}
export interface Props<T> {
  boardId: T;
}
export interface IChangableTask {
  _id: string;
  title: string;
  order: number;
  description?: string;
  userId?: string;
  users?: string[];
  columnId?: string;
}
