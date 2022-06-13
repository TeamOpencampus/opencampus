import { createSlice } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';

const getToken = () => Cookie.get('token');
const deleteToken = () => Cookie.remove('token');
const isLoggedIn = () => !!Cookie.get('token');
const decodeCookie = () =>
  jwtDecode<{ sub: string; role: string }>(getToken()!);

type AuthState = { id?: string; role?: string };

const initialState: () => AuthState = () => {
  if (isLoggedIn()) {
    const data = decodeCookie();
    return { id: data.sub, role: data.role };
  } else return {};
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      const data = decodeCookie();
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
