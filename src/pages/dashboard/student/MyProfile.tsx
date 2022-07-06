import { Icon } from '@/components/Icon';
import { windwalker } from '@/data/windwalker';
import { TAcademicProfile, TProfile } from '@/model/TProfile';
import {
  Avatar,
  Button,
  ButtonGroup,
  Container,
  Heading,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AcademicProfileModal from '../profile/AcademicProfileModal';
import WorkProfileModal from '../profile/WorkProfileModal';
import Scaffold from '../Scaffold';
import ProfileModal from './modals/ProfileModal';

function MyProfile() {
  const { data, isLoading, isError, refetch } = useQuery<TProfile>('secure/me');

  if (isError)
    return (
      <Scaffold title='My Profile'>
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
            <Button
              variant='outline'
              colorScheme='red'
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </VStack>
        </Container>
      </Scaffold>
    );

  if (isLoading)
    return (
      <Scaffold title='My Profile'>
        <Container maxW='container.lg'>
          <VStack
            spacing='4'
            borderRadius='md'
            borderColor='gray.200'
            borderWidth='1px'
            padding='8'
            w='full'
          >
            <Spinner size='xl' />
            <Text>Loading profile data...</Text>
          </VStack>
        </Container>
      </Scaffold>
    );

  if (!data?.edges.student_profile)
    return (
      <Scaffold title='My Profile'>
        <Container maxW='container.lg'>
          <VStack
            spacing='4'
            borderRadius='md'
            borderColor='gray.200'
            borderWidth='1px'
            padding='8'
            w='full'
          >
            <Text>Your profile does not exist</Text>
            <Button
              colorScheme='blue'
              variant='outline'
              onClick={() => NiceModal.show(ProfileModal)}
            >
              Create Now
            </Button>
          </VStack>
        </Container>
      </Scaffold>
    );

  return (
    <Scaffold title='My Profile'>
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
                <Avatar
                  name={data?.edges?.student_profile?.name}
                  bg='gray.300'
                />
                <VStack align='flex-start' spacing='-1'>
                  <Text fontSize='xl'>
                    {data?.edges?.student_profile?.name}
                  </Text>
                  <Text fontSize='sm'>
                    +91 {data?.edges?.student_profile?.phone}
                  </Text>
                </VStack>
              </HStack>
              <IconButton
                icon={<Icon name='edit' />}
                aria-label='edit'
                onClick={() =>
                  NiceModal.show(ProfileModal, data?.edges?.student_profile)
                }
              />
            </HStack>
            <VStack align='stretch' justify='stretch' w='full'>
              <TableContainer>
                <Table variant='unstyled' size='lg'>
                  <Tbody>
                    <Tr>
                      <Td>Gender</Td>
                      <Td>{data?.edges?.student_profile?.gender}</Td>
                    </Tr>
                    <Tr>
                      <Td>Caste</Td>
                      <Td>{data?.edges?.student_profile?.caste}</Td>
                    </Tr>
                    <Tr>
                      <Td>Nationality</Td>
                      <Td>{data?.edges?.student_profile?.nationality}</Td>
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
            {!data?.edges?.student_profile?.edges?.academic_profile && (
              <Text>Nothing to see here.</Text>
            )}
            {data?.edges?.student_profile?.edges?.academic_profile?.map(
              (e, i) => (
                <AcademicProfileListItem data={e} key={i} />
              )
            )}
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
            {!data?.edges?.student_profile?.edges?.work_profile && (
              <Text>Nothing to see here.</Text>
            )}
            {data?.edges?.student_profile?.edges?.work_profile?.map((e, i) => (
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
    </Scaffold>
  );
}

const AcademicProfileListItem: React.FC<{ data: TAcademicProfile }> = ({
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

export default MyProfile;
