import React from 'react';
import { Outlet } from 'react-router-dom';

import s from './Main.module.css';
import { MainProps } from './Main.types';

const Main = ({ dataTestId }: MainProps) => (
  <main className={s.container} data-testid={dataTestId}>
    <Outlet />
  </main>
);

export default Main;
