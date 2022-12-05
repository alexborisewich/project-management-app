import EditIcon from '@mui/icons-material/Edit';
import { IconButton, TextField, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import s from './ModalUpdateUser.module.css';

import { useUpdateBoardByIdMutation } from 'hooks/api';
import { IBoard, INewBoard } from 'interfaces';
import { RootState } from 'store/store';
import { titleValidation, onPromiseHandler } from 'utils';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalUpdateInfo(props: { title: string; users: string[]; boardId: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userIdChoise = useSelector((state: RootState) => state.app.user?.id);
  const userId = userIdChoise === undefined ? '' : userIdChoise;
  const [updateBoardById] = useUpdateBoardByIdMutation();
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IBoard, INewBoard>();
  const onSubmit = async (UpdateBoardData: INewBoard) => {
    await updateBoardById({
      body: {
        title: UpdateBoardData.title,
        owner: userId,
        users: UpdateBoardData.users,
      },
      boardId: props.boardId,
    });
    handleClose();
    reset();
  };

  return (
    <div className={s.position}>
      <Tooltip title={t('UpdateBoard.Tooltip')}>
        <IconButton color='primary' aria-label='edit profile' onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <form onSubmit={onPromiseHandler(handleSubmit(onSubmit))}>
            <h3 className={s.form__title}>{t('UpdateBoard.Title')}</h3>
            <Controller
              name='title'
              control={control}
              rules={titleValidation}
              defaultValue={props.title}
              render={({ field }) => (
                <TextField
                  label={t('UpdateBoard.InpTitle')}
                  size='small'
                  margin='normal'
                  fullWidth={true}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  autoComplete='true'
                  {...field}
                />
              )}
            />
            <Controller
              name={`users.${0}`}
              control={control}
              defaultValue={props.users[0]}
              render={({ field }) => (
                <TextField
                  label={t('UpdateBoard.InpDescr')}
                  multiline
                  margin='normal'
                  rows={4}
                  fullWidth={true}
                  autoComplete='true'
                  {...field}
                />
              )}
            />
            <Button variant='contained' type='submit' sx={{ marginTop: '30px' }}>
              {t('UpdateBoard.Submit')}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
