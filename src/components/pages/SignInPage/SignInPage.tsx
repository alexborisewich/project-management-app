import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { s, types } from './';

import { useAppDispatch, useSignInMutation } from 'hooks';
import { IUserSignIn } from 'interfaces';
import { setUser } from 'store';
import { loginValidation, onPromiseHandler, passwordValidation, saveUser } from 'utils';

const SignInPage = ({ dataTestId }: types.SignInPageProps) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<IUserSignIn>();
  const [signIn] = useSignInMutation();
  const { errors } = useFormState({ control });

  const onSubmit = handleSubmit(async (signInData) => {
    const userData = await signIn(signInData).unwrap();
    if (userData) {
      dispatch(setUser(userData));
      saveUser(userData);
    }
  });

  return (
    <section className={s.container} data-testid={dataTestId}>
      <form onSubmit={onPromiseHandler(onSubmit)} className={s.form}>
        <h3 className={s.form__title}>Sign In</h3>
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
          defaultValue=''
          rules={passwordValidation}
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
        <Link to='/registration' className={s.form__link}>
          Don`t have an account? Sign up
        </Link>
        <Button variant='contained' type='submit' sx={{ marginTop: '30px' }}>
          Submit
        </Button>
      </form>
    </section>
  );
};

export default SignInPage;
