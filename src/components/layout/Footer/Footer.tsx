import React from 'react';

import { s, types } from './';

import GitHubLogo from './../../../assets/svg/github.svg';
import CourseLogo from './../../../assets/svg/rs_logo.svg';

const Footer = ({ dataTestId }: types.FooterProps) => (
  <footer className={s.container} data-testid={dataTestId}>
    <a href='https://rs.school/react/'>
      <img className={s.rsschool__wrapper} src={CourseLogo} alt='RS School logo' />
    </a>
    <div className={s.creator__wrapper}>
      <a className={s.creator__link} href='https://github.com/alexborisewich'>
        <img src={GitHubLogo} alt='GitHub logo' className={s.creator__img} />
        Aliaksei Barysewich
      </a>
      <a className={s.creator__link} href='https://github.com/MuJlblii'>
        <img src={GitHubLogo} alt='GitHub logo' className={s.creator__img} />
        Ihar Pavetka
      </a>
      <a className={s.creator__link} href='https://github.com/alexgradus'>
        <img src={GitHubLogo} alt='GitHub logo' className={s.creator__img} />
        Aliaksandr Sakalouski
      </a>
    </div>
    <div className={s.year}>
      <p>2022. React 2022Q3</p>
    </div>
  </footer>
);

export default Footer;
