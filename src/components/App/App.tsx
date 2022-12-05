import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  Layout,
  MainPage,
  NotFoundPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  WelcomePage,
  ErrorPage,
  PrivateRoute,
  BoardRoutes,
  ErrorBoundary,
} from 'components';
import { PATHS, PRIVACY_REASONS } from 'data';
import { useAppSelector } from 'hooks';

const App = () => {
  const { user } = useAppSelector((state) => state.app);
  return (
    <BrowserRouter basename={PATHS.base}>
      <ErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route path={PATHS.welcome} element={<WelcomePage />} />
            <Route path={PATHS.error} element={<ErrorPage />} />
            <Route element={<PrivateRoute privacyReason={PRIVACY_REASONS.notForUser} isAvailable={!user} />}>
              <Route path={PATHS.signIn} element={<SignInPage />} />
              <Route path={PATHS.signUp} element={<SignUpPage />} />
            </Route>
            <Route element={<PrivateRoute privacyReason={PRIVACY_REASONS.userOnly} isAvailable={!!user} />}>
              <Route path={PATHS.main} element={<MainPage />} />
              <Route path={PATHS.board} element={<BoardRoutes />} />
              <Route path={PATHS.profile} element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path={PATHS.notFound} element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
