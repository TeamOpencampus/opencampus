import {
  Box,
  CircularProgress,
  Container,
  Text,
  VStack,
} from '@chakra-ui/react';

export function LoadingPage() {
  return (
    <Container>
      <Box height='100vh'>
        <VStack height='full' align='center' justify='center'>
          <CircularProgress isIndeterminate thickness='4px' size='80px' />
          <Text>Loading...</Text>
        </VStack>
      </Box>
    </Container>
  );
}
