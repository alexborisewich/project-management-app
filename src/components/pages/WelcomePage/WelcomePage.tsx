import React from 'react';

import { s, types } from './';

import Image from './../../../assets/images/main.png';
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
    <div className={s.block__wrapper}>
      <h1>Welcome to Project manager application</h1>
      <p>
        Kanban - is an application with a wide range of possibilities for creating and managing boards. React 2022Q1
      </p>
    </div>
    <div className={s.block__wrapper}>
      <img src={Image} alt='Welcome' className={s.img} />
    </div>

    <div className={s.block__wrapper_creator}>
      <h2 className={s.creator__header}>About us</h2>
      <div className={s.creator__div}>
        {info.map((el, index) => (
          <Creator name={el.name} feature={el.feature} key={index} />
        ))}
      </div>
    </div>
  </section>
);

export default WelcomePage;
