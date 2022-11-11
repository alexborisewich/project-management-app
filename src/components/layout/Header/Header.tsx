import React from 'react';

import { s, types } from './';

const Header = ({ dataTestId }: types.HeaderProps) => (
  <header className={s.container} data-testid={dataTestId}>
    Header
  </header>
);

export default Header;
