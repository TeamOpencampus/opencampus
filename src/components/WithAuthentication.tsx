import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';

export const WithAuthentication: React.FC<{
  children: JSX.Element;
}> = (props) => {
  const location = useLocation();
  const loggedIn = useAppSelector(
    (state) => state.auth?.id && state.auth?.role
  );

  if (loggedIn) return props.children;
  return <Navigate to='/login' state={{ from: location }} replace />;
};

export const CheckAuth: React.FC<{ children: JSX.Element }> = (props) => {
  const location = useLocation();
  const loggedIn = useAppSelector(
    (state) => state.auth?.id && state.auth?.role
  );
  const from = (location.state as { from?: Location })?.from ?? '/';

  if (!loggedIn) return props.children;
  return <Navigate to={from} replace />;
};
