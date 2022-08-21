import { useAuthAction } from '@/actions/auth.action';
import { TProfile } from '@/model/TProfile';
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
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import NiceModal from '@ebay/nice-modal-react';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { NavLink, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Icon } from '../../components/Icon';
import { WithAuthentication } from '../../components/WithAuthentication';
import CollegeProfileModal from './collage/modals/ProfileModal';
import StudentProfileModal from './student/modals/ProfileModal';

function HomePage() {
  return (
    <WithAuthentication>
      <HomePageContent />
    </WithAuthentication>
  );
}

function HomePageContent() {
  const { data, isLoading, isError, refetch } = useQuery<TProfile>('secure/me');

  const onCreate = () => {
    if (data?.role === 'college') NiceModal.show(CollegeProfileModal);
    else NiceModal.show(StudentProfileModal);
  };

  return (
    <>
      <Helmet>
        <title>Home | OpenCampus</title>
      </Helmet>
      <TopBar />
      <SideBar />
      <VStack ml={['0px', '60']} mt={['16', '0px']} align='stretch' spacing='0'>
        {isError ? (
          <HStack px='4' py='2' bg='gray.200' align='center' justify='center'>
            <Icon name='error' />
            <Text>Error loading profile</Text>
            <Button
              size='xs'
              variant='outline'
              colorScheme='red'
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </HStack>
        ) : isLoading ? (
          <HStack px='4' py='2' bg='gray.200' align='center' justify='center'>
            <Spinner size='sm' />
            <Text>Loading profile...</Text>
          </HStack>
        ) : (
          !(data?.role === 'college'
            ? !!data?.edges.college_profile
            : !!data?.edges.student_profile) && (
            <HStack
              px='4'
              py='2'
              bg='green.100'
              align='center'
              justify='center'
            >
              <Text>Your profile does not exist</Text>
              <Button
                colorScheme='blue'
                variant='outline'
                size='xs'
                onClick={onCreate}
              >
                Create Now
              </Button>
            </HStack>
          )
        )}
        <Outlet />
      </VStack>
    </>
  );
}

function TopBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

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
            <NavLinks />
          </DrawerBody>
          <DrawerFooter>
            <LogOutButton />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
        bgColor='white'
        zIndex='sticky'
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
    </>
  );
}

function SideBar() {
  return (
    <>
      <Box
        display={['none', 'block']}
        pos='fixed'
        top='0'
        bottom='0'
        left='0'
        mt='0px'
        w={{ base: '48', md: '52', lg: '60' }}
        borderRightWidth='1px'
        borderRightColor='gray.300'
        p='4'
        overflowY='auto'
      >
        <VStack align='stretch' justify='space-between' h='full'>
          <VStack spacing='6' align='stretch'>
            <Image src='/images/logo.png' h='16' w='auto' objectFit='contain' />
            <Button
              leftIcon={
                <span className='material-symbols-outlined'>search</span>
              }
              color='gray.500'
            >
              Search
            </Button>
            <Divider />
            <NavLinks />
            <Divider />
          </VStack>
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
function NavLinks() {
  const student_links = useMemo<LinkProps[]>(
    () => [
      { icon: 'grid_view', label: 'Dashboard', path: '/' },
      { icon: 'work', label: 'Jobs Feed', path: 'jobsfeed' },
      { icon: 'receipt_long', label: 'My Assessments', path: 'assessments' },
      { icon: 'fact_check', label: 'My Interviews', path: 'interviews' },
      { icon: 'account_circle', label: 'My Profile', path: 'profile' },
      { icon: 'settings', label: 'Settings', path: '/settings' },
    ],
    []
  );

  const college_links = useMemo<LinkProps[]>(
    () => [
      { icon: 'grid_view', label: 'Dashboard', path: '/' },
      { icon: 'group', label: 'Students', path: 'students' },
      { icon: 'domain', label: 'Companies', path: 'companies' },
      { icon: 'receipt_long', label: 'Posts', path: 'posts' },
      { icon: 'fact_check', label: 'Reports', path: 'reports' },
      { icon: 'settings', label: 'Settings', path: '/settings' },
    ],
    []
  );

  const auth = useRecoilValue(authAtom);
  const role = auth?.role;

  return (
    <VStack spacing='2' align='stretch'>
      {(role === 'college' ? college_links : student_links).map((item, key) => (
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

export default HomePage;
