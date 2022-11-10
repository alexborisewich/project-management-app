import React from 'react';

import s from './Footer.module.css';
import { FooterProps } from './Footer.types';

const Footer = ({ dataTestId }: FooterProps) => (
  <div className={s.container} data-testid={dataTestId}>
    Footer
  </div>
);

export default Footer;
