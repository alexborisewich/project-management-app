import React from 'react';
import { useSelector } from 'react-redux';

import { s } from './';

import ModalCreateColumn from 'components/pages/ModalCreateColumnPage/ModalCreateColumn';
import { useGetColumnsInBoardQuery } from 'hooks/api';
import { RootState } from 'store/store';

const BoardRoutes = () => {
  const boardId = useSelector((state: RootState) => state.app.boardId);
  const columns = useGetColumnsInBoardQuery(boardId);
  console.log(columns);
  return (
    <>
      <ModalCreateColumn />
      <div className={s.container}>Hi man</div>
    </>
  );
};

export default BoardRoutes;
