import { Icon } from '@/components/Icon';
import { windwalker } from '@/data/windwalker';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Select,
  SkeletonCircle,
  SkeletonText,
  Stack,
  StackDivider,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import AcademicProfileModal, {
  AcademicProfileSchema,
  TAcademicProfileSchema,
} from './profile/AcademicProfileModal';
import BasicProfileModal, {
  BasicProfileSchema,
} from './profile/BasicProfileModal';
import WorkProfileModal from './profile/WorkProfileModal';

export function SettingsPage() {
  const [params, setParams] = useSearchParams();
  const keys = ['profile', 'account'];
  const activeIndex = keys.indexOf(params.get('active') ?? '');
  const setActiveIndex = (index: number) => setParams({ active: keys[index] });

  return (
    <VStack align='stretch' spacing='2'>
      <Heading>Settings</Heading>
      <Tabs
        isLazy
        colorScheme='messenger'
        index={activeIndex === -1 ? 0 : activeIndex}
        onChange={setActiveIndex}
      >
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Account</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProfileTab />
          </TabPanel>
          <TabPanel>
            <AccountTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

const ProfileSchema = z.object({
  id: z.number().optional(),
  basic_profile: BasicProfileSchema,
  academic_profile: z.array(AcademicProfileSchema),
  work_profile: z.array(
    z.object({
      id: z.number().optional(),
      company: z.string().nonempty(),
      start_date: z.string().nonempty(),
      end_date: z.string().nonempty(),
      salary: z.string().nonempty(),
      position: z.string().nonempty(),
    })
  ),
  additional_documents: z.object({}),
});

export type TProfileSchema = z.infer<typeof ProfileSchema>;

function ProfileTab() {
  const { data, isLoading, isError, refetch } =
    useQuery<TProfileSchema>('secure/profile/');

  if (isError)
    return (
      <Container maxW='container.lg'>
        <VStack
          spacing='4'
          borderRadius='md'
          borderColor='gray.200'
          borderWidth='1px'
          padding='8'
          w='full'
        >
          <Icon name='error' style={{ fontSize: 48 }} />
          <Text>Unable to load profile data.</Text>
          <Button variant='outline' colorScheme='red' onClick={() => refetch()}>
            Retry
          </Button>
        </VStack>
      </Container>
    );
  if (isLoading)
    return (
      <Container maxW='container.lg'>
        <SkeletonCircle size='20' />
        <SkeletonText mt='4' noOfLines={6} lineHeight='8' spacing='4' />
      </Container>
    );

  return (
    <Container maxW='container.lg'>
      <VStack>
        {/* Basic */}
        <VStack
          spacing='4'
          borderRadius='md'
          borderColor='gray.200'
          borderWidth='1px'
          padding='4'
          w='full'
        >
          <HStack justify='space-between' align='stretch' w='full'>
            <HStack spacing='4'>
              <Avatar name={data?.basic_profile.name} bg='gray.300' />
              <VStack align='flex-start' spacing='-1'>
                <Text fontSize='xl'>{data?.basic_profile.name}</Text>
                <Text fontSize='sm'>+91 {data?.basic_profile.phone}</Text>
              </VStack>
            </HStack>
            <IconButton
              icon={<Icon name='edit' />}
              aria-label='edit'
              onClick={() =>
                NiceModal.show(BasicProfileModal, data?.basic_profile)
              }
            />
          </HStack>
          <VStack align='stretch' justify='stretch' w='full'>
            <TableContainer>
              <Table variant='unstyled' size='lg'>
                <Tbody>
                  <Tr>
                    <Td>Gender</Td>
                    <Td>{data?.basic_profile.gender}</Td>
                  </Tr>
                  <Tr>
                    <Td>Caste</Td>
                    <Td>{data?.basic_profile.caste}</Td>
                  </Tr>
                  <Tr>
                    <Td>Nationality</Td>
                    <Td>{data?.basic_profile.nationality}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </VStack>
        {/* Education */}
        <VStack
          spacing='2'
          borderRadius='md'
          borderColor='gray.200'
          borderWidth='1px'
          padding='4'
          w='full'
        >
          <HStack justify='space-between' align='stretch' w='full'>
            <Heading size='md'>Education</Heading>
            <IconButton
              icon={<Icon name='add' />}
              aria-label='Add'
              onClick={() => NiceModal.show(AcademicProfileModal)}
            />
          </HStack>
          {!data?.academic_profile && <Text>Nothing to see here.</Text>}
          {data?.academic_profile?.map((e, i) => (
            <AcademicProfileListItem data={e} key={i} />
          ))}
        </VStack>
        {/* Work */}
        <VStack
          spacing='2'
          borderRadius='md'
          borderColor='gray.200'
          borderWidth='1px'
          padding='4'
          w='full'
        >
          <HStack justify='space-between' align='stretch' w='full'>
            <Heading size='md'>Work</Heading>
            <IconButton
              icon={<Icon name='add' />}
              aria-label='Add'
              onClick={() => NiceModal.show(WorkProfileModal)}
            />
          </HStack>
          {!data?.work_profile && <Text>Nothing to see here.</Text>}
          {data?.work_profile?.map((e, i) => (
            <HStack align='center' justify='space-between' w='full' key={i}>
              <VStack align='flex-start' spacing='0.5px'>
                <Text fontWeight='semibold'>{e.company}</Text>
                <Text fontSize='sm'>
                  {e.position} | {e.salary}
                </Text>
                <Text fontSize='sm' color='gray'>
                  {e.start_date} - {e.end_date}
                </Text>
              </VStack>
              <ButtonGroup variant='outline' size='sm'>
                <IconButton
                  colorScheme='blue'
                  aria-label='edit'
                  icon={<Icon name='edit' />}
                />
                <IconButton
                  colorScheme='red'
                  aria-label='delete'
                  icon={<Icon name='delete' />}
                />
              </ButtonGroup>
            </HStack>
          ))}
        </VStack>
        {/* Additional Documents */}
        <VStack
          spacing='2'
          borderRadius='md'
          borderColor='gray.200'
          borderWidth='1px'
          padding='4'
          w='full'
        >
          <HStack justify='space-between' align='stretch' w='full'>
            <Heading size='md'>Additional Documents</Heading>
            <IconButton icon={<Icon name='edit' />} aria-label='edit' />
          </HStack>
        </VStack>
      </VStack>
    </Container>
  );
}

const AcademicProfileListItem: React.FC<{ data: TAcademicProfileSchema }> = ({
  data,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    () => windwalker.delete(`secure/profile/academic/${data.id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('secure/profile/');
      },
    }
  );

  return (
    <HStack align='center' justify='space-between' w='full'>
      <VStack align='flex-start' spacing='0.5px'>
        <Text fontWeight='semibold'>{data.institute}</Text>
        <Text fontSize='sm'>
          {data.course} in {data.department}
        </Text>
        <Text fontSize='sm' color='gray'>
          {data.start_date} - {data.end_date}
        </Text>
      </VStack>
      <ButtonGroup variant='outline' size='sm'>
        <IconButton
          colorScheme='blue'
          aria-label='edit'
          icon={<Icon name='edit' />}
          onClick={() => NiceModal.show(AcademicProfileModal, data)}
        />
        <Popover>
          <PopoverTrigger>
            <IconButton
              colorScheme='red'
              aria-label='delete'
              icon={<Icon name='delete' />}
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Delete this item ?</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  colorScheme='red'
                  onClick={() => mutate()}
                  isLoading={isLoading}
                >
                  Sure, delete it
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </ButtonGroup>
    </HStack>
  );
};

function AdditionalDocumentsForm() {
  return (
    <VStack align='flex-start' spacing='4' divider={<StackDivider />}>
      {/* Photo */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='photo'>Current photo</FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='photo'>
            Select File
          </Button>
        </Stack>
      </FormControl>
      {/* Signature */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='sign'>Your Signature</FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='sign'>
            Select File
          </Button>
        </Stack>
      </FormControl>
      {/* ID_Proof */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='ID_proof'>Valid Identity Proof</FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='ID_proof'>
            Select File
          </Button>
        </Stack>
      </FormControl>
      {/* Caste Certificate */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='certificate'>
              Caste Certificate (if any)
            </FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='certificate'>
            Select File
          </Button>
        </Stack>
      </FormControl>
    </VStack>
  );
}

// regex for password with at least 8 characters including 1 number, 1 special charater
// ref: https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const PasswordInput = z.object({
  password: z
    .string()
    .regex(
      passwordRegex,
      'Password must contain at least 8 characters including 1 number and 1 special character'
    ),
});

type PasswordInputType = z.infer<typeof PasswordInput>;

function AccountTab() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordInputType>({ resolver: zodResolver(PasswordInput) });

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const onChange: SubmitHandler<PasswordInputType> = (values) => {
    console.log(values);
  };

  return (
    <VStack align='stretch' spacing='4'>
      {/* Change Password */}
      <Text fontWeight='semibold'>Change Password</Text>
      <FormControl isInvalid={!!errors.password} maxW='sm'>
        <FormLabel htmlFor='new-password'>New Password</FormLabel>
        <InputGroup>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter new password'
            autoComplete='new-password'
            {...register('password')}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>
      {/* Button */}
      <ButtonGroup spacing='6'>
        <Button
          colorScheme='blue'
          onClick={handleSubmit(onChange)}
          isLoading={isSubmitting}
        >
          Update Password
        </Button>
      </ButtonGroup>
      <JoinCollege />
    </VStack>
  );
}

function JoinCollege() {
  return (
    <VStack align='stretch' spacing='4'>
      {/* Select Colleges*/}
      <FormControl maxW='sm'>
        <FormLabel htmlFor='college' fontWeight='semibold'>
          Select Colleges
        </FormLabel>
        <Select placeholder='Select college' id='college'>
          <option value='college-1'>Central Calcutta Polytechnic</option>
          <option value='college-2'>APC Roy Polytechnic</option>
          <option value='college-3'>Birla Institute of Technology</option>
          <option value='college-4'>RKM Shilpapith</option>
          <option value='college-5'>RKM Shilpamandira</option>
        </Select>
      </FormControl>
      {/* Submit Button  */}
      <ButtonGroup spacing='6'>
        <Button colorScheme='blue'>Submit</Button>
      </ButtonGroup>
    </VStack>
  );
}
