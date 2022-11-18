import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { types } from '.';

import { PATHS, PRIVACY_REASONS } from 'data';

const PrivateRoute = ({ isAvailable, privacyReason }: types.PrivateRouteProps) => {
  if (privacyReason === PRIVACY_REASONS.notForUser && !isAvailable) {
    return <Navigate to={PATHS.main} replace />;
  }
  if (privacyReason === PRIVACY_REASONS.userOnly && !isAvailable) {
    return <Navigate to={PATHS.welcome} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
