import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { s, types } from './';

import { PATHS } from 'data';
import { useAppDispatch, useSignInMutation } from 'hooks';
import { IUserSignIn } from 'interfaces';
import { setUser } from 'store';
import { loginValidation, onPromiseHandler, passwordValidation, saveUser } from 'utils';

const SignInPage = ({ dataTestId }: types.SignInPageProps) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<IUserSignIn>();
  const [signIn, { data, isError, isLoading, error }] = useSignInMutation();
  const {
    errors: { login, password },
  } = useFormState({ control });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      saveUser(data);
    }
  }, [data, dispatch]);

  const onSubmit = handleSubmit(async (signInData) => await signIn(signInData));

  return (
    <section className={s.container} data-testid={dataTestId}>
      <form
        onSubmit={onPromiseHandler(onSubmit)}
        className={isError ? `${s.form__error || ''} ${s.form || ''}` : s.form}
      >
        {error && <span className={s.form__error_msg}>{'status' in error && 'error' in error && error.error}</span>}
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
              error={!!login?.message}
              helperText={login?.message}
              autoComplete='true'
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
              type='password'
              margin='normal'
              fullWidth={true}
              error={!!password?.message}
              helperText={password?.message}
              autoComplete='true'
              {...field}
            />
          )}
        />
        <Link to={PATHS.signUp} className={s.form__link}>
          Don`t have an account? Sign up
        </Link>
        <LoadingButton loading={isLoading} variant='contained' type='submit' sx={{ marginTop: '30px' }}>
          Submit
        </LoadingButton>
      </form>
    </section>
  );
};

export default SignInPage;
