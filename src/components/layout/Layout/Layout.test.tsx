import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import Layout from './';

afterEach(cleanup);

describe('Layout component', () => {
  it('renders component successfully', () => {
    render(<Layout dataTestId='test' />);
    expect(screen.getByTestId(/test/i)).toBeInTheDocument();
  });
});
