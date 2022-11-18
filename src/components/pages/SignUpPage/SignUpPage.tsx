import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import React from 'react';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { s, types } from './';

import { loginValidation, passwordValidation } from '../SignInPage/validation';

import { useSignUpMutation } from 'hooks';

const SignInPage = ({ dataTestId }: types.SignUpPageProps) => {
  const { control, handleSubmit } = useForm<types.Inputs>();
  const [signUp, data] = useSignUpMutation();
  const { errors } = useFormState({ control });
  const onSubmit: SubmitHandler<types.Inputs> = async (data) => {
    try {
      await signUp(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={s.container} data-testid={dataTestId}>
      <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)} className={s.form}>
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
        <Link to='/login' className={s.form__link}>
          You already have an account? Sign in
        </Link>
        <LoadingButton loading={data.isLoading} variant='contained' type='submit' sx={{ marginTop: '30px' }}>
          Submit
        </LoadingButton>
      </form>
    </section>
  );
};

export default SignInPage;
