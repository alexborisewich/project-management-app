import React from 'react';

import { s, types } from './';

const NotFoundPage = ({ dataTestId }: types.NotFoundPageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    NotFound
  </section>
);

export default NotFoundPage;
