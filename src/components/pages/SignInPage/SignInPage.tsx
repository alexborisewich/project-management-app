import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { s, types } from './';

import { PATHS } from 'data';
import { useAppDispatch, useSignInMutation } from 'hooks';
import { IUserSignIn } from 'interfaces';
import { setUser } from 'store';
import { loginValidation, onPromiseHandler, passwordValidation, saveUser } from 'utils';

const SignInPage = ({ dataTestId }: types.SignInPageProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<IUserSignIn>();
  const [signIn, { data, isError, isLoading, isSuccess }] = useSignInMutation();
  const {
    errors: { login, password },
  } = useFormState({ control });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      saveUser(data);
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isSuccess) toast.success(`${t('Messages.Toast.SuccessSignIn')}`);
  }, [isSuccess, t]);

  const onSubmit = handleSubmit(async (signInData) => await signIn(signInData));

  return (
    <section className={s.container} data-testid={dataTestId}>
      <form
        onSubmit={onPromiseHandler(onSubmit)}
        className={isError ? `${s.form__error || ''} ${s.form || ''}` : s.form}
      >
        <h3 className={s.form__title}>{t('SignIn.Title')}</h3>
        <Controller
          name='login'
          control={control}
          rules={loginValidation}
          defaultValue=''
          render={({ field }) => (
            <TextField
              label={t('SignIn.InpLogin')}
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
              label={t('SignIn.InpPass')}
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
          {t('SignIn.SignUpLink')}
        </Link>
        <LoadingButton loading={isLoading} variant='contained' type='submit' sx={{ marginTop: '30px' }}>
          {t('Buttons.BtnSubmit')}
        </LoadingButton>
      </form>
    </section>
  );
};

export default SignInPage;
