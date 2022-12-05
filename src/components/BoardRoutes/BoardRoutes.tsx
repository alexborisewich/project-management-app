import DashboardIcon from '@mui/icons-material/Dashboard';
import { Backdrop, CircularProgress, Button } from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { s } from './';

import Column from 'components/pages/ColumnPage/Column';
import ModalCreateColumn from 'components/pages/ModalCreateColumnPage/ModalCreateColumn';
import { PATHS, signInBtnSXProps } from 'data';
import { useGetColumnsInBoardQuery, useUpdateSetOfColumnsMutation } from 'hooks/api';
import { IChangableTask, IColumn } from 'interfaces';
import { getBoardId } from 'utils';

function search(a: IChangableTask[] | never, b: string) {
  return a.findIndex((el) => el._id === b);
}
const Container = styled.div`
  display: flex;
  overflow: scroll;
  gap: 1rem;
  margin: 0;
  padding-bottom: 1.5rem;
`;

const BoardRoutes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const boardId = getBoardId();
  const [columnTask, setColumnTask] = useState<IColumn[] | null>(null);
  let columns = useGetColumnsInBoardQuery(boardId).data;
  const { isLoading } = useGetColumnsInBoardQuery(boardId);
  if (columns) {
    columns = [...columns];
    columns?.sort(function (a, b) {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    });
  }

  const [boardTask, setBoardTask] = useState([]);
  const screenResult = columnTask ? columnTask : columns ? [...columns] : columns;

  const [updateSetOfColumns] = useUpdateSetOfColumnsMutation();
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (columns && destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'column') {
      const columnArrayXchange = columns?.slice();
      if (columnArrayXchange) {
        columns = [...(columns as [])];
        columns?.splice(source.index, 1);

        columns?.splice(
          destination.index,
          0,
          columnArrayXchange[search(columnArrayXchange, draggableId) as unknown as number] as unknown as never
        );

        columns = columns.map((obj, index) => ({ ...obj, order: index }));

        columns = [...columns];
        columns?.sort(function (a, b) {
          if (a.order > b.order) {
            return 1;
          }
          if (a.order < b.order) {
            return -1;
          }
          return 0;
        });

        setColumnTask(columns);
        columns.forEach(
          (item) =>
            void updateSetOfColumns([
              {
                _id: item._id,
                order: item.order,
              },
            ])
        );
      }
    }
    const start = source.droppableId;
    const finish = destination.droppableId;

    if (start === finish && type === 'task') {
      const taskArray = [...(boardTask[source.droppableId as unknown as number] as unknown as [])];
      const taskArrayXchange = [...(boardTask[source.droppableId as unknown as number] as unknown as [])].slice();
      taskArray.splice(source.index, 1);
      taskArray.splice(
        destination.index,
        0,
        taskArrayXchange[search(taskArrayXchange, draggableId) as unknown as number] as unknown as never
      );

      const localTaskArr = taskArray.map((obj, index) => ({ ...(obj as object), order: index } as IChangableTask));
      setBoardTask((prev) => ({ ...prev, [source.droppableId]: localTaskArr }));
    }
    if (start !== finish) {
      const taskArray = [...(boardTask[source.droppableId as unknown as number] as unknown as [])];
      const taskArrayXchange = [...(boardTask[source.droppableId as unknown as number] as unknown as [])].slice();
      taskArray.splice(source.index, 1);
      const finishArray = [...(boardTask[destination.droppableId as unknown as number] as unknown as [])];

      finishArray.splice(
        destination.index,
        0,
        taskArrayXchange[search(taskArrayXchange, draggableId) as unknown as number] as unknown as never
      );

      const localTaskArr = taskArray.map((obj, index) => ({ ...(obj as object), order: index } as IChangableTask));
      const localTaskArrDestination = finishArray.map(
        (obj, index) => ({ ...(obj as object), order: index } as IChangableTask)
      );
      setBoardTask((prev) => ({ ...prev, [source.droppableId]: localTaskArr }));
      setBoardTask((prev) => ({ ...prev, [destination.droppableId]: localTaskArrDestination }));
    }
  };

  return (
    <div className={s.container}>
      {isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      <div className={s.boardControl}>
        <Button
          variant='contained'
          startIcon={<DashboardIcon />}
          sx={signInBtnSXProps}
          onClick={() => navigate(PATHS.main)}
        >
          {t('Buttons.BtnMain')}
        </Button>
        <ModalCreateColumn />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={boardId} direction='horizontal' type='column'>
          {(provided) => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {screenResult?.map((item, index) => (
                <Column key={item._id} column={item} setBoardTask={setBoardTask} localTask={boardTask} index={index} />
              ))}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default BoardRoutes;
