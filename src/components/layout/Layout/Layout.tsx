import React from 'react';

import s from './Layout.module.css';
import { LayoutProps } from './Layout.types';

import { Footer, Header } from 'components';

const Layout = ({ dataTestId }: LayoutProps) => (
  <div className={s.container} data-testid={dataTestId}>
    <Header />
    <Footer />
  </div>
);

export default Layout;
