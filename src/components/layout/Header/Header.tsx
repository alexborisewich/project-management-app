import React from 'react';

import s from './Header.module.css';
import { HeaderProps } from './Header.types';

const Header = ({ dataTestId }: HeaderProps) => (
  <header className={s.container} data-testid={dataTestId}>
    Header
  </header>
);

export default Header;
