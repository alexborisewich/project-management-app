import React from 'react';

import { s, types } from './';

const Header = ({ dataTestId }: types.HeaderProps) => (
  <header className={s.container} data-testid={dataTestId}>
    <span>Logo</span>
    <div className={s.wrapper__btns}>
      <button className={s.btn}>Sign In</button>
      <button className={s.btn}>Sign Up</button>
      <button className={s.btn}>Color</button>
      <button className={s.btn}>Eng/Rus</button>
    </div>
  </header>
);

export default Header;
