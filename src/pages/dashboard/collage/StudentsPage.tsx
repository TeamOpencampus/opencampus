import { Icon } from '@/components/Icon';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  CircularProgressLabel,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

// Modal form validation object schema
const FormSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// extract the inferred type
type FormSchemaType = z.infer<typeof FormSchema>;

export function StudentsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isCentered
        motionPreset='slideInBottom'
      >
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
        <ModalContent>
          <ModalHeader>Invite Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor='email'>Email Address</FormLabel>
              <Input
                id='email'
                placeholder='Eg: someone@example.com'
                {...register('email')}
              />

              {errors.email ? (
                <FormErrorMessage>{errors.email.message}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Enter email address of the student.
                </FormHelperText>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button variant='outline' onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme='blue'
                isLoading={isSubmitting}
                loadingText='Sending...'
                onClick={handleSubmit(onSubmit)}
              >
                Send Invite
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <VStack spacing='4' align='stretch'>
        <HStack justify='space-between' align='center'>
          <Heading>Students</Heading>
          <ButtonGroup colorScheme='blue' size='sm' isAttached>
            <Button
              leftIcon={<Icon name='person_add' />}
              onClick={onOpen}
              ref={finalRef}
            >
              Invite
            </Button>
            <Button variant='outline' disabled>
              Export
            </Button>
          </ButtonGroup>
        </HStack>
        {/* TODO: Implement filtering logic */}
        <Wrap spacing='2'>
          <Button
            size='sm'
            variant='outline'
            colorScheme='blue'
            leftIcon={<Icon name='add' />}
          >
            Add Filter
          </Button>
        </Wrap>
        <StudentsTable />
      </VStack>
    </>
  );
}

type TStudentsData = {
  name: string;
  email: string;
  phone: string;
  selectedIn: number;
  appearedIn: number;
  profileCompleted: number;
};
function StudentsTable() {
  const columns = useMemo<Column<TStudentsData>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Mobile',
        accessor: 'phone',
      },
      {
        Header: 'Selected In',
        accessor: 'selectedIn',
      },
      {
        Header: 'Appeared In',
        accessor: 'appearedIn',
      },
      {
        Header: 'Profile Completed',
        Cell: (cell) => (
          <CircularProgress value={cell.value} thickness='4px' capIsRound>
            <CircularProgressLabel>{cell.value} %</CircularProgressLabel>
          </CircularProgress>
        ),
        accessor: 'profileCompleted',
      },
    ],
    []
  );
  const data = useMemo<TStudentsData[]>(
    () => [
      {
        name: 'Example User',
        email: 'someone@example.com',
        phone: '+1 1234567890',
        selectedIn: 1,
        appearedIn: 4,
        profileCompleted: 25,
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<TStudentsData>({
      columns,
      data,
    });
  return (
    <TableContainer border='1px' borderColor='gray.100' borderRadius='md'>
      <Table variant='striped' size='md' {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, key) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
