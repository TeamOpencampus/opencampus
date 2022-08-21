import axios from 'axios';

type TokenResponse = {
  id: string;
  role: string;
  token: string;
  refresh_token: string;
};

const baseURL: string = import.meta.env.VITE_API_URL;
const client = axios.create({ baseURL });
export const login = (email: string, password: string) =>
  client.post<TokenResponse>('login', { email, password });
export const register = (email: string, password: string) =>
  client.post<TokenResponse>('register', { email, password });

const windwalker = axios.create({
  baseURL,
});

windwalker.interceptors.request.use(function (config) {
  config.headers = {
    Authorization: JSON.parse(localStorage.getItem('user')!)?.token,
  };
  return config;
});

export { windwalker };
