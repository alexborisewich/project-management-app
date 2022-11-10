import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from 'components';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
