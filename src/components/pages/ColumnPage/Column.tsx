import { Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import s from './Column.module.css';

import ModalCreateTask from '../ModalCreateTaskPage/ModalCreateTask';
import Task from '../TaskPage/Task';

import ConfirmationModal from 'components/common/ConfirmationModal';
import { useDeleteColumnByIdMutation, useGetTasksInColumnQuery } from 'hooks/api';
import { IChangableTask } from 'interfaces';
import { getBoardId } from 'utils';
const Container = styled.div`
  margin: 8px;
  padding: 1rem;
  border-radius: 16px;
  overflow-wrap: break-word;
  box-shadow: 0 7px 8px -4px rgb(0 0 0 / 20%), 0 12px 17px 2px rgb(0 0 0 / 14%), 0 5px 22px 4px rgb(0 0 0 / 12%);
  width: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  padding: 8px;
`;
const Tasklist = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;
const TaskHeight = styled.div`
  max-height: 300px;
  flex-grow: 1;
`;

const Column = (props: {
  column: {
    _id: string;
    title: string;
  };
  localTask: never[];
  setBoardTask: React.Dispatch<React.SetStateAction<never[]>>;
  index: number;
}) => {
  const boardId = getBoardId();
  let getTasks = useGetTasksInColumnQuery({ boardId: boardId, columnId: props.column._id }).data;

  const AdjustTasks = props.localTask[props.column._id as unknown as number] as unknown as IChangableTask[];
  const [deleteBoardById] = useDeleteColumnByIdMutation();
  const handleConfirm = (id: string) => {
    void deleteBoardById({ boardId: boardId, columnId: id });
  };

  if (AdjustTasks) {
    AdjustTasks.sort(function (a, b) {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    });
  }

  useEffect(() => {
    if (getTasks) {
      getTasks = [...getTasks];

      props.setBoardTask((prev) => ({ ...prev, [props.column._id]: getTasks }));
    }
  }, [getTasks]);

  return (
    <Draggable draggableId={props.column._id} index={props.index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Title className={s.title}>{props.column.title}</Title>
          <Divider />
          <TaskHeight>
            <Droppable droppableId={props.column._id} type='task'>
              {(provided) => (
                <Tasklist ref={provided.innerRef} {...provided.droppableProps}>
                  {AdjustTasks?.map((item, index) => (
                    <Task key={item._id} tasks={item} index={index} />
                  ))}
                  {provided.placeholder}
                </Tasklist>
              )}
            </Droppable>
          </TaskHeight>
          <Divider />
          <div className={s.board__control}>
            <ModalCreateTask column={props.column._id} />
            <ConfirmationModal
              handleConfirm={handleConfirm}
              text='ConfirmModal.DelColumnQuestion'
              id={props.column._id}
              btnAgr='Buttons.BtnAgr'
              btnDisAgr='Buttons.BtnDisagr'
              tooltip='ConfirmModal.TooltipColumn'
            />
          </div>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
