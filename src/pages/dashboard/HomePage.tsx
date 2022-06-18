import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { Icon } from '@/components/Icon';

interface StatsCardProps {
  title: string;
  stat: string;
  icon: React.ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'}>{title}</StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function HomePage() {
  return (
    <Box maxW='7xl' mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'left'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
      >
        Home Page
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Job Applied'}
          stat={'12'}
          icon={<Icon name='date_range' style={{ fontSize: '3em' }} />}
        />
        <StatsCard
          title={'Selected In'}
          stat={'3'}
          icon={<Icon name='check_circle' style={{ fontSize: '3em' }} />}
        />
      </SimpleGrid>
    </Box>
  );
}
