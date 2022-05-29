import {
  Box,
  Button,
  HStack,
  VStack,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';
export function MessagesPage() {
  return (
    <>
      <VStack margin='-4' h='100vh' justify='flex-end' align='stretch'>
        <Box p='4' rounded='md' bg='cyan.100'>
          <Box
            flex='1'
            border={1}
            bg='cyan.100'
            display='flex'
            flexDirection='column'
          >
            <HStack w='full' justify='flex-end'>
              <Box borderRadius='md' bg='tomato' color='white' px={4} h={8}>
                Hi
              </Box>
            </HStack>
            <HStack w='full' justify='flex-start'>
              <Box borderRadius='md' bg='orange' color='white' px={4} h={8}>
                Hello
              </Box>
            </HStack>
          </Box>
        </Box>
        <HStack spacing='24px' w='full' p={4}>
          <Box flex='1'>
            <Input placeholder='Type your quarry here ...' />
          </Box>
          <Button
            borderRadius={[100, 200, 300, 400]}
            bg='teal'
            color='white'
            px={8}
            h={10}
          >
            Send
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
