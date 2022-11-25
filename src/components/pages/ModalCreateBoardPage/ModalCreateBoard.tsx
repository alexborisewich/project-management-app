import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

import s from './ModalCreateUser.module.css';

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

export default function ModalCreateBoard() {
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
      <Button sx={CreateUserBtnSXProps} onClick={handleOpen}>
        Create Board
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <form onSubmit={onPromiseHandler(handleSubmit(onSubmit))}>
            <h3 className={s.form__title}>Create Board</h3>
            <Controller
              name='title'
              control={control}
              rules={titleValidation}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  label='Title'
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
                  label='Description'
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
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
