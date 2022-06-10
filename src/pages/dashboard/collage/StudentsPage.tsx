import { Icon } from '@/components/Icon';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  CircularProgressLabel,
  FormControl,
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

export function StudentsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
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
            <FormControl>
              <FormLabel htmlFor='email'>Email Address</FormLabel>
              <Input
                id='email'
                ref={initialRef}
                placeholder='Eg: someone@example.com'
              />
              <FormHelperText>
                Enter email address of the student.
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button variant='outline' onClick={onClose}>
                Close
              </Button>
              <Button colorScheme='blue'>Send Invite</Button>
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
