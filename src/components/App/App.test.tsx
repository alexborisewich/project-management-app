import { cleanup, render } from '@testing-library/react';
import React from 'react';

import { App } from '..';

afterEach(cleanup);

describe('App component', () => {
  it('should render App component without crashing', () => {
    render(<App />);
  });
  it('matches snapshot', () => {
    const view = render(<App />);
    expect(view).toMatchSnapshot();
  });
});
