import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthActions } from '../../_actions/auth.action';
import { Icon } from '../../_components/Icon';
import { WithAuthentication } from '../../_components/WithAuthentication';
import { useAppSelector } from '../../_state/hooks';

export function DashboardPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  return (
    <WithAuthentication>
      <>
        {/* Topbar */}
        <TopBar onOpen={onOpen} btnRef={btnRef} />
        {/* Sidebar */}
        <SideBar btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
        {/* Content */}
        <Box ml={['0px', '60']} mt={['16', '0px']} p='4'>
          <Outlet />
        </Box>
      </>
    </WithAuthentication>
  );
}

function TopBar({
  onOpen,
  btnRef,
}: {
  onOpen: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <Box
      pos='fixed'
      top='0'
      left='0'
      width='full'
      height='16'
      borderBottomWidth='1px'
      borderBottomColor='gray.200'
      px='4'
      display={['block', 'none']}
    >
      <HStack h='full' justify='space-between'>
        <HStack spacing='2'>
          <IconButton
            aria-label='Open Drawer'
            icon={<Icon name='menu' />}
            onClick={onOpen}
            ref={btnRef!}
          />
          {/* Logo */}
          <Box h='8' w='24' bg='gray.100' />
        </HStack>
        <IconButton aria-label='Search' icon={<Icon name='search' />} />
      </HStack>
    </Box>
  );
}

function SideBar({
  isOpen,
  btnRef,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}) {
  const user = useAppSelector((state) => state.auth.user!);
  const query = useQuery('claims', () =>
    user
      .getIdTokenResult()
      .then((res) => res.claims.role as 'collage' | 'company' | undefined)
  );
  const actions = useAuthActions();
  type LinkProps = {
    label: string;
    icon: string;
    path: string;
  };

  const default_links: LinkProps[] = [
    { icon: 'home', label: 'Home', path: '/' },
    { icon: 'rss_feed', label: 'Job Feed', path: '/job-feed' },
    { icon: 'chat', label: 'Messages', path: '/messages' },
    { icon: 'notifications', label: 'Notifications', path: '/notifications' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ];

  const collage_links: LinkProps[] = [
    { icon: 'home', label: 'Home', path: '/' },
    { icon: 'group', label: 'Students', path: 'students' },
    { icon: 'domain', label: 'Companies', path: 'companies' },
    { icon: 'receipt_long', label: 'Posts', path: 'posts' },
    { icon: 'fact_check', label: 'Reports', path: 'reports' },
    { icon: 'settings', label: 'Settings', path: '/settings' },
  ];
  return (
    <>
      <Drawer
        placement='left'
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>OpenCampus</DrawerHeader>
          <DrawerBody>
            <VStack spacing='2' align='stretch'>
              {default_links.map((item, key) => (
                <NavLink to={item.path} key={key} onClick={onClose}>
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
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant='outline'
              width='full'
              colorScheme='blue'
              leftIcon={
                <span className='material-symbols-outlined'>logout</span>
              }
              onClick={actions.logOut}
            >
              Log Out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
          {query.isLoading
            ? new Array(5)
                .fill(0)
                .map((_, key) => <Skeleton key={key} height='8' />)
            : (query.data == 'collage' ? collage_links : default_links).map(
                (item, key) => (
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
                )
              )}
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
    </>
  );
}
