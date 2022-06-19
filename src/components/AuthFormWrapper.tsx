import { useAuthAction } from '@/actions/auth.action';
import authAtom from '@/state/authAtom';
import { Box, Button, Container, Flex, Image, VStack } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';

export const AuthFormWrapper: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const auth = useRecoilValue(authAtom);
  const action = useAuthAction();

  return (
    <Container>
      <Flex
        minH='100vh'
        padding='4'
        direction='column'
        align='center'
        justify='center'
      >
        <Image h='20' maxW='sm' objectFit='contain' src='/images/logo.png' />
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
        {auth && (
          <VStack mt='8' maxW='sm'>
            <Button variant='ghost' size='sm' onClick={action.logout}>
              Log Out
            </Button>
          </VStack>
        )}
      </Flex>
    </Container>
  );
};
