import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
const Container = styled.div`
  margin-bottom: 8px;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 5px 6px -2px rgb(0 0 0 / 20%), 0 10px 15px 0px rgb(0 0 0 / 14%), 0 3px 20px 2px rgb(0 0 0 / 12%);
`;

const Task = (props: {
  tasks: {
    _id: string;
    title: string;
  };
  index: number;
}) => {
  return (
    <Draggable draggableId={props.tasks._id} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {props.tasks.title}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
