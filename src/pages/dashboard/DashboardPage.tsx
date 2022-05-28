import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthActions } from '../../_actions/auth.action';
import { Icon } from '../../_components/Icon';
import { RequireAuth } from '../../_components/RequireAuth';

export function DashboardPage() {
  const authAction = useAuthActions();
  return (
    <RequireAuth>
      <>
        {/* Topbar */}
        <TopBar />
        {/* Sidebar */}
        <SideBar />
        {/* Content */}
        <Box ml={['0px', '60']} mt={['16', '0px']} p='4'>
          <Outlet />
        </Box>
      </>
    </RequireAuth>
  );
}

function TopBar() {
  return (
    <HStack
      pos='fixed'
      top='0'
      left='0'
      width='full'
      height='16'
      bg='gray.100'
      borderBottomWidth='1px'
      borderBottomColor='gray.200'
      shadow='sm'
      px='4'
      display={['block', 'none']}
    >
      <Box>Heading</Box>
    </HStack>
  );
}

function SideBar() {
  const actions = useAuthActions();
  const NavLinks: { label: string; icon: string; path: string }[] = [
    { icon: 'home', label: 'Home', path: '/' },
    { icon: 'rss_feed', label: 'Job Feed', path: '/job-feed' },
    { icon: 'chat', label: 'Messages', path: '/messages' },
    { icon: 'notifications', label: 'Notifications', path: '/notifications' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ];
  return (
    <VStack
      display={['none', 'block']}
      pos='fixed'
      top='0'
      left='0'
      mt='0px'
      w={{ base: '48', md: '52', lg: '60' }}
      h='100vh'
      borderRightWidth='1px'
      borderRightColor='gray.200'
      // shadow='xs'
      p='4'
      align='stretch'
      spacing='4'
    >
      <Box h='10' w='full' bg='gray.300' />
      <InputGroup variant='outline' colorScheme='blue'>
        <InputLeftElement
          pointerEvents='none'
          children={<span className='material-symbols-outlined'>search</span>}
        />
        <Input placeholder='Search' />
      </InputGroup>
      <VStack spacing='2' align='stretch'>
        {NavLinks.map((item, key) => (
          <NavLink to={item.path} key={key}>
            {({ isActive }) => (
              <HStack
                px='4'
                py='2'
                bg={isActive ? 'blue.100' : 'transparent'}
                color={isActive ? 'blue.900' : 'gray.500'}
                borderRadius='md'
                spacing='2'
                align='center'
                fontSize='sm'
              >
                <Icon name={item.icon} />
                <Text fontWeight={isActive ? 'medium' : 'normal'}>
                  {item.label}
                </Text>
              </HStack>
            )}
          </NavLink>
        ))}
      </VStack>
      <Divider />
      <Button
        variant='outline'
        width='full'
        colorScheme='blue'
        leftIcon={<span className='material-symbols-outlined'>logout</span>}
        onClick={actions.logOut}
      >
        Log Out
      </Button>
    </VStack>
  );
}
