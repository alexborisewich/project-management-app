import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import { s, types } from './';

import ModalCreateBoard from './ModalCreateBoard';
import ModalDeleteBoard from './ModalDeleteBoard';
import ModalUpdateInfo from './ModalUpdateInfo';

import { useGetBoardsByUserIdQuery } from 'hooks';
import { getSavedUser } from 'utils/localStorage';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Board = function ({ dataTestId }: types.BoardProps) {
  const [allBoardsById, setAllBoardsById] = useState([{ title: '', users: [''], _id: '' }]);
  const userId = getSavedUser()?.id;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data } = useGetBoardsByUserIdQuery(userId);
  useEffect(() => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setAllBoardsById(data);
    }
  }, [data]);
  return (
    <div className={s.container} data-testid={dataTestId}>
      <Box sx={{ flexGrow: 1 }}>
        <ModalCreateBoard />
        <Grid container spacing={2}>
          {allBoardsById.map((item) => (
            <Grid item xs={4}>
              <Item>
                {' '}
                <div key={item._id}>
                  <div>
                    <p className={s.container}>{item.title}</p>
                    <p className={s.container}>{item.users}</p>
                  </div>
                  <ModalUpdateInfo boardId={item._id} title={item.title} users={item.users} />
                  <ModalDeleteBoard boardId={item._id} />
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Board;
