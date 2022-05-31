import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import { applyActionCode } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { AuthFormWrapper } from '../../components/AuthFormWrapper';
import { auth } from '../../firebase';
import { useAuthActions } from '../../_actions/auth.action';

export function ActionPage() {
  // @todo: Replace custom parsing logic with `parseActionCodeURL` function from `firebase/auth`.
  const [params] = useSearchParams();
  const mode = params.get('mode') as
    | 'resetPassword'
    | 'recoverEmail'
    | 'verifyEmail'
    | null;
  const actionCode = params.get('oobCode');
  const continueUrl = params.get('continueUrl') ?? '/';

  if (
    !mode ||
    !actionCode ||
    !['resetPassword', 'recoverEmail', 'verifyEmail'].includes(mode)
  )
    return <Navigate to='/not-found' replace />;

  return (
    <AuthFormWrapper>
      {mode === 'resetPassword' && <ResetForm code={actionCode} />}
      {/* {mode === 'recoverEmail' && <ResetForm />} */}
      {mode === 'verifyEmail' && (
        <VerifyForm code={actionCode} url={continueUrl} />
      )}
    </AuthFormWrapper>
  );
}

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const ResetFormInput = z.object({
  password: z
    .string()
    .regex(
      passwordRegex,
      'Password must contain at least 8 characters including 1 number and 1 special character'
    ),
});
type TResetFromInput = z.infer<typeof ResetFormInput>;

function ResetForm(props: { code: string }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TResetFromInput>({ resolver: zodResolver(ResetFormInput) });
  const [showPassword, setShowPassword] = useState(false);

  const authAction = useAuthActions();

  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<any | null>(null);
  useEffect(() => {
    authAction
      .verifyResetCode(props.code)
      .then((res) => setEmail(res))
      .catch((err) => setError(err));
  }, []);

  const toast = useToast();
  const [resetSuccess, setResetSuccess] = useState(false);
  const resetHandler = async (values: TResetFromInput) => {
    try {
      await authAction.confirmResetPassword(props.code, values.password);
      reset();
      setResetSuccess(true);
    } catch (e) {
      toast({
        status: 'error',
        title: 'Failed to reset password.',
        description: (e as any).code,
        position: 'bottom',
        isClosable: true,
      });
    }
  };

  if (resetSuccess)
    return (
      <VStack>
        <Alert
          status='success'
          variant='top-accent'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt='4' mb='0'>
            Successfully reset password.
          </AlertTitle>
          <AlertDescription maxW='xs'>
            Please continue to login.
          </AlertDescription>
        </Alert>
        <Button as={Link} to='/login' w='full' colorScheme='blue'>
          Go back to login
        </Button>
      </VStack>
    );

  if (!error && !email)
    return (
      <VStack p='8'>
        <CircularProgress size='80px' thickness='2px' isIndeterminate />
        <Text>Checking link...</Text>
      </VStack>
    );

  if (error)
    return (
      <VStack>
        <Alert
          status='error'
          variant='top-accent'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt='4' mb='0'>
            Invalid reset link
          </AlertTitle>
          <AlertDescription maxW='xs'>{error.code}</AlertDescription>
        </Alert>
        <Button as={Link} to='/reset' w='full' colorScheme='blue'>
          Resend Email
        </Button>
      </VStack>
    );

  return (
    <form onSubmit={handleSubmit(resetHandler)}>
      <VStack spacing='4' align='start'>
        <Heading size='lg'>Reset account password.</Heading>
        <Text fontSize='sm'>
          Reset password for{' '}
          <Text as='em' decoration='underline'>
            {email}
          </Text>
        </Text>
        {/* Password TextBox */}
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <InputGroup>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='new-password'
              {...register('password')}
            />
            <InputRightElement w='4.75rem'>
              <Button
                size='sm'
                h='1.75rem'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          {errors.password ? (
            <FormErrorMessage maxW='xs'>
              {errors.password.message}
            </FormErrorMessage>
          ) : (
            <FormHelperText>
              We promise to keep your account safe.
            </FormHelperText>
          )}
        </FormControl>

        {/* Submit Button */}
        <Button
          width='full'
          colorScheme='blue'
          type='submit'
          isLoading={isSubmitting}
          loadingText='Reseting...'
        >
          Reset Password
        </Button>
        <Button width='full' variant='ghost' as={Link} to='/login'>
          Go back to login
        </Button>
      </VStack>
    </form>
  );
}

function VerifyForm(props: { code: string; url: string }) {
  const [state, setState] = useState<{
    verified?: boolean;
    error?: FirebaseError;
  }>({});

  useEffect(() => {
    applyActionCode(auth, props.code)
      .then(() => setState({ verified: true }))
      .catch((err) => setState({ error: err as FirebaseError }));
  }, []);

  if (!state.error && !state.verified)
    return (
      <VStack p='8'>
        <CircularProgress size='80px' thickness='2px' isIndeterminate />
        <Text>Checking link...</Text>
      </VStack>
    );

  if (state.error)
    return (
      <Alert
        status='error'
        variant='top-accent'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt='4' mb='0'>
          Invalid verification link.
        </AlertTitle>
        <AlertDescription maxW='xs'>{state.error.code}</AlertDescription>
      </Alert>
    );

  return (
    <VStack spacing='4'>
      <Alert
        status='success'
        variant='subtle'
        bg='transparent'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt='4' mb='0'>
          Verification Successful
        </AlertTitle>
        <AlertDescription maxW='xs'>
          Please continue, if not automatically redirected.
        </AlertDescription>
      </Alert>
      <Button as={Link} to={props.url} colorScheme='blue' w='full'>
        Continue to Dashboard
      </Button>
    </VStack>
  );
}
