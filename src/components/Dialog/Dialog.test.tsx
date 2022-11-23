import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import Dialog from './';

afterEach(cleanup);

describe('Dialog component', () => {
  it('renders component successfully', () => {
    render(<Dialog dataTestId='test' />);
    expect(screen.getByTestId(/test/i)).toBeInTheDocument();
  });
});
