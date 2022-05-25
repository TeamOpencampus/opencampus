import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import {
  ActionPage,
  LoginPage,
  ResetPage,
  SignupPage,
} from './pages/authentication';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { HomePage } from './pages/dashboard/HomePage';
import { NotificationPage } from './pages/dashboard/NotificationPage';
import { NoMatchPage } from './pages/NoMatchPage';
import { VerifyUserPage } from './pages/verification/VerifyUserPage';
import { useAppDispatch } from './_state/hooks';
import { login, logout } from './_state/slices/auth';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // const user = useMemo(() => val, [val]);

      if (user === null) dispatch(logout());
      else dispatch(login(user));
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path='/' element={<DashboardPage />}>
        <Route index element={<HomePage />} />
        <Route path='verify' element={<VerifyUserPage />} />
        {/* <Route path='discover' element={<DiscoverPage />} /> */}
        <Route path='notifications' element={<NotificationPage />} />
        {/* <Route path='profile' element={<ProfilePage />} /> */}
      </Route>
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='reset' element={<ResetPage />} />
      <Route path='__action' element={<ActionPage />} />
      <Route path='*' element={<NoMatchPage />} />
    </Routes>
  );
}

export default App;
