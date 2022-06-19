import { AuthFormWrapper } from '@/components/AuthFormWrapper';
import { windwalker } from '@/data/windwalker';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import {
  BasicProfileSchema,
  TBasicProfileSchema,
} from './profile/BasicProfileModal';
import { CollegeProfileSchema, TCollegeProfileSchema } from './SettingsPage';

export function OnboardingPage() {
  const toast = useToast({
    position: 'bottom',
    isClosable: true,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation<string, string, Record<string, any>>(
    (data) => windwalker.post('secure/profile/basic', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('secure/profile/');
        queryClient.invalidateQueries('secure/onboarding');
      },
    }
  );
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TBasicProfileSchema>({
    resolver: zodResolver(BasicProfileSchema),
  });

  const onSave: SubmitHandler<TBasicProfileSchema> = async (values) => {
    try {
      mutation.mutateAsync(values);
      toast({
        status: 'success',
        title: 'Successfully updated basic profile.',
      });
    } catch (err) {
      toast({
        status: 'error',
        title: 'Failed to update basic profile.',
      });
    }
  };

  return (
    <AuthFormWrapper>
      <VStack align='flex-start' spacing='4'>
        {/* Full Name */}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor='full-name'>Full Name</FormLabel>
          <Input id='full-name' {...register('name')} />
          {errors.name ? (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Enter your full name.</FormHelperText>
          )}
        </FormControl>
        {/* Phone Number */}
        <FormControl isInvalid={!!errors.phone}>
          <FormLabel htmlFor='phone'>Phone Number</FormLabel>
          <Input id='phone' {...register('phone')} />
          {errors.phone ? (
            <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
          ) : (
            <FormHelperText>
              An phone number through the employer will contact you.
            </FormHelperText>
          )}
        </FormControl>
        {/* Gender */}
        <FormControl isInvalid={!!errors.gender}>
          <FormLabel htmlFor='gender'>Gender</FormLabel>
          <Select
            placeholder='Select Gender'
            id='gender'
            {...register('gender')}
          >
            {['Male', 'Female', 'Non Binary'].map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </Select>
          {errors.gender && (
            <FormErrorMessage>{errors.gender.message}</FormErrorMessage>
          )}
        </FormControl>
        {/* Nationality */}
        <FormControl isInvalid={!!errors.nationality}>
          <FormLabel htmlFor='nationality'>Nationality</FormLabel>
          <Input id='nationality' {...register('nationality')} />
          {errors.nationality && (
            <FormErrorMessage>{errors.nationality.message}</FormErrorMessage>
          )}
        </FormControl>

        {/* Caste */}
        <FormControl isInvalid={!!errors.caste}>
          <FormLabel htmlFor='caste'>Caste</FormLabel>
          <Select placeholder='Select Caste' id='caste' {...register('caste')}>
            {['ST', 'SC', 'OBC-A', 'OBC-B', 'UR'].map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </Select>
          {errors.caste && (
            <FormErrorMessage>{errors.caste.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button
          colorScheme='blue'
          isLoading={isSubmitting}
          onClick={handleSubmit(onSave)}
          w='full'
        >
          Update Profile
        </Button>
      </VStack>
    </AuthFormWrapper>
  );
}

export function CollegeOnboardingPage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TCollegeProfileSchema>({
    resolver: zodResolver(CollegeProfileSchema),
  });

  const toast = useToast({
    position: 'bottom',
    isClosable: true,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation<string, string, Record<string, any>>(
    (data) => windwalker.post('secure/college/profile', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('secure/onboarding');
        queryClient.invalidateQueries('secure/college/profile');
      },
    }
  );

  const onSave: SubmitHandler<TCollegeProfileSchema> = (values) => {
    try {
      mutation.mutateAsync(values);
      toast({
        status: 'success',
        title: 'Successfully updatedprofile.',
      });
    } catch (err) {
      toast({
        status: 'error',
        title: 'Failed to update profile.',
      });
    }
  };

  return (
    <AuthFormWrapper>
      <VStack align='flex-start' spacing='4'>
        {/* Full Name */}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor='full-name'>Institution Name</FormLabel>
          <Input id='full-name' {...register('name')} />
          {errors.name ? (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Enter institution name.</FormHelperText>
          )}
        </FormControl>
        {/* Phone Number */}
        <FormControl isInvalid={!!errors.phone}>
          <FormLabel htmlFor='phone'>Phone Number</FormLabel>
          <Input id='phone' {...register('phone')} />
          {errors.phone && (
            <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
          )}
        </FormControl>
        {/* Address */}
        <FormControl isInvalid={!!errors.address}>
          <FormLabel htmlFor='address'>Address</FormLabel>
          <Input id='address' {...register('address')} />
          {errors.address && (
            <FormErrorMessage>{errors.address.message}</FormErrorMessage>
          )}
        </FormControl>
        {/* Type */}
        <FormControl isInvalid={!!errors.type}>
          <FormLabel htmlFor='type'>Type</FormLabel>
          <Select placeholder='Select type' id='type' {...register('type')}>
            {[
              'Secondary',
              'Higher Secondary',
              'Diploma',
              'B.Sc',
              'M.Sc',
              'B.Tech',
              'M.Tech',
            ].map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </Select>
          {errors.type && (
            <FormErrorMessage>{errors.type.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button
          colorScheme='blue'
          isLoading={isSubmitting}
          onClick={handleSubmit(onSave)}
          w='full'
        >
          Save
        </Button>
      </VStack>
    </AuthFormWrapper>
  );
}
