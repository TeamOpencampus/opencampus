import {
  Avatar,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import day from 'dayjs';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';

export type JobFeedItemProps = {
  id: string;
  position: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  created_on: string;
  tags: string[];
};

export function JobFeedItem(props: JobFeedItemProps & { prefix?: string }) {
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
              <LinkOverlay
                as={Link}
                to={`/${props?.prefix ?? 'job'}/${props.id}`}
              >
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
          <Text fontSize='sm'>
            {day(props.created_on).format('DD/MM/YYYY')}
          </Text>
        </HStack>
      </VStack>
    </LinkBox>
  );
}
