import React from 'react';

import { s, types } from './';

const SignUpPage = ({ dataTestId }: types.SignUpPageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    SignUp
  </section>
);

export default SignUpPage;
