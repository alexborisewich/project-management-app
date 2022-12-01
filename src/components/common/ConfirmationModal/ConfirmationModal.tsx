import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
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

const ConfirmationModal = ({ handleClose, handleConfirm, openModalConfirm, text }: types.ConfirmationModalProps) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={openModalConfirm}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{t('ConfirmModal.Title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('Buttons.BtnDisagr')}</Button>
        <Button onClick={handleConfirm}>{t('Buttons.BtnAgr')}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmationModal;
