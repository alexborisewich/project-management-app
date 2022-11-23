import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { s, types } from './';

import { PATHS } from 'data';
import { useAppDispatch, useSignInMutation, useSignUpMutation } from 'hooks';
import { IUserSignUp } from 'interfaces';
import { setUser } from 'store';
import { loginValidation, onPromiseHandler, passwordValidation, saveUser } from 'utils';

const SignUpPage = ({ dataTestId }: types.SignUpPageProps) => {
  const { control, handleSubmit, getValues } = useForm<IUserSignUp>();
  const dispatch = useAppDispatch();
  const [signIn, signInData] = useSignInMutation();
  const [signUp, { data, isError, isLoading, isSuccess, status }] = useSignUpMutation();
  const {
    errors: { login, name, password },
  } = useFormState({ control });
  useEffect(() => {
    if (isSuccess) toast.success('Successfully signed up!');
  }, [isSuccess]);

  const onSubmit = handleSubmit(async (signUpData) => {
    await signUp(signUpData);
  });
  useEffect(() => {
    const fetchSignIn = async () => await signIn({ password: getValues().password, login: data!.login });
    if (status === 'fulfilled') {
      void fetchSignIn();
    }
  }, [status, getValues, data, signIn]);
  useEffect(() => {
    if (signInData.status === 'fulfilled') {
      dispatch(setUser(signInData.data));
      saveUser(signInData.data);
    }
  }, [signInData.status, dispatch, signInData?.data]);
  return (
    <section className={s.container} data-testid={dataTestId}>
      <form
        onSubmit={onPromiseHandler(onSubmit)}
        className={isError ? `${s.form__error || ''} ${s.form || ''}` : s.form}
      >
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
              error={!!name?.message}
              helperText={name?.message}
              autoComplete='true'
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
          rules={passwordValidation}
          defaultValue=''
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
        <Link to={PATHS.signIn} className={s.form__link}>
          You already have an account? Sign in
        </Link>
        <LoadingButton
          loading={isLoading || signInData.isLoading}
          variant='contained'
          type='submit'
          sx={{ marginTop: '30px' }}
        >
          Submit
        </LoadingButton>
      </form>
    </section>
  );
};

export default SignUpPage;
