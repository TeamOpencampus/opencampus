import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

export function SettingsPage() {
  const [params, setParams] = useSearchParams();
  const keys = ['profile', 'account'];
  const activeIndex = keys.indexOf(params.get('active') ?? '');
  const setActiveIndex = (index: number) => setParams({ active: keys[index] });

  return (
    <VStack align='stretch' spacing='2'>
      <Heading>Settings</Heading>
      <Tabs
        isLazy
        colorScheme='messenger'
        index={activeIndex === -1 ? 0 : activeIndex}
        onChange={setActiveIndex}
      >
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Account</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProfileTab />
          </TabPanel>
          <TabPanel>
            <AccountTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

function ProfileTab() {
  return <Text>Profile</Text>;
}

function AccountTab() {
  return <Text>Account</Text>;
}
