import authAtom from '@/state/authAtom';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export const WithAuthentication: React.FC<{
  children: JSX.Element;
}> = (props) => {
  const location = useLocation();
  const auth = useRecoilValue(authAtom);

  if (auth) return props.children;
  return <Navigate to='/login' state={{ from: location }} replace />;
};

export const CheckAuth: React.FC<{ children: JSX.Element }> = (props) => {
  const location = useLocation();
  const auth = useRecoilValue(authAtom);
  const from = (location.state as { from?: Location })?.from ?? '/';

  if (!auth) return props.children;
  return <Navigate to={from} replace />;
};
