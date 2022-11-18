export enum PATHS {
  base = '/project-management-app',
  welcome = '/',
  signIn = '/login',
  signUp = '/registration',
  main = '/boards',
  board = '/boards/:id',
  profile = '/profile',
  error = '/error',
  notFound = '*',
}

export enum PRIVACY_REASONS {
  userOnly = 'userOnly',
  notForUser = 'notForUser',
}
