import React from 'react';

import s from './SignUpPage.module.css';
import { SignUpPageProps } from './SignUpPage.types';

const SignUpPage = ({ dataTestId }: SignUpPageProps) => (
  <section className={s.container} data-testid={dataTestId}>
    SignUp
  </section>
);

export default SignUpPage;
