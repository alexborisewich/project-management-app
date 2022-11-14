import React from 'react';

import { s, types } from '.';

const Creator = ({ name, feature, dataTestId }: types.CreatorProps) => (
  <div className={s.creator} data-testid={dataTestId}>
    <h3>{name}</h3>
    <ul className={s.ul}>
      {feature.map((el, index) => (
        <li key={index}>{el}</li>
      ))}
    </ul>
  </div>
);

export default Creator;
