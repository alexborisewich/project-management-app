import React from 'react';

import { s, types } from './';

const WelcomePage = ({ dataTestId }: types.WelcomePageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    <h1>Welcome to Project manager application</h1>
    <p>We try to create the best app of todo list</p>
    <div className={s.wrapper__creator}>
      <div className={s.creator}>
        <h3>Aliaksei Barysewich</h3>
        <ul className={s.ul}>
          <li>...</li>
          <li>...</li>
          <li>...</li>
        </ul>
      </div>
      <div className={s.creator}>
        <h3>Ihar Pavetka</h3>
        <ul className={s.ul}>
          <li>...</li>
          <li>...</li>
          <li>...</li>
        </ul>
      </div>
      <div className={s.creator}>
        <h3>Aliaksandr Sakalouski</h3>
        <ul className={s.ul}>
          <li>...</li>
          <li>...</li>
          <li>...</li>
        </ul>
      </div>
    </div>
  </section>
);

export default WelcomePage;
