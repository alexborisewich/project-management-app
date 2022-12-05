import React from 'react';
import { useTranslation } from 'react-i18next';

import { s, types } from './';

import Image from './../../../assets/images/main.png';
import Creator from './Creator';
const info = [
  {
    name: 1,
    feature: 4,
  },
  {
    name: 2,
    feature: 4,
  },
  {
    name: 3,
    feature: 2,
  },
];

const WelcomePage = ({ dataTestId }: types.WelcomePageProps) => {
  const { t } = useTranslation();
  return (
    <section className={s.container} data-testid={dataTestId}>
      <div className={s.block__wrapper}>
        <h1>{t('WelcomePage.Title')}</h1>
        <p>{t('WelcomePage.Description')}</p>
      </div>
      <div className={s.block__wrapper}>
        <img src={Image} alt='Welcome' className={s.img} />
      </div>

      <div className={s.block__wrapper_creator}>
        <h2 className={s.creator__header}>{t('WelcomePage.AboutUs')}</h2>
        <div className={s.creator__div}>
          {info.map((el, index) => (
            <Creator name={el.name} feature={el.feature} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default WelcomePage;
