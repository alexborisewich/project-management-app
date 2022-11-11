import React from 'react';

import { s, types } from './';

const Board = ({ dataTestId }: types.BoardProps) => (
  <div className={s.container} data-testid={dataTestId}>
    Board
  </div>
);

export default Board;
