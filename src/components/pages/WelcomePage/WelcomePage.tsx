import React from 'react';

import { s, types } from './';

const WelcomePage = ({ dataTestId }: types.WelcomePageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    WelcomePage
  </section>
);

export default WelcomePage;
