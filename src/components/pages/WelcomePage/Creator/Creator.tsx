import React from 'react';

import { s, types } from '.';

import Photo from './../../../../assets/images/Fronted.png';

const Creator = ({ name, feature, dataTestId }: types.CreatorProps) => (
  <div className={s.creator} data-testid={dataTestId}>
    <img src={Photo} alt='Creator' />
    <h3 className={s.name}>{name}</h3>
    <ul className={s.ul}>
      {feature.map((el, index) => (
        <li key={index}>{el}</li>
      ))}
    </ul>
  </div>
);

export default Creator;
