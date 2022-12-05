import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import Footer from './';

afterEach(cleanup);

describe('Footer component', () => {
  it('renders component successfully', () => {
    render(<Footer dataTestId='test' />);
    expect(screen.getByTestId(/test/i)).toBeInTheDocument();
  });
});
