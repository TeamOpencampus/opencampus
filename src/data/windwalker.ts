import axios from 'axios';

type SigninRequest = { email: string; password: string };
type TokenResponse = { token: string; refresh_token: string };

const baseURL: string = import.meta.env.VITE_API_URL;
const client = axios.create({ baseURL });
export const login = (email: string, password: string) =>
  client.post<TokenResponse>('login', { email, password });
export const register = (email: string, password: string) =>
  client.post<TokenResponse>('register', { email, password });
