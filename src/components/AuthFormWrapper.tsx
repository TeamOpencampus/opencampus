import { Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';

export const AuthFormWrapper: React.FC<{ children: React.ReactNode }> = (
  props
) => (
  <Container>
    <Flex
      minH='100vh'
      padding='4'
      direction='column'
      align='center'
      justify='center'
    >
      {/* <Heading color='blue.900'>[OpenCampus]</Heading> */}
      <Box w='60' bg='gray.200' h='10' />
      <Box
        mt='8'
        padding='8'
        paddingY='4'
        borderWidth='thin'
        borderRadius='md'
        maxW='sm'
        overflow='hidden'
      >
        {props.children}
      </Box>
    </Flex>
  </Container>
);
