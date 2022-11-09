---
to: <%= absPath %>/<%= component_name %>.tsx
---
import React from 'react';

import s from './<%= component_name %>.module.css';
import { <%= component_name %>Props } from './<%= component_name %>.types';

const <%= component_name %> = ({ dataTestId }: <%= component_name %>Props) => (
  <div className={s.container} data-testid={dataTestId}>

  </div>
);

export default <%= component_name %>;
