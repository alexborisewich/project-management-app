import React from 'react';

import { s, types } from './';

const MainPage = ({ dataTestId }: types.MainPageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    MainPage
  </section>
);

export default MainPage;
