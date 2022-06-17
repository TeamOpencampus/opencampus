import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

type TCredentials = {
  token: string;
  refresh_token: string;
};

const getToken = () => localStorage.getItem('creds') as TCredentials | null;
const deleteToken = () => localStorage.removeItem('creds');
const isLoggedIn = () => !!localStorage.getItem('creds');
const decodeToken = () =>
  jwtDecode<{ sub: string; role: string }>(getToken()!.token);

type AuthState = { id?: string; role?: string };

const initialState: () => AuthState = () => {
  if (isLoggedIn()) {
    const data = decodeToken();
    return { id: data.sub, role: data.role };
  } else return {};
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, payload: PayloadAction<TCredentials>) => {
      const data = decodeToken();
      state.id = data.sub;
      state.role = data.role;
    },
    logout: (state) => {
      deleteToken();
      delete state.id;
      delete state.role;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
