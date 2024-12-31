import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import { userState } from '../state/userState';

function ProtectedRoute({ children }) {
  const user = useRecoilValue(userState);

  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
