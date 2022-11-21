import React from 'react';

import { s, types } from './';

import Board from 'components/Board';

const MainPage = ({ dataTestId }: types.MainPageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    <Board />
  </section>
);

export default MainPage;
