import React from 'react';

import s from './Footer.module.css';
import { FooterProps } from './Footer.types';

const Footer = ({ dataTestId }: FooterProps) => (
  <footer className={s.container} data-testid={dataTestId}>
    Footer
  </footer>
);

export default Footer;
