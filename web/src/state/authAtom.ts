import { atom } from 'recoil';

type TAuthState = {
  id: string;
  role: string;
  token: string;
  refresh_token: string;
} | null;

const loadState = () => {
  const userString = localStorage.getItem('user');
  if (userString) {
    return JSON.parse(userString);
  }
  return null;
};

const authAtom = atom<TAuthState>({
  key: 'authState',
  default: loadState(),
});

export default authAtom;
