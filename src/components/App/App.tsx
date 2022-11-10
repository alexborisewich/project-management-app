import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout, MainPage, WelcomePage } from 'components';

const App = () => (
  <BrowserRouter basename='/project-management-app'>
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/boards' element={<MainPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
