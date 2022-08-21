import { Icon } from '@/components/Icon';
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const BackIcon = <Icon name='arrow_back' />;

type ScaffoldProps = {
  title: string;
  actions?: React.ReactNode[];
  children?: React.ReactNode;
};
function Scaffold(props: ScaffoldProps) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <VStack align='stretch'>
      {/* appbar */}
      <HStack
        px='4'
        py='2'
        bg='gray.100'
        shadow='sm'
        pos='sticky'
        top='0'
        zIndex='sticky'
        justify='space-between'
        align='center'
      >
        <HStack>
          {/* back button */}
          <IconButton
            variant='ghost'
            aria-label='Go Back'
            icon={BackIcon}
            onClick={goBack}
          />
          {/* title */}
          <Text fontSize='md'>{props.title}</Text>
        </HStack>
        {/* actions */}
        {props.actions && (
          <HStack align='center' spacing='2'>
            {props.actions}
          </HStack>
        )}
      </HStack>
      {/* body */}
      <Box p='4'>{props.children}</Box>
    </VStack>
  );
}

export default Scaffold;
