import React from 'react';

import s from './SignInPage.module.css';
import { SignInPageProps } from './SignInPage.types';

const SignInPage = ({ dataTestId }: SignInPageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    SignIn
  </section>
);

export default SignInPage;
