import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout, MainPage, NotFoundPage, ProfilePage, SignInPage, SignUpPage, WelcomePage } from 'components';

const App = () => (
  <BrowserRouter basename='/project-management-app'>
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/boards' element={<MainPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
