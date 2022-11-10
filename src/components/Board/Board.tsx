import React from 'react';

import s from './Board.module.css';
import { BoardProps } from './Board.types';

const Board = ({ dataTestId }: BoardProps) => (
  <div className={s.container} data-testid={dataTestId}>
    Board
  </div>
);

export default Board;
