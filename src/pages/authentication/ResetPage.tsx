import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { AuthFormWrapper } from '../../components/AuthFormWrapper';
import { useAuthActions } from '../../_actions/auth.action';

const ResetInput = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

type ResetInputType = z.infer<typeof ResetInput>;

export function ResetPage() {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ResetInputType>({ resolver: zodResolver(ResetInput) });

  const authAction = useAuthActions();

  const resetHandler = async (values: ResetInputType) => {
    try {
      // send reset instructions
      await authAction.resetPassword(values.email);
      // reset form
      reset();
      // show toast on success
      toast({
        title: 'Reset requested',
        description: `Password reset instuctions sent to ${values.email}.`,
        status: 'success',
        isClosable: true,
        position: 'bottom',
      });
    } catch (e) {
      toast({
        title: 'Failed to send reset instructions.',
        description: (e as Error).message,
        status: 'error',
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <AuthFormWrapper>
      <form onSubmit={handleSubmit(resetHandler)}>
        <VStack spacing='4' align='start'>
          <Heading size='lg'>Reset account password.</Heading>
          {/* Email TextBox */}
          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor='email'>Email Address</FormLabel>
            <Input
              id='email'
              type='email'
              autoComplete='email'
              {...register('email')}
            />

            {errors.email ? (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            ) : (
              <FormHelperText>
                Enter the email associated with your account.
              </FormHelperText>
            )}
          </FormControl>

          {/* Submit Button */}
          <Button
            width='full'
            colorScheme='blue'
            type='submit'
            isLoading={isSubmitting}
            loadingText='Sending...'
          >
            Reset Password
          </Button>
          <Button width='full' variant='ghost' as={Link} to='/login'>
            Go back to login
          </Button>
        </VStack>
      </form>
    </AuthFormWrapper>
  );
}
