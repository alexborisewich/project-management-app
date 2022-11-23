import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React, { useCallback, useEffect } from 'react';

import { types } from './';

import { useAppDispatch, useDeleteUserByIdMutation } from 'hooks';
import { setUser } from 'store';
import { removeSavedUser } from 'utils';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const DialogDelete = ({ handleClose, userId, openModalConfirm }: types.DialogDeleteProps) => {
  const dispatch = useAppDispatch();
  const [Deleter] = useDeleteUserByIdMutation();
  const handleConfirm = useCallback(() => {
    handleClose();
    removeSavedUser();
    dispatch(setUser(null));
  }, [handleClose, dispatch]);

  useEffect(() => {
    async function DeleteUser() {
      await Deleter(userId);
    }
    void DeleteUser();
  }, [handleConfirm, Deleter, userId]);

  return (
    <>
      <Dialog
        open={openModalConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Please, confirm'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure want to delete your profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogDelete;
