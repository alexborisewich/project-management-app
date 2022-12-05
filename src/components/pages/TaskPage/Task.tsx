import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
const Container = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightblue;
  border-radius: 2px;
  padding: 8px;
  overflow: scroll;
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
