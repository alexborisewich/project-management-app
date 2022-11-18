import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from './baseQuery';

import { API_ENDPOINTS } from 'data';
import {
  IUserSignUp,
  IUserSignIn,
  IUser,
  IBoard,
  INewBoard,
  IColumn,
  INewColumn,
  ITask,
  INewTask,
  IUpdateTask,
  ISuccessSignIn,
  IUpdateSetColumns,
  IUpdateSetTasks,
  IFile,
  IFileUpload,
  IPoint,
  INewPoint,
  IUpdateSetPoints,
  IUpdatePoint,
  INewSetColumns,
} from 'interfaces';
import { decodeUserToken } from 'utils';

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Boards', 'Columns', 'Files', 'Points', 'Tasks', 'Users'],
  endpoints: (build) => ({
    // user
    signUp: build.mutation<IUser, IUserSignUp>({
      query: (body: IUserSignUp) => ({ url: API_ENDPOINTS.signup, method: 'POST', body }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    signIn: build.mutation<ISuccessSignIn, IUserSignIn>({
      query: (body: IUserSignIn) => ({ url: API_ENDPOINTS.signin, method: 'POST', body }),
      transformResponse: async (response: Promise<ISuccessSignIn>) => decodeUserToken((await response).token),
    }),

    getAllUsers: build.query<IUser[], void>({
      query: () => ({ url: API_ENDPOINTS.users }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Users' as const, id })), { type: 'Users', id: 'LIST' }]
          : [{ type: 'Users', id: 'LIST' }],
    }),

    getUserById: build.query<IUser, string>({
      query: (userId) => ({ url: `${API_ENDPOINTS.users}/${userId}` }),
      providesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    updateUserById: build.mutation<IUser, { body: IUserSignUp; userId: string }>({
      query: ({ body, userId }) => ({ url: `${API_ENDPOINTS.users}/${userId}`, method: 'PUT', body }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    deleteUserById: build.mutation<void, string>({
      query: (userId) => ({ url: `${API_ENDPOINTS.users}/${userId}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    // boards
    getAllBoards: build.query<IBoard[], void>({
      query: () => ({ url: API_ENDPOINTS.boards }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Boards' as const, id })), { type: 'Boards', id: 'LIST' }]
          : [{ type: 'Boards', id: 'LIST' }],
    }),

    createBoard: build.mutation<IBoard, INewBoard>({
      query: (body: INewBoard) => ({ url: API_ENDPOINTS.boards, method: 'POST', body }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),

    getBoardById: build.query<IBoard, string>({
      query: (boardId) => ({ url: `${API_ENDPOINTS.boards}/${boardId}` }),
      providesTags: [{ type: 'Boards', id: 'LIST' }],
    }),

    updateBoardById: build.mutation<IBoard, { body: INewBoard; boardId: string }>({
      query: ({ body, boardId }) => ({
        url: `${API_ENDPOINTS.boards}/${boardId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),

    deleteBoardById: build.mutation<null, string>({
      query: (boardId) => ({ url: `${API_ENDPOINTS.boards}/${boardId}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),

    getBoardsByIdList: build.query<IBoard[], string[]>({
      query: () => ({ url: API_ENDPOINTS.boardsSet }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Boards' as const, id })), { type: 'Boards', id: 'LIST' }]
          : [{ type: 'Boards', id: 'LIST' }],
    }),

    getBoardsByUserId: build.query<IBoard[], string>({
      query: (userId) => ({ url: `${API_ENDPOINTS.boardsSet}/${userId}` }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Boards' as const, id })), { type: 'Boards', id: 'LIST' }]
          : [{ type: 'Boards', id: 'LIST' }],
    }),

    // columns
    getColumnsInBoard: build.query<IColumn[], string>({
      query: (boardId: string) => ({ url: `${API_ENDPOINTS.boards}/${boardId}/${API_ENDPOINTS.columns}` }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Columns' as const, id })), { type: 'Columns', id: 'LIST' }]
          : [{ type: 'Columns', id: 'LIST' }],
    }),

    createColumn: build.mutation<IColumn, { body: INewColumn; boardId: string }>({
      query: ({ body, boardId }) => ({
        url: `${API_ENDPOINTS.boards}/${boardId}/${API_ENDPOINTS.columns}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    getColumnById: build.query<IColumn, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `${API_ENDPOINTS.boards}/${boardId}/${API_ENDPOINTS.columns}/${columnId}`,
      }),
      providesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    updateColumnById: build.mutation<IColumn, { body: INewColumn; boardId: string; columnId: string }>({
      query: ({ body, boardId, columnId }) => ({
        url: `${API_ENDPOINTS.boards}/${boardId}/${API_ENDPOINTS.columns}/${columnId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    deleteColumnById: build.mutation<null, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `${API_ENDPOINTS.boards}/${boardId}/${API_ENDPOINTS.columns}/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    getColumnsByParams: build.query<IColumn[], string[] | string>({
      query: () => ({ url: API_ENDPOINTS.columnsSet }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Columns' as const, id })), { type: 'Columns', id: 'LIST' }]
          : [{ type: 'Columns', id: 'LIST' }],
    }),

    updateSetOfColumns: build.mutation<IColumn[], IUpdateSetColumns[]>({
      query: (body) => ({
        url: API_ENDPOINTS.columnsSet,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    createSetOfColumns: build.mutation<IColumn[], INewSetColumns[]>({
      query: (body) => ({ url: API_ENDPOINTS.columnsSet, method: 'POST', body }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    // tasks
    getTasksInColumn: build.query<ITask[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `${API_ENDPOINTS.boards}/${boardId}/${API_ENDPOINTS.columns}/${columnId}/${API_ENDPOINTS.tasks}`,
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Tasks' as const, id })), { type: 'Tasks', id: 'LIST' }]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),

    createTask: build.mutation<ITask, { body: INewTask; boardId: string; columnId: string }>({
      query: ({ body, boardId, columnId }) => ({
        url: `${API_ENDPOINTS.boards}/${boardId}/columns/${columnId}/${API_ENDPOINTS.tasks}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    getTaskById: build.query<ITask, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `${API_ENDPOINTS.boards}/${boardId}/${API_ENDPOINTS.columns}/${columnId}/${API_ENDPOINTS.tasks}/${taskId}`,
      }),
      providesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    updateTaskById: build.mutation<ITask, { body: IUpdateTask; boardId: string; columnId: string; taskId: string }>({
      query: ({ body, boardId, columnId, taskId }) => ({
        url: `${API_ENDPOINTS.boards}/${boardId}/${API_ENDPOINTS.columns}/${columnId}/${API_ENDPOINTS.tasks}/${taskId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    deleteTaskById: build.mutation<null, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `${API_ENDPOINTS.boards}/${boardId}/${API_ENDPOINTS.columns}/${columnId}/${API_ENDPOINTS.tasks}/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    getTasksByParams: build.query<ITask[], string[] | string>({
      query: () => ({ url: API_ENDPOINTS.tasksSet }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Columns' as const, id })), { type: 'Columns', id: 'LIST' }]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),

    updateSetOfTasks: build.mutation<ITask[], IUpdateSetTasks[]>({
      query: (body) => ({ url: API_ENDPOINTS.tasksSet, method: 'PATCH', body }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),

    getTasksByBoardId: build.query<ITask[], string>({
      query: (boardId) => ({
        url: `${API_ENDPOINTS.tasksSet}/${boardId}`,
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Tasks' as const, id })), { type: 'Tasks', id: 'LIST' }]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),

    // files
    getFilesByParams: build.query<IFile[], string[] | string>({
      query: () => ({ url: API_ENDPOINTS.files }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Files' as const, id })), { type: 'Files', id: 'LIST' }]
          : [{ type: 'Files', id: 'LIST' }],
    }),

    uploadFile: build.mutation<IFile[], IFileUpload>({
      query: (body) => ({ url: API_ENDPOINTS.files, method: 'POST', body }),
      invalidatesTags: [{ type: 'Files', id: 'LIST' }],
    }),

    getFilesByBoardId: build.query<IFile[], string>({
      query: (boardId) => ({
        url: `${API_ENDPOINTS.files}/${boardId}`,
      }),
      providesTags: [{ type: 'Columns', id: 'LIST' }],
    }),

    deleteFileById: build.mutation<null, string>({
      query: (fileId) => ({
        url: `${API_ENDPOINTS.files}/${fileId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Files', id: 'LIST' }],
    }),

    // points
    getPointsByParams: build.query<IPoint[], string[] | string>({
      query: () => ({ url: API_ENDPOINTS.points }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Points' as const, id })), { type: 'Points', id: 'LIST' }]
          : [{ type: 'Points', id: 'LIST' }],
    }),

    createPoint: build.mutation<IPoint, INewPoint>({
      query: (body) => ({ url: API_ENDPOINTS.points, method: 'POST', body }),
      invalidatesTags: [{ type: 'Points', id: 'LIST' }],
    }),

    updateSetOfPoints: build.mutation<IPoint[], IUpdateSetPoints[]>({
      query: (body) => ({ url: API_ENDPOINTS.points, method: 'PATCH', body }),
      invalidatesTags: [{ type: 'Points', id: 'LIST' }],
    }),

    getPointsByTaskId: build.query<IPoint[], string>({
      query: (taskId) => ({ url: `${API_ENDPOINTS.points}/${taskId}` }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Points' as const, id })), { type: 'Points', id: 'LIST' }]
          : [{ type: 'Points', id: 'LIST' }],
    }),

    updatePointById: build.mutation<IPoint, { body: IUpdatePoint; pointId: string }>({
      query: ({ body, pointId }) => ({ url: `${API_ENDPOINTS.points}/${pointId}`, method: 'PATCH', body }),
      invalidatesTags: [{ type: 'Points', id: 'LIST' }],
    }),

    deletePointById: build.mutation<null, string>({
      query: (pointId) => ({ url: `${API_ENDPOINTS.points}/${pointId}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
  }),
});
