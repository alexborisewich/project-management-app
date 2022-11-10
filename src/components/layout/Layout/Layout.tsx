import React from 'react';

import { LayoutProps } from './Layout.types';

import { Footer, Header, Main } from 'components';

const Layout: React.FC<LayoutProps> = () => (
  <>
    <Header />
    <Main />
    <Footer />
  </>
);

export default Layout;
