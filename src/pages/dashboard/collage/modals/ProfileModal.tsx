import { windwalker } from '@/data/windwalker';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
  VStack,
} from '@chakra-ui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';

const CollegeProfileSchema = z.object({
  name: z.string().nonempty(),
  phone: z.string().nonempty(),
  address: z.string().nonempty(),
  type: z.string().nonempty(),
});

type TCollegeProfileSchema = z.infer<typeof CollegeProfileSchema>;

const ProfileModal = NiceModal.create(() => {
  const modal = useModal();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TCollegeProfileSchema>({
    resolver: zodResolver(CollegeProfileSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation<string, string, Record<string, any>>(
    (data) => windwalker.post('secure/college/profile', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('secure/me');
      },
    }
  );

  const toast = useToast({
    position: 'bottom',
    isClosable: true,
  });

  const onSave: SubmitHandler<TCollegeProfileSchema> = (values) => {
    try {
      mutation.mutateAsync(values);
      toast({
        status: 'success',
        title: 'Profile created',
      });
      modal.hide();
      modal.remove();
    } catch (err) {
      toast({
        status: 'error',
        title: 'Failed to create profile',
      });
    }
  };

  return (
    <Modal
      isOpen={modal.visible}
      onClose={modal.hide}
      onCloseComplete={modal.remove}
    >
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
      <ModalContent>
        <ModalHeader>Create College Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align='flex-start' spacing='4'>
            {/* Name */}
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
          </VStack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing='6'>
            <Button
              colorScheme='blue'
              isLoading={isSubmitting}
              onClick={handleSubmit(onSave)}
            >
              Save
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default ProfileModal;
