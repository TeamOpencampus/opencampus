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

const AcademicProfileSchema = z.object({
  id: z.number().optional(),
  course: z.string().nonempty(),
  institute: z.string().nonempty(),
  board: z.string().nonempty(),
  reg_no: z.string().nonempty(),
  department: z.string().nonempty(),
  start_date: z.string().nonempty(),
  end_date: z.string().nonempty(),
  marks: z.string().nonempty(),
});

type TAcademicProfileSchema = z.infer<typeof AcademicProfileSchema>;

export default NiceModal.create<TAcademicProfileSchema>((data) => {
  const modal = useModal();

  const toast = useToast({
    position: 'bottom',
    isClosable: true,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation<string, string, Record<string, any>>(
    data?.id
      ? (newData) =>
          windwalker.put(`secure/profile/academic/${data.id}`, newData)
      : (data) => windwalker.post('secure/profile/academic', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('secure/me');
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
    resolver: zodResolver(AcademicProfileSchema),
  });
  const onSave: SubmitHandler<TAcademicProfileSchema> = (values) => {
    try {
      mutation.mutateAsync(values);
      toast({
        status: 'success',
        title: 'Academic details added',
      });
    } catch (err) {
      toast({
        status: 'error',
        title: 'Failed to add academic details',
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
        <ModalHeader>
          {!data?.id ? 'Add Education Details' : 'Edit Education Details'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align='flex-start' spacing='2'>
            {/* Type of Course */}
            <FormControl isInvalid={!!errors.course}>
              <FormLabel htmlFor='course'>Course</FormLabel>

              <Select
                placeholder='Select Course'
                id='course'
                {...register('course')}
              >
                {[
                  'Secondary',
                  'Higher Secondary',
                  'Diploma',
                  'B.Sc',
                  'M.Sc',
                  'B.Tech',
                  'M.Tech',
                ].map((e, i) => (
                  <option value={e} key={i}>
                    {e}
                  </option>
                ))}
              </Select>
              {errors.course ? (
                <FormErrorMessage>{errors.course.message}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Choose qualified or ongoing course
                </FormHelperText>
              )}
            </FormControl>
            {/* Institute */}
            <FormControl isInvalid={!!errors.institute}>
              <FormLabel htmlFor='institute'>Institute</FormLabel>
              <Input
                placeholder='Enter college or institute here'
                id='institute'
                {...register('institute')}
              />
              {errors.institute && (
                <FormErrorMessage>{errors.institute.message}</FormErrorMessage>
              )}
            </FormControl>
            {/* Board or Council */}
            <FormControl isInvalid={!!errors.board}>
              <FormLabel htmlFor='board'>
                Board or Council or University
              </FormLabel>
              <Input
                placeholder='Enter board or council or university here'
                id='board'
                {...register('board')}
              />
              {errors.board && (
                <FormErrorMessage>{errors.board.message}</FormErrorMessage>
              )}
            </FormControl>
            {/* Reg No */}
            <FormControl isInvalid={!!errors.board}>
              <FormLabel htmlFor='reg_no'>Registration Number</FormLabel>
              <Input
                placeholder='Enter registration number here'
                id='reg_no'
                {...register('reg_no')}
              />
              {errors.board && (
                <FormErrorMessage>{errors.board.message}</FormErrorMessage>
              )}
            </FormControl>
            {/* Stream or Department */}
            <FormControl isInvalid={!!errors.department}>
              <FormLabel htmlFor='stream'>Department</FormLabel>
              <Input
                placeholder='Enter department or stream here'
                id='stream'
                {...register('department')}
              />
              {errors.department && (
                <FormErrorMessage>{errors.department.message}</FormErrorMessage>
              )}
            </FormControl>
            {/* Start Date */}
            <FormControl isInvalid={!!errors.start_date}>
              <FormLabel htmlFor='start-date'>Course Start Date</FormLabel>
              <Input
                placeholder='Enter start date here'
                id='start-date'
                {...register('start_date')}
              />
              {errors.start_date && (
                <FormErrorMessage>{errors.start_date.message}</FormErrorMessage>
              )}
            </FormControl>
            {/* End Date */}
            <FormControl isInvalid={!!errors.end_date}>
              <FormLabel htmlFor='end-date'>Course End Date</FormLabel>
              <Input
                placeholder='Enter end date here'
                id='end-date'
                {...register('end_date')}
              />
              {errors.end_date && (
                <FormErrorMessage>{errors.end_date.message}</FormErrorMessage>
              )}
            </FormControl>
            {/* Marks */}
            <FormControl isInvalid={!!errors.marks}>
              <FormLabel htmlFor='marks'>Marks CGPA or Percentage</FormLabel>
              <Input
                placeholder='Enter cgpa or percentage here'
                id='marks'
                {...register('marks')}
              />
              {errors.marks ? (
                <FormErrorMessage>{errors.marks.message}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Average marks cgpa or percentage
                </FormHelperText>
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
