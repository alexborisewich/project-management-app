import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { s, types } from './';

const Main = ({ dataTestId }: types.MainProps) => (
  <main className={s.container} data-testid={dataTestId}>
    <Outlet />
    <ToastContainer
      position='bottom-right'
      autoClose={2500}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='colored'
    />
  </main>
);

export default Main;
