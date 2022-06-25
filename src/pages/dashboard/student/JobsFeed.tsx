import { Icon } from '@/components/Icon';
import { JobFeedItem, JobFeedItemProps } from '@/components/JobFeedItem';
import { TJobPost } from '@/model/TProfile';
import { Button, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import Scaffold from '../Scaffold';

const profile: JobFeedItemProps = {
  id: 'some_id',
  position: 'Senior UX Designer',
  company: 'Behance',
  location: 'Kolkata, India',
  salary: '$2K-$5K',
  description:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum sed amet facilis optio excepturi saepe, harum officia alias ducimus est.',
  created_on: '24 Jun, 2022',
  tags: ['Remote', 'Full Time', 'UX'],
};

function JobsFeed() {
  const { data, isError, isLoading, refetch } =
    useQuery<TJobPost[]>('secure/jobs-feed');

  return (
    <Scaffold title='Jobs Feed'>
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
              <JobFeedItem {...e} />
            ))}
        </SimpleGrid>
      )}
    </Scaffold>
  );
}

export default JobsFeed;
