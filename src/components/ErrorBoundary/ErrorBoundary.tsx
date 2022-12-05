import React from 'react';
import { Navigate } from 'react-router-dom';

import { types } from './';

import { PATHS } from 'data';

class ErrorBoundary extends React.Component<types.ErrorBoundaryProps, types.ErrorBoundaryState> {
  constructor(props: types.ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  override render() {
    const { hasError, errorMessage } = this.state;
    if (hasError) {
      this.setState({ hasError: false, errorMessage: '' });
      return <Navigate to={PATHS.error} replace state={{ errorMessage }} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
