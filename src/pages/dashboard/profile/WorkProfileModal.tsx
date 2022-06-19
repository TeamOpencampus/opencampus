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
  VStack,
} from '@chakra-ui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export const WorkProfileSchema = z.object({
  id: z.number().optional(),
  company: z.string().nonempty('Company name required'),
  start_date: z.string().nonempty('Enter Start date'),
  end_date: z.string().nonempty('Enter end date'),
  salary: z.string().nonempty('Salary required'),
  position: z.string().nonempty('Enter position'),
});

type TWorkProfileSchema = z.infer<typeof WorkProfileSchema>;

export default NiceModal.create<TWorkProfileSchema>((data) => {
  const modal = useModal();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: data,
    resolver: zodResolver(WorkProfileSchema),
  });
  const onSave: SubmitHandler<TWorkProfileSchema> = (values) => {
    console.log(values);
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
            {/* Previous Company */}
            <FormControl>
              <FormLabel htmlFor='company'>Previous Company</FormLabel>
              <Input
                placeholder='Enter name of company here'
                id='company'
                {...register('company')}
              />

              {errors.company ? (
                <FormErrorMessage>{errors.company.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Previous Company Name</FormHelperText>
              )}
            </FormControl>
            {/* Start Date */}
            <FormControl>
              <FormLabel htmlFor='start_date_exp'>Start Date</FormLabel>
              {/* <FormHelperText>Enter start date</FormHelperText> */}
              <Input
                placeholder='Enter start date here'
                id='start_date_exp'
                {...register('start_date')}
              />

              {errors.start_date ? (
                <FormErrorMessage>{errors.start_date.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Previous job start date</FormHelperText>
              )}
            </FormControl>
            {/* End Date */}
            <FormControl>
              <FormLabel htmlFor='end_date_exp'>End Date</FormLabel>
              {/* <FormHelperText>Enter end date</FormHelperText> */}
              <Input
                placeholder='Enter end date here'
                id='end_date_exp'
                {...register('end_date')}
              />
              {errors.end_date ? (
                <FormErrorMessage>{errors.end_date.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Previous job end date</FormHelperText>
              )}
            </FormControl>
            {/* Last Salary */}
            <FormControl>
              <FormLabel htmlFor='last_salary'>Last Salary</FormLabel>
              {/* <FormHelperText>Enter your last salary here</FormHelperText> */}
              <Input
                placeholder='Enter last salary here'
                id='last_salary'
                {...register('salary')}
              />

              {errors.salary ? (
                <FormErrorMessage>{errors.salary.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Salary of previous company</FormHelperText>
              )}
            </FormControl>
            {/* Position */}
            <FormControl>
              <FormLabel htmlFor='position'>Position</FormLabel>
              <Input
                placeholder='Enter last position'
                id='position'
                {...register('position')}
              />
              {errors.position ? (
                <FormErrorMessage>{errors.position.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Position at previous company</FormHelperText>
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
