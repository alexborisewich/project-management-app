import React from 'react';

import s from './NotFoundPage.module.css';
import { NotFoundPageProps } from './NotFoundPage.types';

const NotFoundPage = ({ dataTestId }: NotFoundPageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    NotFound
  </section>
);

export default NotFoundPage;
