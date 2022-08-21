import { Icon } from '@/components/Icon';
import { windwalker } from '@/data/windwalker';
import { TJobPost } from '@/model/TProfile';
import {
  Button,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  Spinner,
  Tag,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import Scaffold from '../Scaffold';

function JobDetails() {
  const params = useParams();
  const jobId = params.jobId!;

  const toast = useToast({
    position: 'bottom',
    isClosable: true,
  });
  const queryClient = useQueryClient();

  const query = useQuery<TJobPost>(`secure/jobs-feed/${jobId}`);
  const apply = useMutation(
    () => windwalker.post(`secure/jobs-feed/${jobId}/apply`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`secure/jobs-feed`);
        queryClient.invalidateQueries(`secure/jobs-feed/${jobId}`);
      },
      onError: () => {
        toast({ title: 'Failed to apply for the job' });
      },
    }
  );

  const retract = useMutation(() =>
    windwalker.post(`secure/jobs-feed/${jobId}/retract`, {
      onSuccess: () => {
        queryClient.invalidateQueries(`secure/jobs-feed`);
        queryClient.invalidateQueries(`secure/jobs-feed/${jobId}`);
      },
      onError: () => {
        toast({ title: 'Failed to retract application' });
      },
    })
  );

  const isApplied = query.data?.edges?.candidates?.length === 1;
  const action = !isApplied ? apply : retract;

  return (
    <Scaffold title='Job Details'>
      <Container maxW='container.md'>
        <VStack
          spacing='4'
          borderRadius='md'
          borderColor='gray.200'
          borderWidth='1px'
          padding='8'
          w='full'
          align={!!query.data ? 'flex-start' : undefined}
        >
          {query.isError ? (
            <>
              <Icon name='error' style={{ fontSize: 48 }} />
              <Text>Unable to load job details.</Text>
              <Button
                variant='outline'
                colorScheme='red'
                onClick={() => query.refetch()}
              >
                Retry
              </Button>
            </>
          ) : query.isLoading ? (
            <>
              <Spinner size='xl' />
              <Text>Loading profile data...</Text>
            </>
          ) : (
            <>
              <Heading color='blackAlpha.700' fontSize='3xl'>
                {query.data?.position}
              </Heading>

              <Wrap gap='2'>
                <WrapItem>
                  <Icon name='store' />
                  <Text ml='2'>{query.data?.edges?.company?.company_name}</Text>
                </WrapItem>
                <WrapItem>
                  <Icon name='map' />
                  <Text ml='2'>{query.data?.location}</Text>
                </WrapItem>
                <WrapItem>
                  <Icon name='schedule' />
                  <Text ml='2'>
                    {dayjs(query.data?.created_on!).format('DD/MM/YYYY')}
                  </Text>
                </WrapItem>
              </Wrap>
              <VStack align='flex-start'>
                <Text>Pay : ${query.data?.salary}</Text>
                <HStack>
                  <Text>Tags :</Text>
                  <Wrap>
                    {query.data?.tags.map((e, i) => (
                      <WrapItem key={i}>
                        <Tag size='sm'>{e}</Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                </HStack>
              </VStack>
              <Divider />
              <Text color='blackAlpha.700' fontSize='xl'>
                Job Description
              </Text>
              <Text>{query.data?.description}</Text>
              <Divider />
              <Center w='full'>
                <Button
                  colorScheme='blue'
                  px='8'
                  onClick={() => action.mutate()}
                  isLoading={action.isLoading}
                >
                  {!isApplied ? 'Apply Now' : 'Retract Application'}
                </Button>
              </Center>
            </>
          )}
        </VStack>
      </Container>
    </Scaffold>
  );
}

export default JobDetails;
