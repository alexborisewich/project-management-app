import React from 'react';

import { s, types } from './';

const Footer = ({ dataTestId }: types.FooterProps) => (
  <footer className={s.container} data-testid={dataTestId}>
    Footer
  </footer>
);

export default Footer;
