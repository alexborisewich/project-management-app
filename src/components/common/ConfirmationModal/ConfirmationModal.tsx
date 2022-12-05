import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { types } from '.';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ConfirmationModal = ({ handleConfirm, text, id, btnAgr, btnDisAgr, tooltip }: types.ConfirmationModalProps) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  return (
    <>
      <Tooltip title={t(tooltip)}>
        <IconButton color='primary' aria-label='delete profile' onClick={handleOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{t('ConfirmModal.Title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>{t(text)}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t(btnDisAgr)}</Button>
          <Button onClick={() => handleConfirm(id)}>{t(btnAgr)}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
