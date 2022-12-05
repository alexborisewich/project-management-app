import { Backdrop, CircularProgress, Divider } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { s, types } from './';

import ConfirmationModal from 'components/common/ConfirmationModal';
import ModalCreateBoard from 'components/pages/ModalCreateBoardPage/ModalCreateBoard';
import ModalUpdateInfo from 'components/pages/ModalUpdateBoardPage/ModalUpdateBoard';
import { PATHS } from 'data';
import { useDeleteBoardByIdMutation, useGetBoardsByUserIdQuery } from 'hooks';
import { RootState } from 'store/store';
import { saveBoardId } from 'utils';

const Board = function ({ dataTestId }: types.BoardProps) {
  const userIdChoise = useSelector((state: RootState) => state.app.user?.id);
  const userId = userIdChoise === undefined ? '' : userIdChoise;
  const { data, isLoading: isLoadingBoards } = useGetBoardsByUserIdQuery(userId);
  const [deleteBoardById] = useDeleteBoardByIdMutation();
  const handleConfirm = (id: string) => {
    void deleteBoardById(id);
  };
  return (
    <div className={s.container} data-testid={dataTestId}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoadingBoards}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <ModalCreateBoard btn={true} />
      <div className={s.wrapper}>
        {data?.map((item) => (
          <div className={s.board} key={item._id}>
            <Link to={PATHS.board}>
              <div
                onClick={() => {
                  saveBoardId(item._id);
                }}
              >
                <h3 className={s.board__title}>{item.title}</h3>
                <Divider />
                <p className={s.board__descript}>{item.users}</p>
              </div>
            </Link>
            <Divider />
            <div className={s.board__control}>
              <ModalUpdateInfo boardId={item._id} title={item.title} users={item.users} />
              <ConfirmationModal
                handleConfirm={handleConfirm}
                text='ConfirmModal.DelBoardQuestion'
                id={item._id}
                btnAgr='Buttons.BtnAgr'
                btnDisAgr='Buttons.BtnDisagr'
                tooltip='ConfirmModal.TooltipBoard'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
