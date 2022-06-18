import { Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';

export const AuthFormWrapper: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  // const user = useAppSelector((state) => state.auth.user);
  // const logOutHandler = () => signOut(getAuth());
  const logOutHandler = () => {};
  return (
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
        {/*user && (
          <VStack mt='8' maxW='sm'>
            <Text fontSize='sm'>Not {user.email} ?</Text>
            <Button variant='ghost' size='sm' onClick={logOutHandler}>
              Log Out
            </Button>
          </VStack>
        )*/}
      </Flex>
    </Container>
  );
};
