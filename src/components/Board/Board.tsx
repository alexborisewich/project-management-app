import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { s, types } from './';

import ModalCreateBoard from 'components/pages/ModalCreateBoardPage/ModalCreateBoard';
import ModalDeleteBoard from 'components/pages/ModalDeleteBoardPage/ModalDeleteBoard';
import ModalUpdateInfo from 'components/pages/ModalUpdateBoardPage/ModalUpdateBoard';
import { useGetBoardsByUserIdQuery } from 'hooks';
import { RootState } from 'store/store';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Board = function ({ dataTestId }: types.BoardProps) {
  const userIdChoise = useSelector((state: RootState) => state.app.user?.id);
  const userId = userIdChoise === undefined ? '' : userIdChoise;
  const { data } = useGetBoardsByUserIdQuery(userId);
  return (
    <div className={s.container} data-testid={dataTestId}>
      <Box sx={{ flexGrow: 1 }}>
        <ModalCreateBoard />
        <Grid container spacing={2}>
          {data?.map((item) => (
            <Grid item xs={4}>
              <Item>
                {' '}
                <div key={item._id}>
                  <ModalUpdateInfo boardId={item._id} title={item.title} users={item.users} />
                  <ModalDeleteBoard boardId={item._id} />
                  <Link to={`/boards/${item._id}`}>
                    <div className={s.board_size}>
                      <p className={s.container}>{item.title}</p>
                      <p className={s.container}>{item.users}</p>
                    </div>
                  </Link>
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
