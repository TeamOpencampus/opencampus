import { Icon } from '@/components/Icon';
import { TProfile } from '@/model/TProfile';
import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Column, useTable } from 'react-table';
import z from 'zod';
import Scaffold from '../Scaffold';

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

  const { data, isLoading, isError, refetch } = useQuery<TProfile[]>(
    'secure/college/students'
  );

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
    <Scaffold
      title='Students'
      actions={[
        <Button
          leftIcon={<Icon name='person_add' />}
          onClick={onOpen}
          ref={finalRef}
          colorScheme='blue'
        >
          Invite
        </Button>,
        <Button variant='outline' colorScheme='blue' disabled>
          Export
        </Button>,
      ]}
    >
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
        {isError ? (
          <VStack
            p='8'
            borderColor='gray.200'
            borderWidth='thin'
            borderRadius='md'
          >
            <Icon name='error' style={{ fontSize: '3em' }} />
            <Text>Failed to load data.</Text>
            <Button
              variant='outline'
              colorScheme='red'
              isLoading={isLoading}
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </VStack>
        ) : isLoading ? (
          <VStack
            p='8'
            borderColor='gray.200'
            borderWidth='thin'
            borderRadius='md'
          >
            <Spinner />
            <Text>Loading Data...</Text>
          </VStack>
        ) : !data ? (
          <VStack
            p='8'
            borderColor='gray.200'
            borderWidth='thin'
            borderRadius='md'
          >
            <Text>No records. Add more companies.</Text>
          </VStack>
        ) : (
          <StudentsTable
            data={data.map((e) => ({
              email: e.email,
              name: e.edges.student_profile?.name!,
              appearedIn: 0,
              selectedIn: 0,
              phone: e.edges.student_profile?.phone!,
              profileCompleted: 0,
            }))}
          />
        )}
      </VStack>
    </Scaffold>
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

function StudentsTable({ data }: { data: TStudentsData[] }) {
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<TStudentsData>({
      columns,
      data,
    });
  return (
    <TableContainer border='1px' borderColor='gray.100' borderRadius='md'>
      <Table variant='striped' size='sm' {...getTableProps()}>
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
