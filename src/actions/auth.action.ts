import windwalker from '@/data/windwalker';
import { useAppDispatch } from '@/hooks';
import * as auth from '@/hooks/slices/auth';
import { useToast } from '@chakra-ui/react';

export function useAuthAction() {
  const dispatch = useAppDispatch();
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
      await windwalker.login(email, password);
      dispatch(auth.login());
    } catch (e) {
      showError('Failed to sign in.', 'Unable to connect to the server.');
    }
  }
  async function register(email: string, password: string) {
    try {
      await windwalker.register(email, password);
      dispatch(auth.login());
    } catch (e) {
      showError(
        'Failed to create account.',
        'Unable to connect to the server.'
      );
    }
  }
  function logout() {
    dispatch(auth.logout());
  }
}
