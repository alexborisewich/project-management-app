import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  Board,
  Layout,
  MainPage,
  NotFoundPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  WelcomePage,
  ErrorPage,
} from 'components';
import { PATHS } from 'data';

const App = () => (
  <BrowserRouter basename={PATHS.base}>
    <Routes>
      <Route element={<Layout />}>
        <Route path={PATHS.welcome} element={<WelcomePage />} />
        <Route path={PATHS.main} element={<MainPage />} />
        <Route path={PATHS.board} element={<Board />} />
        <Route path={PATHS.signIn} element={<SignUpPage />} />
        <Route path={PATHS.signUp} element={<SignInPage />} />
        <Route path={PATHS.profile} element={<ProfilePage />} />
        <Route path={PATHS.error} element={<ErrorPage />} />
      </Route>
      <Route path={PATHS.notFound} element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
