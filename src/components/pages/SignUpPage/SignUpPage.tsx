import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { s, types } from './';

import { PATHS } from 'data';
import { useSignUpMutation } from 'hooks';
import { IUserSignUp } from 'interfaces';
import { loginValidation, onPromiseHandler, passwordValidation } from 'utils';

const SignUpPage = ({ dataTestId }: types.SignUpPageProps) => {
  const { control, handleSubmit } = useForm<IUserSignUp>();
  const [signUp] = useSignUpMutation();
  const { errors } = useFormState({ control });

  const onSubmit = handleSubmit((data) => signUp(data));

  return (
    <section className={s.container} data-testid={dataTestId}>
      <form onSubmit={onPromiseHandler(onSubmit)} className={s.form}>
        <h3 className={s.form__title}>Sign Up</h3>
        <Controller
          name='name'
          control={control}
          rules={loginValidation}
          defaultValue=''
          render={({ field }) => (
            <TextField
              label='Name'
              size='small'
              margin='normal'
              fullWidth={true}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
              {...field}
            />
          )}
        />
        <Controller
          name='login'
          control={control}
          rules={loginValidation}
          defaultValue=''
          render={({ field }) => (
            <TextField
              label='Login'
              size='small'
              margin='normal'
              fullWidth={true}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
              {...field}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          rules={passwordValidation}
          defaultValue=''
          render={({ field }) => (
            <TextField
              label='Password'
              size='small'
              margin='normal'
              fullWidth={true}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              {...field}
            />
          )}
        />
        <Link to={PATHS.signIn} className={s.form__link}>
          You already have an account? Sign in
        </Link>
        <Button variant='contained' type='submit' sx={{ marginTop: '30px' }}>
          Submit
        </Button>
      </form>
    </section>
  );
};

export default SignUpPage;
