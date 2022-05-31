import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../_state/hooks';

export const WithAuthentication: React.FC<{
  children: JSX.Element;
}> = (props) => {
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  // if (loading) return <LoadingPage />;
  if (user) return props.children;
  return <Navigate to='/login' state={{ from: location }} replace />;
};

export const CheckAuth: React.FC<{ children: JSX.Element }> = (props) => {
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  const from = (location.state as { from?: Location })?.from ?? '/';

  // if (loading) return <LoadingPage />;
  if (!user) return props.children;
  return <Navigate to={from} replace />;
};
