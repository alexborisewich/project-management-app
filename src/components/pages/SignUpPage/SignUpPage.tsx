import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { s, types } from './';

import { PATHS } from 'data';
import { useSignUpMutation } from 'hooks';
import { IUserSignUp } from 'interfaces';
import { loginValidation, onPromiseHandler, passwordValidation } from 'utils';

const SignUpPage = ({ dataTestId }: types.SignUpPageProps) => {
  const { control, handleSubmit } = useForm<IUserSignUp>();
  const [signUp, data] = useSignUpMutation();
  const { errors } = useFormState({ control });
  const [errorAPI, setErrorAPI] = useState<types.ErrorType>({ data: { statusCode: 0, message: '' }, status: 0 });
  const onSubmit = handleSubmit(async (signUpData) => {
    try {
      await signUp(signUpData).unwrap();
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
              type='password'
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
        <LoadingButton loading={data.isLoading} variant='contained' type='submit' sx={{ marginTop: '30px' }}>
          Submit
        </LoadingButton>
      </form>
    </section>
  );
};

export default SignUpPage;
