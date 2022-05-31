import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';

// import { MdHeadset, MdEmail, MdLocationOn } from "react-icons/md";
// import { BsFillBriefcaseFill } from "react-icons/bs";

export function JobFeedPage() {
  return (
    <Grid templateColumns='repeat(2, 1fr)' gap='4'>
      <GridItem>
        <JobFeedItem />
      </GridItem>
    </Grid>
  );
}

// type JobFeedItemProps = {
//   title: string;
//   company: string;
//   location: string;
//   mode: "Remote" | "Flexible" | "In-Office";
//   offer: string;
//   startdate: string;
//   positions: number;
//   deadline: string;
// };

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
            Apply Now
          </Button>
          <Button colorScheme='teal' variant='outline'>
            View Details
          </Button>
        </Stack>
      </VStack>
    </Box>
  );
}
