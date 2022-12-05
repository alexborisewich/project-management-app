import LoadingButton from '@mui/lab/LoadingButton';
import { CircularProgress, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { s, types } from './';

import { ConfirmationModal } from 'components';
import { signOutBtnSXProps } from 'data';
import { useAppDispatch, useDeleteUserByIdMutation, useGetUserByIdQuery, useUpdateUserByIdMutation } from 'hooks';
import { useAppSelector } from 'hooks';
import { IUserSignUp } from 'interfaces';
import { setUser } from 'store';
import { loginValidation, onPromiseHandler, passwordValidation, removeSavedUser } from 'utils';

const ProfilePage = ({ dataTestId }: types.ProfilePageProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.app).user!.id;
  const { data: userData, isLoading: isUserLoading } = useGetUserByIdQuery(userId);
  const [updateUser, { isError, isLoading: isUpdatingUser, isSuccess: isUserUpdated }] = useUpdateUserByIdMutation();
  const [deleteUser, { isSuccess: isUserDeleted }] = useDeleteUserByIdMutation();
  const { control, handleSubmit } = useForm<IUserSignUp>();
  const {
    errors: { login, name, password },
  } = useFormState({ control });

  useEffect(() => {
    if (isUserUpdated) toast.success(`${t('Messages.Toast.SuccessUpdProfile')}`);
  }, [isUserUpdated, t]);

  useEffect(() => {
    if (isUserDeleted) toast.success(`${t('Messages.Toast.SuccessDelProfile')}`);
  }, [isUserDeleted, t]);

  const onSubmit = handleSubmit(async (updateData) => await updateUser({ body: updateData, userId }));

  const handleConfirm = () => {
    void deleteUser(userId);
    removeSavedUser();
    dispatch(setUser(null));
  };

  return (
    <section className={s.container} data-testid={dataTestId}>
      {isUserLoading ? (
        <CircularProgress color='secondary' />
      ) : (
        <form
          onSubmit={onPromiseHandler(onSubmit)}
          className={isError ? `${s.form__error || ''} ${s.form || ''}` : s.form}
        >
          <h3 className={s.form__title}>{t('Profile.Title')}</h3>
          <Controller
            name='name'
            control={control}
            rules={loginValidation}
            defaultValue={userData?.name}
            render={({ field }) => (
              <TextField
                label={t('Profile.InpName')}
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
            defaultValue={userData?.login}
            render={({ field }) => (
              <TextField
                label={t('Profile.InpLogin')}
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
                label={t('Profile.InpPass')}
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
          <div>
            <LoadingButton loading={isUpdatingUser} variant='contained' type='submit' sx={signOutBtnSXProps}>
              {t('Buttons.BtnSubmit')}
            </LoadingButton>
            <ConfirmationModal
              text='ConfirmModal.DelProfileQuestion'
              id={userId}
              btnAgr='Buttons.BtnAgr'
              btnDisAgr='Buttons.BtnDisagr'
              tooltip='ConfirmModal.TooltipProfile'
              handleConfirm={handleConfirm}
            />
          </div>
        </form>
      )}
    </section>
  );
};

export default ProfilePage;
