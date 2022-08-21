import { Icon } from '@/components/Icon';
import { JobFeedItem } from '@/components/JobFeedItem';
import { windwalker } from '@/data/windwalker';
import { TCompany, TJobPost } from '@/model/TProfile';
import {
  Box,
  Button,
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
  Select,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import z from 'zod';
import Scaffold from '../Scaffold';

export function PostsPage() {
  const { data, isError, isLoading, refetch } = useQuery<TJobPost[]>(
    'secure/college/posts'
  );

  return (
    <Scaffold
      title='Posts'
      actions={[
        <Button
          leftIcon={<Icon name='add' />}
          colorScheme='blue'
          onClick={() => NiceModal.show(NewPostModal)}
        >
          New Post
        </Button>,
      ]}
    >
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
        <SimpleGrid columns={[1, null, 2]} spacing='4'>
          {data
            .map((e) => ({ ...e, company: e.edges.company?.company_name! }))
            .map((e) => (
              <JobFeedItem {...e} prefix='posts' />
            ))}
        </SimpleGrid>
      )}
    </Scaffold>
  );
}

const FormSchema = z.object({
  company_id: z.string().nonempty(),
  position: z.string().nonempty(),
  location: z.string().nonempty(),
  salary: z.string().nonempty(),
  description: z.string().nonempty(),
  tags: z.array(z.string().nonempty()).optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;
const NewPostModal = NiceModal.create(() => {
  const modal = useModal();
  const query = useQuery<TCompany[]>('secure/college/companies');
  const queryClient = useQueryClient();
  const mutation = useMutation<string, string, Record<string, any>>(
    (data) =>
      windwalker.post(`secure/college/posts`, {
        ...data,
        tags: ['Full Time', 'Remote'],
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('secure/college/posts');
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const toast = useToast();

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      await mutation.mutateAsync(data);
      toast({
        status: 'success',
        title: 'Post created',
      });
      modal.hide();
      modal.remove();
    } catch (err) {
      toast({
        status: 'error',
        title: 'Failed to create post',
      });
    }
  };

  return (
    <Modal
      isOpen={modal.visible}
      onClose={modal.hide}
      onCloseComplete={modal.remove}
      isCentered
      motionPreset='slideInBottom'
      scrollBehavior='inside'
    >
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
      <ModalContent>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton />
        {query.isError ? (
          <ModalBody>
            <VStack spacing='4' py='6'>
              <Icon name='error' style={{ color: 'red', fontSize: '3em' }} />
              <Text>Failed to fetch companies.</Text>
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
              <Text>Loading companies...</Text>
            </VStack>
          </ModalBody>
        ) : (
          <>
            <ModalBody>
              <Box>
                <VStack spacing={4}>
                  <FormControl isInvalid={!!errors.company_id}>
                    <FormLabel htmlFor='company_id'>Company</FormLabel>
                    <Select
                      id='company_id'
                      placeholder='Select Company'
                      {...register('company_id')}
                    >
                      {query?.data?.map((e, i) => (
                        <option key={i} value={e.id}>
                          {e.company_name}
                        </option>
                      ))}
                    </Select>
                    {errors.company_id && (
                      <FormErrorMessage>
                        {errors.company_id.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.position}>
                    <FormLabel htmlFor='position'>Position</FormLabel>
                    <Input
                      id='position'
                      placeholder='Eg: Senior Developer'
                      {...register('position')}
                    />
                    {errors.position && (
                      <FormErrorMessage>
                        {errors.position.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.location}>
                    <FormLabel htmlFor='location'>Location</FormLabel>
                    <Input
                      id='location'
                      placeholder='Eg: Kolkata, India'
                      {...register('location')}
                    />
                    {errors.location ? (
                      <FormErrorMessage>
                        {errors.location.message}
                      </FormErrorMessage>
                    ) : (
                      <FormHelperText>Job or company location</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.salary}>
                    <FormLabel htmlFor='salary'>Salary</FormLabel>
                    <Input
                      id='salary'
                      placeholder='Amount in INR'
                      {...register('salary')}
                    />
                    {errors.salary ? (
                      <FormErrorMessage>
                        {errors.salary.message}
                      </FormErrorMessage>
                    ) : (
                      <FormHelperText>Enter a salary range</FormHelperText>
                    )}
                  </FormControl>
                  {/* <FormControl>
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
                </FormControl> */}
                  <FormControl isInvalid={!!errors.description}>
                    <FormLabel htmlFor='job_desc'>Job Description</FormLabel>
                    <Textarea
                      id='job_desc'
                      placeholder='An overview for the job'
                      {...register('description')}
                    ></Textarea>
                    {errors.description && (
                      <FormErrorMessage>
                        {errors.description.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </VStack>
              </Box>
            </ModalBody>

            <ModalFooter>
              <HStack>
                <Button
                  variant='outline'
                  onClick={() => {
                    modal.hide();
                    modal.remove();
                  }}
                >
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
