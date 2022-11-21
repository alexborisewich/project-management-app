import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';

import { CreateUserModalBtnSXProps } from 'data';
import { useUpdateBoardByIdMutation } from 'hooks/api';
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

export default function ModalUpdateInfo(props: { title: string; users: string[]; boardId: string }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userId = getSavedUser()?.id;
  const [updateBoardById] = useUpdateBoardByIdMutation();

  const [establishTitle, setEstablishTitle] = useState(props.title);
  const [establishDescription, setEstablishDescription] = useState(props.users);

  return (
    <div>
      <Button onClick={handleOpen}>Update</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography variant='h6' component='h2'>
            Edit Board
          </Typography>
          <Typography id='modal-modal-title'>
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
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
                void updateBoardById({
                  body: {
                    title: establishTitle,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    owner: userId,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    users: [establishDescription],
                  },
                  boardId: props.boardId,
                });
              }}
            >
              EDIT
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
