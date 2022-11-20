import React from 'react';

import { types } from './';

import { Board, Footer, Header, Main } from 'components';

const Layout: React.FC<types.LayoutProps> = () => (
  <>
    <Header />
    <Main />
    <Footer />
    <Board />
  </>
);

export default Layout;
