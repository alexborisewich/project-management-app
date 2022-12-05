import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import s from './ModalCreateColumn.module.css';

import { CreateUserBtnSXProps } from 'data';
import { useCreateColumnMutation } from 'hooks/api';
import { INewColumn } from 'interfaces';
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

export default function ModalCreateColumn() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [createColumn] = useCreateColumnMutation();
  const boardId = getBoardId();
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<INewColumn>();
  const onSubmit = async (NewColumnData: INewColumn) => {
    await createColumn({
      body: { title: NewColumnData.title, order: 1 },
      boardId: boardId,
    });
    handleClose();
    reset();
  };

  return (
    <div className={s.position}>
      <Button variant='contained' sx={CreateUserBtnSXProps} onClick={handleOpen} startIcon={<ViewWeekIcon />}>
        {t('ModalCreateColumn.BtnCreate')}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <form onSubmit={onPromiseHandler(handleSubmit(onSubmit))}>
            <h3 className={s.form__title}>{t('ModalCreateColumn.Title')}</h3>
            <Controller
              name='title'
              control={control}
              rules={titleValidation}
              defaultValue=''
              render={({ field }) => (
                <TextField
                  label={t('ModalCreateColumn.Input')}
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
              {t('ModalCreateColumn.Submit')}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
