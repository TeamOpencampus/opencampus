import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { LoadingPage } from '../pages/LoadingPage';
import { EmailVerification } from '../pages/verification/EmailVerification';

export const WithAuthentication: React.FC<{
  children: JSX.Element;
}> = (props) => {
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);

  if (loading) return <LoadingPage />;
  if (user) {
    if (!user.emailVerified) return <EmailVerification />;
    // if (!user.phoneNumber) return <PhoneVerification />;
    return props.children;
  }
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
