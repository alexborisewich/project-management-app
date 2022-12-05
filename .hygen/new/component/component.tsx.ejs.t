---
to: <%= absPath %>/<%= component_name %>.tsx
---
import React from 'react';

import { s, types } from './';

const <%= component_name %> = ({ dataTestId }: types.<%= component_name %>Props) => (
  <div className={s.container} data-testid={dataTestId}>

  </div>
);

export default <%= component_name %>;
