import { Icon } from '@/components/Icon';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
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
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Tag,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

const CompanyNames = [
  {
    name: 'Apple Inc',
  },
  {
    name: 'Google India',
  },
  {
    name: 'Laxmi Chit Fund',
  },
];

const FormSchema = z.object({
  company: z.string().nonempty('Company name is required'),
  jobTitle: z.string().nonempty('Job title is required'),
  location: z.string().nonempty('Job location is required'),
  salary: z.string().nonempty('Enter a resonable salary amount'),
  // department:
  jobDescription: z.string().nonempty('Job description is required'),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export function PostsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
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
        isCentered
        motionPreset='slideInBottom'
        scrollBehavior='inside'
      >
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
        <ModalContent>
          <ModalHeader>Post Creation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.company}>
                  <FormLabel htmlFor='companies'>Company</FormLabel>
                  <Select
                    id='companies'
                    placeholder='Select Company'
                    {...register('company')}
                  >
                    {CompanyNames.map((CompanyNames) => (
                      <option>{CompanyNames.name}</option>
                    ))}
                  </Select>
                  {errors.company && (
                    <FormErrorMessage>
                      {errors.company.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.jobTitle}>
                  <FormLabel htmlFor='job_title'>Job Title</FormLabel>
                  <Input
                    id='job_title'
                    placeholder='Eg: Junior Developer'
                    {...register('jobTitle')}
                  />
                  {errors.jobTitle && (
                    <FormErrorMessage>
                      {errors.jobTitle.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.location}>
                  <FormLabel htmlFor='location'>Location</FormLabel>
                  <Input
                    id='location'
                    placeholder='City/Village/Urban'
                    {...register('location')}
                  />
                  {errors.location ? (
                    <FormErrorMessage>
                      {errors.location.message}
                    </FormErrorMessage>
                  ) : (
                    <FormHelperText>
                      Students will be placed here
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.salary}>
                  <FormLabel htmlFor='salary'>Salary</FormLabel>
                  <NumberInput>
                    <NumberInputField
                      id='salary'
                      placeholder='Amount in INR'
                      {...register('salary')}
                    ></NumberInputField>
                  </NumberInput>
                  {errors.salary ? (
                    <FormErrorMessage>{errors.salary.message}</FormErrorMessage>
                  ) : (
                    <FormHelperText>Students will get paid</FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Department</FormLabel>
                  <CheckboxGroup colorScheme='blue'>
                    <VStack align='flex-start'>
                      <Checkbox>Engineering</Checkbox>
                      <Checkbox>Research and Development</Checkbox>
                      <Checkbox>Sales or Marketing</Checkbox>
                      <Checkbox>Management</Checkbox>
                      <Checkbox>Accounting</Checkbox>
                    </VStack>
                  </CheckboxGroup>
                </FormControl>
                <FormControl isInvalid={!!errors.jobDescription}>
                  <FormLabel htmlFor='job_desc'>Job Description</FormLabel>
                  <Textarea
                    id='job_desc'
                    placeholder='An overview for the job'
                    {...register('jobDescription')}
                  ></Textarea>
                  {errors.jobDescription && (
                    <FormErrorMessage>
                      {errors.jobDescription.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </VStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button variant='outline' onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme='blue'
                onClick={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
              >
                Create Post
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack spacing='4' align='stretch'>
        <HStack justify='space-between' align='center'>
          <Heading>Job Posted</Heading>
          <Button leftIcon={<Icon name='add' />} onClick={onOpen}>
            New Post
          </Button>
        </HStack>
        <Grid templateColumns='repeat(2, 1fr)' gap='4'>
          <GridItem>
            <JobFeedItem />
          </GridItem>
        </Grid>
      </VStack>
    </>
  );
}

// Job Post

function JobFeedItem() {
  return (
    <Box w={['full', 'full']} shadow='md' rounded='lg'>
      <VStack py={4} px={6} align='flex-start' spacing='2'>
        <Heading fontSize='2xl' color='gray.800'>
          Full Stack Developer
        </Heading>
        <Text pt='1' color='gray.600'>
          Tesla Motors India
        </Text>
        <HStack spacing={2}>
          <Tag variant='outline' colorScheme='teal'>
            React Js
          </Tag>
          <Tag variant='outline' colorScheme='teal'>
            Express Js
          </Tag>
        </HStack>
        <Grid
          templateColumns={['repeat(2, 1fr)', 'repeat(5, 1fr)']}
          gap={['3', '2']}
        >
          {[
            ['Offer', '6 LPA'],
            ['Mode', 'Remote'],
            ['Start Date', '15 Aug 2022'],
            ['Positions', '15'],
            ['Deadline', '10 Sept 2022'],
          ].map((item, key) => (
            <VStack key={key} spacing='1' align='center' py='2'>
              <Text color='gray.500'>{item[0]}</Text>
              <Text color='blackAlpha.900'>{item[1]}</Text>
            </VStack>
          ))}
        </Grid>
        <Stack direction='row' spacing={4} align='center'>
          <Button colorScheme='teal' variant='solid'>
            Edit Details
          </Button>
          {/* <Button colorScheme='teal' variant='outline'>
            View Details
          </Button> */}
        </Stack>
      </VStack>
    </Box>
  );
}
