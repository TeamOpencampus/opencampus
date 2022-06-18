import * as windwalker from '@/data/windwalker';
import authAtom from '@/state/authAtom';
import { useToast } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';

export function useAuthAction() {
  const setAuthState = useSetRecoilState(authAtom);

  const toast = useToast({
    isClosable: true,
    variant: 'left-accent',
  });

  const showError = (title: string, description: string) => {
    toast.closeAll();
    toast({
      status: 'error',
      position: 'bottom',
      title,
      description,
    });
  };
  return { login, logout, register };

  async function login(email: string, password: string) {
    try {
      const res = await windwalker.login(email, password);
      localStorage.setItem('user', JSON.stringify(res.data));
      setAuthState(res.data);
    } catch (e) {
      showError('Failed to sign in.', 'Unable to connect to the server.');
    }
  }

  async function register(email: string, password: string) {
    try {
      const res = await windwalker.register(email, password);
      localStorage.setItem('user', JSON.stringify(res.data));
      setAuthState(res.data);
    } catch (e) {
      showError(
        'Failed to create account.',
        'Unable to connect to the server.'
      );
    }
  }

  function logout() {
    localStorage.removeItem('user');
    setAuthState(null);
  }
}
