import React from 'react';

import s from './MainPage.module.css';
import { MainPageProps } from './MainPage.types';

const MainPage = ({ dataTestId }: MainPageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    MainPage
  </section>
);

export default MainPage;
