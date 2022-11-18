import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';

import { s, types } from './';

import { loginValidation, passwordValidation } from './validation';

import { useSignInMutation } from 'hooks';
import { IUserSignIn } from 'interfaces';

const SignInPage = ({ dataTestId }: types.SignInPageProps) => {
  const { control, handleSubmit } = useForm<types.Inputs>();
  const [signIn] = useSignInMutation();
  const { errors } = useFormState({ control });
  const onSubmit: SubmitHandler<IUserSignIn> = async (data) => {
    await signIn(data);
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
        <Button variant='contained' type='submit' sx={{ marginTop: '30px' }}>
          Submit
        </Button>
      </form>
    </section>
  );
};

export default SignInPage;
