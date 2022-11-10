import React from 'react';

import s from './WelcomePage.module.css';
import { WelcomePageProps } from './WelcomePage.types';

const WelcomePage = ({ dataTestId }: WelcomePageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    WelcomePage
  </section>
);

export default WelcomePage;
