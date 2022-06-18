import { useAuthAction } from '@/actions/auth.action';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { z } from 'zod';
import { AuthFormWrapper } from '../../components/AuthFormWrapper';
import { CheckAuth } from '../../components/WithAuthentication';

const LoginInput = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().nonempty('Password can not be empty.'),
});

type LoginInputType = z.infer<typeof LoginInput>;

export function LoginPage() {
  const { login } = useAuthAction();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<LoginInputType>({ resolver: zodResolver(LoginInput) });

  const loginHandler: SubmitHandler<LoginInputType> = (values) =>
    login(values.email, values.password);

  return (
    <CheckAuth>
      <AuthFormWrapper>
        <form onSubmit={handleSubmit(loginHandler)}>
          <VStack spacing='4' align='start'>
            <Heading size='lg'>Sign in to your account.</Heading>
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
                <FormHelperText>We'll never share your email.</FormHelperText>
              )}
            </FormControl>
            {/* Password TextBox */}
            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                type='password'
                autoComplete='current-password'
                {...register('password')}
              />

              {errors.password ? (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Enter the magic words.</FormHelperText>
              )}
            </FormControl>

            <Link fontSize='sm' as={RouterLink} to='/reset'>
              Forgot password ?
            </Link>
            {/* Submit Button */}
            <Button
              width='full'
              colorScheme='blue'
              type='submit'
              isLoading={isSubmitting}
              loadingText='Signing In...'
            >
              Sign In
            </Button>
            <Text fontSize='sm'>
              Don't have an account ?
              <Link ml='2' color='blue.500' as={RouterLink} to='/signup'>
                Create Now
              </Link>
            </Text>
          </VStack>
        </form>
      </AuthFormWrapper>
    </CheckAuth>
  );
}
