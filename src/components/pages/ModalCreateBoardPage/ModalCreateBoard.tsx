import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TextField } from '@mui/material';
import { IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { s, types } from './';

import { CreateUserBtnSXProps } from 'data';
import { useCreateBoardMutation } from 'hooks/api';
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

export default function ModalCreateBoard(props: types.ModalCreateBoardProps) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [createBoard] = useCreateBoardMutation();
  const userIdChoise = useSelector((state: RootState) => state.app.user?.id);
  const userId = userIdChoise === undefined ? '' : userIdChoise;
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IBoard, INewBoard>();
  const onSubmit = async (NewBoardData: IBoard) => {
    await createBoard({
      title: NewBoardData.title,
      owner: userId,
      users: NewBoardData.users,
    });
    handleClose();
    reset();
  };

  return (
    <div className={s.position}>
      {props.btn ? (
        <Button sx={CreateUserBtnSXProps} onClick={handleOpen} variant='contained' startIcon={<AddCircleOutlineIcon />}>
          {t('CreateBoard.BtnMain')}
        </Button>
      ) : (
        <Tooltip title={t('CreateBoard.BtnMain')}>
          <IconButton sx={{ color: '#5352ED', padding: '2px' }} aria-label='add board' onClick={handleOpen}>
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        </Tooltip>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <form onSubmit={onPromiseHandler(handleSubmit(onSubmit))}>
            <h3 className={s.form__title}>{t('CreateBoard.Title')}</h3>
            <Controller
              name='title'
              control={control}
              rules={titleValidation}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  label={t('CreateBoard.InpTitle')}
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
              defaultValue=''
              render={({ field }) => (
                <TextField
                  label={t('CreateBoard.InpDescr')}
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
              {t('CreateBoard.Submit')}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
