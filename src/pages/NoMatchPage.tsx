import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export function NoMatchPage() {
  return (
    <Container maxW='container.md'>
      <Flex
        minH={{ md: '100vh' }}
        p='6'
        justify='space-between'
        align='center'
        direction={{ base: 'column-reverse', md: 'row' }}
      >
        <VStack spacing='2' align='flex-start' maxW='xs'>
          <Heading size='2xl'>404</Heading>
          <Text fontSize='xl'>Ooops!</Text>
          <Text fontSize='xl'>Page Not Found</Text>
          <Text fontSize='md' color='gray.600'>
            This page does not exist or was removed! We suggest you to back to
            home.
          </Text>
          <Button variant='outline' colorScheme='blue' as={Link} to='/'>
            Go Back Home
          </Button>
        </VStack>
        <Image
          src='/images/undraw_lost_online_re_upmy.svg'
          boxSize='xs'
          objectFit='contain'
        />
      </Flex>
    </Container>
  );
}
