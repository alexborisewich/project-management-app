import React from 'react';

import s from './Header.module.css';
import { HeaderProps } from './Header.types';

const Header = ({ dataTestId }: HeaderProps) => (
  <div className={s.container} data-testid={dataTestId}>
    Header
  </div>
);

export default Header;
