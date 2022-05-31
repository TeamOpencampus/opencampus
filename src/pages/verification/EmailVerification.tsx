import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Heading,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { AuthFormWrapper } from '../../components/AuthFormWrapper';
import { auth } from '../../firebase';
import { useAppSelector } from '../../hooks';
import { useAuthActions } from '../../_actions/auth.action';

export function EmailVerification() {
  const toast = useToast();
  const actions = useAuthActions();
  const user = useAppSelector((state) => state.auth.user)!;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await actions.sendEmailVerification(auth.currentUser!);
      setSuccess(true);
    } catch (e) {
      toast({
        title: 'Failed to send verification email.',
        description: (e as FirebaseError).name,
        position: 'bottom',
        isClosable: true,
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  if (success)
    return (
      <AuthFormWrapper>
        <Alert
          status='success'
          variant='subtle'
          bg='transparent'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Verification mail sent.
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            Verification instructions sent to {user.email}. Please also check
            the spam folder.
          </AlertDescription>
        </Alert>
      </AuthFormWrapper>
    );
  return (
    <AuthFormWrapper>
      <VStack spacing='4' align='start'>
        <Heading size='lg'>Verify your email.</Heading>
        <Text fontSize='sm'>
          Use the button below to send the verification link to your mailbox.
        </Text>
        <Button
          width='full'
          colorScheme='blue'
          isLoading={loading}
          loadingText='Sending email...'
          onClick={handleSendOtp}
        >
          Send Verification Link
        </Button>
      </VStack>
    </AuthFormWrapper>
  );
}
