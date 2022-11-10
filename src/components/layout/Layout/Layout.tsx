import React from 'react';

import s from './Layout.module.css';
import { LayoutProps } from './Layout.types';

import { Footer, Header, Main } from 'components';

const Layout = ({ dataTestId }: LayoutProps) => (
  <div className={s.container} data-testid={dataTestId}>
    <Header />
    <Main />
    <Footer />
  </div>
);

export default Layout;
