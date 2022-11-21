import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { s } from './';

import { CreateUserModalBtnSXProps } from 'data';
import { useDeleteBoardByIdMutation } from 'hooks/api';
import { Props } from 'interfaces/api';

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

export default function ModalDeleteBoard<T>(props: React.PropsWithChildren<Props<T>>) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleteBoardById] = useDeleteBoardByIdMutation();

  return (
    <div>
      <Button onClick={handleOpen}>DELETE</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography variant='h6' component='h2'>
            Delete Board
          </Typography>
          <Typography id='modal-modal-title'>
            <Button
              sx={CreateUserModalBtnSXProps}
              onClick={(e) => {
                e.preventDefault();
                handleClose();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                void deleteBoardById(props.boardId);
              }}
            >
              Yes
            </Button>
            <Button
              className={s.container}
              sx={CreateUserModalBtnSXProps}
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              NO
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
