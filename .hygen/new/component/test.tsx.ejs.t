---
to: <%= absPath %>/<%= component_name %>.test.tsx
---
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import <%= component_name %> from './';

afterEach(cleanup);

describe('<%= component_name %> component', () => {
  it('renders component successfully', () => {
    render(<<%= component_name %> dataTestId='test' />);
    expect(screen.getByTestId(/test/i)).toBeInTheDocument();
  });
});
