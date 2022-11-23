import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { types } from './';

import { PATHS } from 'data';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const DialogSlideConfirm = ({ dataTestId }: types.DialogProps) => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    navigate(PATHS.main);
  };

  return (
    <>
      {/* <div className={s.container} data-testid={dataTestId}> */}
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
        data-testid={dataTestId}
      >
        <DialogTitle>{'Success'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>Your profile has been updated!</DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      {/* </div>
       */}
    </>
  );
};

export default DialogSlideConfirm;
