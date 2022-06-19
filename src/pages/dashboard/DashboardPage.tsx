import { useAuthAction } from '@/actions/auth.action';
import { AuthFormWrapper } from '@/components/AuthFormWrapper';
import authAtom from '@/state/authAtom';
import {
  Box,
  Button,
  ButtonProps,
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
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { NavLink, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Icon } from '../../components/Icon';
import { WithAuthentication } from '../../components/WithAuthentication';
import { LoadingPage } from '../LoadingPage';
import { CollegeOnboardingPage, OnboardingPage } from './OnboardingPage';

export function DashboardPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const { data, isLoading, isError, refetch } = useQuery('secure/onboarding');
  const auth = useRecoilValue(authAtom);
  return (
    <WithAuthentication>
      {isError ? (
        <AuthFormWrapper>
          <VStack px='8' spacing='4'>
            <Icon name='error' style={{ fontSize: '3em' }} />
            <Text>Failed to load data.</Text>
            <Button
              variant='outline'
              colorScheme='red'
              isLoading={isLoading}
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </VStack>
        </AuthFormWrapper>
      ) : isLoading ? (
        <LoadingPage />
      ) : data ? (
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
      ) : auth?.role === 'user' ? (
        <OnboardingPage />
      ) : (
        <CollegeOnboardingPage />
      )}
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
          <Image src='/images/logo.png' h='8' w='auto' objectFit='contain' />
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
  const auth = useRecoilValue(authAtom);
  const role = auth?.role;

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
            <NavLinks role={role} />
          </DrawerBody>
          <DrawerFooter>
            <LogOutButton />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Box
        display={['none', 'block']}
        pos='fixed'
        top='0'
        left='0'
        mt='0px'
        w={{ base: '48', md: '52', lg: '60' }}
        minH='100vh'
        borderRightWidth='1px'
        borderRightColor='gray.200'
        // overflowY='scroll'
        // shadow='xs'
        p='4'
      >
        <VStack align='stretch' spacing='4' h='full'>
          <Image src='/images/logo.png' h='16' w='auto' objectFit='contain' />
          <InputGroup variant='outline' colorScheme='blue'>
            <InputLeftElement
              pointerEvents='none'
              children={
                <span className='material-symbols-outlined'>search</span>
              }
            />
            <Input placeholder='Search' />
          </InputGroup>
          <NavLinks role={role} />
          <Divider />
          <LogOutButton justifySelf='flex-end' />
        </VStack>
      </Box>
    </>
  );
}

type LinkProps = {
  label: string;
  icon: string;
  path: string;
};
function NavLinks({ role }: { role?: string }) {
  const default_links = useMemo<LinkProps[]>(
    () => [
      { icon: 'home', label: 'Home', path: '/' },
      { icon: 'rss_feed', label: 'Jobs', path: '/jobs' },
      { icon: 'settings', label: 'Settings', path: '/settings' },
    ],
    []
  );

  const college_links = useMemo<LinkProps[]>(
    () => [
      { icon: 'home', label: 'Home', path: '/' },
      { icon: 'group', label: 'Students', path: 'students' },
      { icon: 'domain', label: 'Companies', path: 'companies' },
      { icon: 'receipt_long', label: 'Posts', path: 'posts' },
      { icon: 'fact_check', label: 'Reports', path: 'reports' },
      { icon: 'settings', label: 'Settings', path: '/settings' },
    ],
    []
  );
  return (
    <VStack spacing='2' align='stretch'>
      {(role === 'college' ? college_links : default_links).map((item, key) => (
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
  );
}

const LogOutButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { logout } = useAuthAction();
    return (
      <Button
        ref={ref}
        {...props}
        variant='outline'
        width='full'
        colorScheme='blue'
        leftIcon={<span className='material-symbols-outlined'>logout</span>}
        onClick={logout}
      >
        Log Out
      </Button>
    );
  }
);
