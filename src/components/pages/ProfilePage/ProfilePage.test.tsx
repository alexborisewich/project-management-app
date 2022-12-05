import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import ProfilePage from './';

afterEach(cleanup);

describe('ProfilePage component', () => {
  it('renders component successfully', () => {
    render(<ProfilePage dataTestId='test' />);
    expect(screen.getByTestId(/test/i)).toBeInTheDocument();
  });
});
