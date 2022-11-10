import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout, WelcomePage } from 'components';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<WelcomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
