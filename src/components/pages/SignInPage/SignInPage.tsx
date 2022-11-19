import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { s, types } from './';

import { useAppDispatch, useSignInMutation } from 'hooks';
import { IUserSignIn } from 'interfaces';
import { setUser } from 'store';
import { loginValidation, onPromiseHandler, passwordValidation, saveUser } from 'utils';

const SignInPage = ({ dataTestId }: types.SignInPageProps) => {
  const dispatch = useAppDispatch();
  const [errorAPI, setErrorAPI] = useState<types.ErrorType>({ data: { statusCode: 0, message: '' }, status: 0 });
  const { control, handleSubmit } = useForm<IUserSignIn>();
  const [signIn, data] = useSignInMutation();
  const { errors } = useFormState({ control });

  const onSubmit = handleSubmit(async (signInData) => {
    try {
      const userData = await signIn(signInData).unwrap();
      if (userData) {
        dispatch(setUser(userData));
        saveUser(userData);
      }
    } catch (error) {
      setErrorAPI(error as types.ErrorType);
    }
  });

  return (
    <section className={s.container} data-testid={dataTestId}>
      <form
        onSubmit={onPromiseHandler(onSubmit)}
        className={data.isError ? `${s.form__error || ''} ${s.form || ''}` : s.form}
      >
        {data.isError && <span className={s.form__error_msg}>{errorAPI.data.message}</span>}
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
              type='password'
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
        <LoadingButton loading={data.isLoading} variant='contained' type='submit' sx={{ marginTop: '30px' }}>
          Submit
        </LoadingButton>
      </form>
    </section>
  );
};

export default SignInPage;
