import React from 'react';

import { types } from './';

import { Footer, Header, Main } from 'components';

const Layout: React.FC<types.LayoutProps> = () => (
  <>
    <Header />
    <Main />
    <Footer />
  </>
);

export default Layout;
