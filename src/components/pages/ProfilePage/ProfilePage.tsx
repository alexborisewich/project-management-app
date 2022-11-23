import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { s, types } from './';

import DialogSlide from './../../Dialog';

import DialogDelete from 'components/DialogDelete';
import { PATHS, signOutBtnSXProps } from 'data';
import { useGetUserByIdQuery, useUpdateUserByIdMutation } from 'hooks';
import { useAppSelector } from 'hooks';
import { IUserSignUp } from 'interfaces';
import { loginValidation, onPromiseHandler, passwordValidation } from 'utils';

const ProfilePage = ({ dataTestId }: types.ProfilePageProps) => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const navigate = useNavigate();
  // const [confirmDelete, setConfirmDelete] = useState(false);
  const userId = useAppSelector((state) => state.app).user!.id;
  const user = useGetUserByIdQuery(userId);
  const { control, handleSubmit } = useForm<IUserSignUp>();
  const [Updater, { isError, isLoading, error, isSuccess }] = useUpdateUserByIdMutation();
  const {
    errors: { login, name, password },
  } = useFormState({ control });

  const onSubmit = handleSubmit(async (updateDate) => await Updater({ body: updateDate, userId }));
  const handleOpenCofirm = () => {
    setOpenModalConfirm(true);
  };
  const handleClose = () => {
    setOpenModalConfirm(false);
    navigate(PATHS.profile);
  };
  // const handleConfirmDelete = () => {
  //   // alert('agree to delete');
  //   // Deleter(userId);
  //   setOpenModalConfirm(false);
  //   navigate(PATHS.main);
  // };
  // console.log(user);
  return (
    <section className={s.container} data-testid={dataTestId}>
      {isSuccess && <DialogSlide></DialogSlide>}
      {user.isLoading && <CircularProgress color='secondary' />}
      {openModalConfirm && (
        <DialogDelete handleClose={handleClose} userId={userId} openModalConfirm={openModalConfirm}></DialogDelete>
      )}
      {!user.isLoading && (
        <form
          onSubmit={onPromiseHandler(onSubmit)}
          className={isError ? `${s.form__error || ''} ${s.form || ''}` : s.form}
        >
          {error && <span className={s.form__error_msg}>{'status' in error && 'error' in error && error.error}</span>}
          <h3 className={s.form__title}>Edit your profile</h3>
          <Controller
            name='name'
            control={control}
            rules={loginValidation}
            defaultValue={user.data?.name}
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
            defaultValue={user.data?.login}
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
          <div>
            <LoadingButton loading={isLoading} variant='contained' type='submit' sx={signOutBtnSXProps}>
              Update profile
            </LoadingButton>
            <IconButton
              color='primary'
              aria-label='delete profile'
              // variant='contained'
              // startIcon={<DeleteIcon />}
              onClick={() => handleOpenCofirm()}
              // sx={signOutBtnSXProps}
            >
              <DeleteIcon />
            </IconButton>
            {/* /IconButton> */}
            {/* </Button> */}
          </div>
        </form>
      )}
    </section>
  );
};

export default ProfilePage;
