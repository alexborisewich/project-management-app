import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';

import { s } from './';

import { CreateUserBtnSXProps, CreateUserModalBtnSXProps } from 'data';
import { useCreateBoardMutation } from 'hooks/api';
import { getSavedUser } from 'utils/localStorage';

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
  const [establishTitle, setEstablishTitle] = useState('');
  const [establishDescription, setEstablishDescription] = useState('');
  const userId = getSavedUser()?.id;
  const [createBoard] = useCreateBoardMutation();

  return (
    <div className={s.position}>
      <Button sx={CreateUserBtnSXProps} onClick={handleOpen}>
        Create User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography variant='h6' component='h2'>
            Create Board
          </Typography>
          <Typography id='modal-modal-title' sx={{ mt: 2 }}>
            <input
              onChange={(e) => {
                setEstablishTitle(e.target.value);
              }}
              type='text'
              placeholder='Title'
              value={establishTitle}
            />
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <input
              onChange={(e) => {
                setEstablishDescription(e.target.value);
              }}
              type='text'
              placeholder='Description'
              value={establishDescription}
            />
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <Button
              sx={CreateUserModalBtnSXProps}
              onClick={(e) => {
                e.preventDefault();
                handleClose();
                void createBoard({
                  title: establishTitle,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  owner: userId,
                  users: [establishDescription],
                });
                setEstablishTitle('');
                setEstablishDescription('');
              }}
            >
              CREATE
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
