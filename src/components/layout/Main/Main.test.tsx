import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import Main from './';

afterEach(cleanup);

describe('Main component', () => {
  it('renders component successfully', () => {
    render(<Main dataTestId='test' />);
    expect(screen.getByTestId(/test/i)).toBeInTheDocument();
  });
});
