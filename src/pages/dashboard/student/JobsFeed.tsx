import { Icon } from '@/components/Icon';
import {
  Avatar,
  HStack,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
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
  return (
    <Scaffold title='Jobs Feed'>
      <SimpleGrid columns={[1, null, 2]} spacing='4'>
        <JobFeedItem {...profile} />
        <JobFeedItem {...profile} />
        <JobFeedItem {...profile} />
        <JobFeedItem {...profile} />
      </SimpleGrid>
    </Scaffold>
  );
}

type JobFeedItemProps = {
  id: string;
  position: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  created_on: string;
  tags: string[];
};

function JobFeedItem(props: JobFeedItemProps) {
  return (
    <LinkBox as='article'>
      <VStack
        shadow='sm'
        rounded='md'
        py='4'
        px='6'
        align='flex-start'
        spacing='6'
        borderWidth='thin'
        borderColor='gray.100'
      >
        <HStack
          spacing={['2', null, '4']}
          align='center'
          justify='space-between'
          w='full'
        >
          <HStack>
            <Avatar name={props.company} borderRadius='sm' />
            <VStack align='flex-start' justify='flex-start' spacing='0'>
              <LinkOverlay as={Link} to={`/job/${props.id}`}>
                <Text fontWeight='semibold'>{props.position}</Text>
              </LinkOverlay>
              <Stack
                direction={['column', null, 'row']}
                spacing={['0', null, '2']}
                align={['flex-start', null, 'center']}
                justify='flex-start'
              >
                <Text fontSize='sm' color='blackAlpha.700'>
                  {props.company}
                </Text>
                <HStack>
                  <Icon name='map' style={{ fontSize: 16 }} />
                  <Text fontSize='sm' color='blackAlpha.700'>
                    {props.location}
                  </Text>
                </HStack>
              </Stack>
            </VStack>
          </HStack>
          <Text fontWeight='semibold'>{props.salary}</Text>
        </HStack>
        <Text noOfLines={2} fontSize='sm' color='blackAlpha.700'>
          {props.description}
        </Text>
        <HStack spacing='4' w='full' justify='space-between'>
          <Wrap>
            {props.tags.map((e, i) => (
              <WrapItem key={i}>
                <Tag>{e}</Tag>
              </WrapItem>
            ))}
          </Wrap>
          <Text fontSize='sm'>{props.created_on}</Text>
        </HStack>
      </VStack>
    </LinkBox>
  );
}

export default JobsFeed;
