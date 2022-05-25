import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../_state/hooks';

export const RequireAuth: React.FC<{
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

// type RequireVerificationProps = { children: JSX.Element };
// export const RequireVerification: React.FC<RequireVerificationProps> = (
//   props
// ) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const user = useAppSelector((state) => state.auth.user)!;
//   const userMemo = useMemo(() => user, [user?.uid, user === null]);

//   useEffect(() => {
//     if (!userMemo.emailVerified || !userMemo.phoneNumber) {
//       navigate('/verify', { state: { from: location } });
//     }
//   }, [userMemo]);

//   // if (loading) return <LoadingPage />;

//   // TODO: Handle verification state here.
//   return props.children;
// };
