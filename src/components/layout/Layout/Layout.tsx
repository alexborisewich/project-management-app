import React from 'react';

import s from './Layout.module.css';
import { LayoutProps } from './Layout.types';

import { Header } from 'components';

const Layout = ({ dataTestId }: LayoutProps) => (
  <div className={s.container} data-testid={dataTestId}>
    <Header />
  </div>
);

export default Layout;
