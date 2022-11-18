import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import React from 'react';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { s, types } from './';

import { loginValidation, passwordValidation } from './validation';

import { useSignInMutation } from 'hooks';
import { IUserSignIn } from 'interfaces';

const SignInPage = ({ dataTestId }: types.SignInPageProps) => {
  const { control, handleSubmit } = useForm<types.Inputs>();
  const [signIn, data] = useSignInMutation();
  const { errors } = useFormState({ control });
  const onSubmit: SubmitHandler<IUserSignIn> = async (value) => {
    try {
      await signIn(value);
      // console.log('payload -->', payload);
      // console.log('data -->>', data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={s.container} data-testid={dataTestId}>
      <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)} className={s.form}>
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
        <LoadingButton loading={data.isLoading} variant='contained' type='submit' sx={{ marginTop: '30px' }}>
          Submit
        </LoadingButton>
      </form>
    </section>
  );
};

export default SignInPage;
