import { useAuthAction } from '@/actions/auth.action';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { z } from 'zod';
import { AuthFormWrapper } from '../../components/AuthFormWrapper';
import { CheckAuth } from '../../components/WithAuthentication';

// regex for password with at least 8 characters including 1 number, 1 special charater
// ref: https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const SignupInput = z.object({
  // fullname: z.string().nonempty('You must provide your name.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z
    .string()
    .regex(
      passwordRegex,
      'Password must contain at least 8 characters including 1 number and 1 special character'
    ),
});

type SignupInputType = z.infer<typeof SignupInput>;

export function SignupPage() {
  const action = useAuthAction();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<SignupInputType>({ resolver: zodResolver(SignupInput) });

  const [showPassword, setShowPassword] = useState(false);

  const signupHandler: SubmitHandler<SignupInputType> = (values) =>
    action.register(values.email, values.password);

  return (
    <CheckAuth>
      <AuthFormWrapper>
        <form onSubmit={handleSubmit(signupHandler)}>
          <VStack spacing='4' align='start'>
            <Heading size='lg'>Create an account.</Heading>
            {/* Fullname TextBox */}
            {/* <FormControl isInvalid={Boolean(errors.fullname)}>
              <FormLabel htmlFor='fullname'>Full name</FormLabel>
              <Input
                id='fullname'
                type='text'
                autoComplete='name'
                {...register('fullname')}
              />
              {errors.fullname && (
                <FormErrorMessage>{errors.fullname.message}</FormErrorMessage>
              )}
            </FormControl> */}

            {/* Email TextBox */}
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor='email'>Email address</FormLabel>
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
                <FormHelperText>Enter the magic words.</FormHelperText>
              )}
            </FormControl>

            {/* Submit Button */}
            <Button
              width='full'
              colorScheme='blue'
              type='submit'
              isLoading={isSubmitting}
              loadingText='Creating Account...'
            >
              Create Account
            </Button>
            <HStack>
              <Text fontSize='sm'>Already have an account ?</Text>
              <Link fontSize='sm' color='blue.500' as={RouterLink} to='/login'>
                Sign In
              </Link>
            </HStack>
          </VStack>
        </form>
      </AuthFormWrapper>
    </CheckAuth>
  );
}
