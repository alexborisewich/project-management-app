import React from 'react';

import { s, types } from './';

import Creator from './Creator';
const info = [
  {
    name: 'Aliaksei Barysewich',
    feature: ['...', ',,,', '...'],
  },
  {
    name: 'Ihar Pavetka',
    feature: ['...', ',,,', '...'],
  },
  {
    name: 'Aliaksandr Sakalouski',
    feature: ['...', ',,,', '...'],
  },
];

const WelcomePage = ({ dataTestId }: types.WelcomePageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    <h1>Welcome to Project manager application</h1>
    <p>We try to create the best app of todo list</p>
    <div className={s.wrapper__creator}>
      {info.map((el, index) => (
        <Creator name={el.name} feature={el.feature} key={index} />
      ))}
    </div>
  </section>
);

export default WelcomePage;
