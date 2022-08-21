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

export const BasicProfileSchema = z.object({
  name: z.string().nonempty(),
  phone: z.string().nonempty(),
  gender: z.string().nonempty(),
  nationality: z.string().nonempty(),
  caste: z.string().nonempty(),
});
export type TBasicProfileSchema = z.infer<typeof BasicProfileSchema>;

export default NiceModal.create<TBasicProfileSchema>((data) => {
  const modal = useModal();
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
      },
    }
  );
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: data,
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
    } finally {
      modal.hide();
      modal.remove();
    }
  };
  const onCancel = () => {
    reset();
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
        <ModalHeader>Edit Basic Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align='flex-start' spacing='2'>
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
                <FormErrorMessage>
                  {errors.nationality.message}
                </FormErrorMessage>
              )}
            </FormControl>
            {/* Caste */}
            <FormControl isInvalid={!!errors.caste}>
              <FormLabel htmlFor='caste'>Caste</FormLabel>
              <Select
                placeholder='Select Caste'
                id='caste'
                {...register('caste')}
              >
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
          </VStack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup spacing='6'>
            <Button onClick={onCancel}>Cancel</Button>
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
