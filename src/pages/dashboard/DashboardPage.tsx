import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthActions } from '../../_actions/auth.action';
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
        <Box ml='60' mt='16' p='4'>
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
    >
      <Box>Heading</Box>
    </HStack>
  );
}

const NavLinks: { label: string; icon: string; path: string }[] = [
  { icon: 'dashboard', label: 'Home', path: '/' },
  { icon: 'rss_feed', label: 'Job Feed', path: '/job-feed' },
  { icon: 'chat', label: 'Messages', path: '/messages' },
  { icon: 'notifications', label: 'Notifications', path: '/notifications' },
  { icon: 'account_circle', label: 'My Profile', path: '/profile' },
];

function SideBar() {
  return (
    <VStack
      pos='fixed'
      top='0'
      left='0'
      mt='16'
      w='60'
      h='100vh'
      bg='gray.100'
      borderRightWidth='1px'
      borderRightColor='gray.200'
      shadow='md'
      p='4'
      align='stretch'
    >
      <VStack spacing='2' align='stretch'>
        {NavLinks.map((item, key) => (
          <NavLink to={item.path} key={key}>
            {({ isActive }) => (
              <HStack
                px='4'
                py='3'
                bg={isActive ? 'gray.300' : 'transparent'}
                borderRadius='md'
                spacing='2'
                align='center'
              >
                <span className='material-symbols-outlined'>{item.icon}</span>

                <Text>{item.label}</Text>
              </HStack>
            )}
          </NavLink>
        ))}
      </VStack>
    </VStack>
  );
}
