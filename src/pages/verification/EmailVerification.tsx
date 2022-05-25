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
import { useAuthActions } from '../../_actions/auth.action';
import { useAppSelector } from '../../_state/hooks';

export function EmailVerification() {
  const toast = useToast();
  const authAction = useAuthActions();
  const user = useAppSelector((state) => state.auth.user)!;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await authAction.sendEmailVerification(user);
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
      <Alert
        status='success'
        variant='subtle'
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
          Verification instructions sent to {user.email}. Please also check the
          spam folder.
        </AlertDescription>
      </Alert>
    );
  return (
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
  );
}
