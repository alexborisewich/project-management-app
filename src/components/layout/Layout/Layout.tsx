import React from 'react';

import s from './Layout.module.css';
import { LayoutProps } from './Layout.types';

const Layout = ({ dataTestId }: LayoutProps) => <div className={s.container} data-testid={dataTestId}></div>;

export default Layout;
