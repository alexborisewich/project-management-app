import React from 'react';
import { Outlet } from 'react-router-dom';

import { s, types } from './';

const Main = ({ dataTestId }: types.MainProps) => (
  <main className={s.container} data-testid={dataTestId}>
    <Outlet />
  </main>
);

export default Main;
