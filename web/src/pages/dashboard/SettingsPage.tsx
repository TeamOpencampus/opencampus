import { Icon } from '@/components/Icon';
import { windwalker } from '@/data/windwalker';
import { TProfile } from '@/model/TProfile';
import authAtom from '@/state/authAtom';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  StackDivider,
  Tag,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { z } from 'zod';
import Scaffold from './Scaffold';

export function SettingsPage() {
  const auth = useRecoilValue(authAtom);
  const role = auth?.role;
  return (
    <Scaffold title='Settings'>
      <VStack spacing='6' align='flex-start' maxW='sm'>
        <ChangePasswordForm />
        {role === 'student' && <JoinCollegeForm />}
      </VStack>
    </Scaffold>
  );
}

function AdditionalDocumentsForm() {
  return (
    <VStack align='flex-start' spacing='4' divider={<StackDivider />}>
      {/* Photo */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='photo'>Current photo</FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='photo'>
            Select File
          </Button>
        </Stack>
      </FormControl>
      {/* Signature */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='sign'>Your Signature</FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='sign'>
            Select File
          </Button>
        </Stack>
      </FormControl>
      {/* ID_Proof */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='ID_proof'>Valid Identity Proof</FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='ID_proof'>
            Select File
          </Button>
        </Stack>
      </FormControl>
      {/* Caste Certificate */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='certificate'>
              Caste Certificate (if any)
            </FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='certificate'>
            Select File
          </Button>
        </Stack>
      </FormControl>
    </VStack>
  );
}

// regex for password with at least 8 characters including 1 number, 1 special charater
// ref: https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const PasswordInput = z.object({
  password: z
    .string()
    .regex(
      passwordRegex,
      'Password must contain at least 8 characters including 1 number and 1 special character'
    ),
});

type PasswordInputType = z.infer<typeof PasswordInput>;

function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordInputType>({ resolver: zodResolver(PasswordInput) });

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const onChange: SubmitHandler<PasswordInputType> = (values) => {
    console.log(values);
  };

  return (
    <VStack
      align='stretch'
      spacing='4'
      borderWidth='thin'
      p='4'
      borderRadius='md'
      w='full'
    >
      {/* Change Password */}
      <Text fontWeight='semibold'>Change Password</Text>
      <FormControl isInvalid={!!errors.password} maxW='sm'>
        <FormLabel htmlFor='new-password'>New Password</FormLabel>
        <InputGroup>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter new password'
            autoComplete='new-password'
            {...register('password')}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>
      {/* Button */}
      <Button
        colorScheme='blue'
        onClick={handleSubmit(onChange)}
        isLoading={isSubmitting}
      >
        Update Password
      </Button>
    </VStack>
  );
}

const JoinCollegeModal = NiceModal.create(() => {
  const modal = useModal();
  const toast = useToast({
    position: 'bottom',
    isClosable: true,
  });
  const queryClient = useQueryClient();
  const query = useQuery<TProfile[]>('secure/colleges');
  const mutation = useMutation<string, string, string>(
    (data) => windwalker.post(`secure/colleges/join/${data}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('secure/me');
        toast({
          status: 'success',
          title: 'Successfully enrolled to the institute.',
        });
        modal.hide();
        modal.remove();
      },
      onError: () => {
        toast({
          status: 'error',
          title: 'Failed to enroll.',
        });
      },
    }
  );

  const [value, setValue] = useState<string>('');
  const handleSubmit = () => {
    if (value) mutation.mutate(value);
  };

  const onCancel = () => {
    modal.hide();
    modal.remove();
  };

  return (
    <Modal
      isOpen={modal.visible}
      onClose={modal.hide}
      onCloseComplete={modal.remove}
    >
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
      <ModalContent>
        <ModalHeader>Join a college</ModalHeader>
        <ModalCloseButton />
        {query.isError ? (
          <ModalBody>
            <VStack spacing='4' py='6'>
              <Icon name='error' style={{ color: 'red', fontSize: '3em' }} />
              <Text>Failed to fetch colleges.</Text>
              <Button
                variant='outline'
                colorScheme='red'
                onClick={() => query.refetch()}
              >
                Retry
              </Button>
            </VStack>
          </ModalBody>
        ) : query.isLoading ? (
          <ModalBody>
            <VStack spacing='4' py='6'>
              <Spinner size='xl' />
              <Text>Loading colleges...</Text>
            </VStack>
          </ModalBody>
        ) : (
          <>
            <ModalBody>
              <FormControl>
                <FormLabel>Choose a college</FormLabel>
                <Select
                  placeholder='Select a college...'
                  required
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                >
                  {query.data?.map((e, i) => (
                    <option value={e.id}>
                      {e.edges?.college_profile?.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup spacing='6'>
                <Button onClick={onCancel}>Cancel</Button>
                <Button
                  colorScheme='blue'
                  isLoading={mutation.isLoading}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});

function JoinCollegeForm() {
  const { data, isError, isLoading, refetch } = useQuery<TProfile>('secure/me');

  return (
    <VStack
      align='stretch'
      spacing='4'
      borderWidth='thin'
      p='4'
      borderRadius='md'
      w='full'
    >
      <Text fontWeight='semibold'>Associated Colleges</Text>
      {isError ? (
        <Text>Error loading associations</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : !data?.edges?.enrolled_in ? (
        <Text>You are not associated with any institutions.</Text>
      ) : (
        <Wrap>
          {data?.edges?.enrolled_in?.map((e, i) => (
            <WrapItem key={i}>
              <Tag colorScheme='blue'>{e.edges?.college_profile?.name}</Tag>
            </WrapItem>
          ))}
        </Wrap>
      )}
      <Button
        colorScheme='blue'
        onClick={() => NiceModal.show(JoinCollegeModal)}
      >
        Join a College
      </Button>
    </VStack>
  );
}
