import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import ErrorPage from './';

afterEach(cleanup);

describe('ErrorPage component', () => {
  it('renders component successfully', () => {
    render(<ErrorPage dataTestId='test' />);
    expect(screen.getByTestId(/test/i)).toBeInTheDocument();
  });
});
