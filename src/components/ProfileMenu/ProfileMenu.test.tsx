import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import ProfileMenu from './';

afterEach(cleanup);

describe('ProfileMenu component', () => {
  it('renders component successfully', () => {
    render(<ProfileMenu dataTestId='test' />);
    expect(screen.getByTestId(/test/i)).toBeInTheDocument();
  });
});
