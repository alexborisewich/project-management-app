import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import NotFoundPage from './';

afterEach(cleanup);

describe('NotFoundPage component', () => {
  it('renders component successfully', () => {
    render(<NotFoundPage dataTestId='test' />);
    expect(screen.getByTestId(/test/i)).toBeInTheDocument();
  });
});
