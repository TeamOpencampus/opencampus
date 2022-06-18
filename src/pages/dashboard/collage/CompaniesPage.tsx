import { Icon } from '@/components/Icon';
import { windwalker } from '@/data/windwalker';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
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
  useToast,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Column, useTable } from 'react-table';
import { z } from 'zod';

// Modal form validation schema
const FormSchema = z.object({
  company_name: z
    .string()
    .nonempty({ message: 'Company name cannot be empty' }),
  contact_person_name: z.string().nonempty({ message: 'Name cannot be empty' }),
  contact_person_phone: z
    .string()
    .length(10, { message: 'Phone number must be 10 digits' }),
  contact_person_email: z.string().email({ message: 'Invalid email address' }),
});

// extract the inferred type
type FormSchemaType = z.infer<typeof FormSchema>;

export function CompaniesPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast({
    position: 'bottom',
    isClosable: true,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation<string, string, Record<string, any>>(
    (data) => windwalker.post('secure/college/companies', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('secure/college/companies');
      },
    }
  );
  const { data, isLoading, isError, refetch } = useQuery<TCompaniesData[]>(
    'secure/college/companies',
    {
      initialData: [],
    }
  );
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      await mutation.mutateAsync(data);
      toast({
        title: 'Company created',
      });
      onClose();
    } catch (err) {
      toast({
        title: 'Failed to create company',
      });
    }
  };

  return (
    <>
      {/* Add Company Modal Starts */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        scrollBehavior='inside'
        isCentered
        motionPreset='slideInBottom'
      >
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
        <ModalContent>
          <ModalHeader>Add New Company</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <VStack spacing={6}>
                <FormControl isInvalid={!!errors.company_name}>
                  <FormLabel htmlFor='company-name'>Company Name</FormLabel>
                  <Input
                    type='text'
                    id='company-name'
                    placeholder='Eg. Amazon India'
                    {...register('company_name')}
                  />

                  {errors.company_name && (
                    <FormErrorMessage>
                      {errors.company_name.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.contact_person_name}>
                  <FormLabel htmlFor='contact-person-name'>
                    Contact Person Name
                  </FormLabel>
                  <Input
                    type='text'
                    id='contact-person-name'
                    placeholder='Eg. Suman Mondal'
                    {...register('contact_person_name')}
                  />

                  {errors.contact_person_name && (
                    <FormErrorMessage>
                      {errors.contact_person_name.message}
                    </FormErrorMessage>
                  )}
                  <FormHelperText>
                    Point of Contact Person from Company
                  </FormHelperText>
                </FormControl>
                <FormControl isInvalid={!!errors.contact_person_phone}>
                  <FormLabel htmlFor='contact-person-phone'>
                    Contact Person Phone Number
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon children='+91' />
                    <Input
                      type='tel'
                      id='contact-person-phone'
                      placeholder='Phone Number'
                      errorBorderColor='red'
                      {...register('contact_person_phone')}
                    />
                  </InputGroup>
                  {errors.contact_person_phone && (
                    <FormErrorMessage>
                      {errors.contact_person_phone.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.contact_person_email}>
                  <FormLabel htmlFor='contact-person-email'>
                    Contact Person Email
                  </FormLabel>
                  <Input
                    type='email'
                    id='contact-person-email'
                    placeholder='Eg. someone@example.com'
                    {...register('contact_person_email')}
                  />
                  {errors.contact_person_email && (
                    <FormErrorMessage>
                      {errors.contact_person_email.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={isSubmitting}
                loadingText='Saving...'
                colorScheme='blue'
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Add Company modal ends */}

      <VStack spacing='4' align='stretch'>
        <HStack justify='space-between' align='center'>
          <Heading>Companies</Heading>
          <Button
            colorScheme='blue'
            size='sm'
            leftIcon={<Icon name='add' />}
            onClick={onOpen}
            ref={finalRef}
          >
            Add Company
          </Button>
        </HStack>
        {isError && (
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
        )}
        {isLoading && (
          <VStack
            p='8'
            borderColor='gray.200'
            borderWidth='thin'
            borderRadius='md'
          >
            <Spinner />
            <Text>Loading Data...</Text>
          </VStack>
        )}

        {!data ? (
          <VStack
            p='8'
            borderColor='gray.200'
            borderWidth='thin'
            borderRadius='md'
          >
            <Text>No records. Add more companies.</Text>
          </VStack>
        ) : (
          <CompaniesTable data={data} />
        )}
      </VStack>
    </>
  );
}

type TCompaniesData = {
  company_name: string;
  contact_person_email: string;
  contact_person_name: string;
  contact_person_phone: string;
  id: number;
  job_count: number;
  student_count: number;
};
function CompaniesTable({ data }: { data: TCompaniesData[] }) {
  const columns = useMemo<Column<TCompaniesData>[]>(
    () => [
      {
        Header: 'Company Name',
        accessor: 'company_name',
      },
      {
        Header: 'Contact Person Name',
        accessor: 'contact_person_name',
      },
      {
        Header: 'Contact Person Phone',
        accessor: 'contact_person_phone',
      },
      {
        Header: 'Contact Person Email',
        accessor: 'contact_person_email',
      },
      {
        Header: 'No. of Job Posted',
        accessor: 'job_count',
      },
      {
        Header: 'No. of Student Placed',
        accessor: 'student_count',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<TCompaniesData>({
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
