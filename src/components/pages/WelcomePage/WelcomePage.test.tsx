import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import WelcomePage from './';

afterEach(cleanup);

describe('WelcomePage component', () => {
  it('renders component successfully', () => {
    render(<WelcomePage dataTestId='test' />);
    expect(screen.getByTestId(/test/i)).toBeInTheDocument();
  });
});
