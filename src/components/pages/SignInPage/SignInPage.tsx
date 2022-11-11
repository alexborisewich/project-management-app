import React from 'react';

import { s, types } from './';

const SignInPage = ({ dataTestId }: types.SignInPageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    SignIn
  </section>
);

export default SignInPage;
