import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { IconButton, TextField, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import s from './ModalCreateTask.module.css';

import { useCreateTaskMutation } from 'hooks/api';
import { INewTask } from 'interfaces';
import { titleValidation, onPromiseHandler, getBoardId } from 'utils';

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

export default function ModalCreateTask(props: { column: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [createTask] = useCreateTaskMutation();
  const boardId = getBoardId();
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<INewTask>();
  const onSubmit = async (NewTaskData: INewTask) => {
    await createTask({
      body: {
        title: NewTaskData.title,
        order: 0,
        description: 'string',
        userId: '0',
        users: ['string'],
      },
      boardId: boardId,
      columnId: props.column,
    });

    handleClose();
    reset();
  };

  return (
    <div className={s.position}>
      <Tooltip title={t('ModalCreateTask.BtnAdd')}>
        <IconButton color='primary' aria-label='edit profile' onClick={handleOpen}>
          <PlaylistAddIcon />
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
            <h3 className={s.form__title}>{t('ModalCreateTask.Title')}</h3>
            <Controller
              name='title'
              control={control}
              rules={titleValidation}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  label={t('ModalCreateTask.Description')}
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

            <Button variant='contained' type='submit' sx={{ marginTop: '30px' }}>
              {t('ModalCreateTask.Submit')}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
