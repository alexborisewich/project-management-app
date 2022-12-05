import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { s, types } from './';

import { PATHS } from 'data';
import { useAppDispatch, useSignInMutation, useSignUpMutation } from 'hooks';
import { IUserSignUp } from 'interfaces';
import { setUser } from 'store';
import { loginValidation, onPromiseHandler, passwordValidation, saveUser } from 'utils';

const SignUpPage = ({ dataTestId }: types.SignUpPageProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit, getValues } = useForm<IUserSignUp>();
  const dispatch = useAppDispatch();
  const [signUp, { data: signUpData, isError: isSignUpError, isLoading: isSignUpLoading, isSuccess: isSignUpSuccess }] =
    useSignUpMutation();
  const [signIn, { data: signInData, isLoading: isSignInLoading, isSuccess: isSignInSuccess }] = useSignInMutation();
  const {
    errors: { login, name, password },
  } = useFormState({ control });

  useEffect(() => {
    const signInAfterSignUp = async () => {
      if (signUpData) {
        await signIn({ password: getValues().password, login: signUpData.login });
        if (signInData) {
          dispatch(setUser(signInData));
          saveUser(signInData);
        }
      }
    };
    void signInAfterSignUp();
  }, [getValues, signIn, dispatch, signUpData, signInData]);

  useEffect(() => {
    if (isSignUpSuccess) toast.success(`${t('Messages.Toast.SuccessSignUp')}`);
  }, [isSignUpSuccess, t]);

  useEffect(() => {
    if (isSignInSuccess) toast.success(`${t('Messages.Toast.SuccessSignIn')}`);
  }, [isSignInSuccess, t]);

  const onSubmit = handleSubmit(async (signUpData) => {
    await signUp(signUpData);
  });

  return (
    <section className={s.container} data-testid={dataTestId}>
      <form
        onSubmit={onPromiseHandler(onSubmit)}
        className={isSignUpError ? `${s.form__error || ''} ${s.form || ''}` : s.form}
      >
        <h3 className={s.form__title}>{t('SignUp.Title')}</h3>
        <Controller
          name='name'
          control={control}
          rules={loginValidation}
          defaultValue=''
          render={({ field }) => (
            <TextField
              label={t('SignUp.InpName')}
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
              label={t('SignUp.InpLogin')}
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
              label={t('SignUp.InpPass')}
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
          {t('SignUp.SignInLink')}
        </Link>
        <LoadingButton
          loading={isSignUpLoading || isSignInLoading}
          variant='contained'
          type='submit'
          sx={{ marginTop: '30px' }}
        >
          {t('Buttons.BtnSubmit')}
        </LoadingButton>
      </form>
    </section>
  );
};

export default SignUpPage;
