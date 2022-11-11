import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import MainPage from './';

afterEach(cleanup);

describe('MainPage component', () => {
  it('renders component successfully', () => {
    render(<MainPage dataTestId='test' />);
    expect(screen.getByTestId(/test/i)).toBeInTheDocument();
  });
});
