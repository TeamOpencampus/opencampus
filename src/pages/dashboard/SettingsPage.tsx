import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React from 'react';
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

const PROFILE_SECTIONS: { title: string; element: React.ReactNode }[] = [
  { title: 'Basic Details', element: <BasicDetailsForm /> },
  { title: 'Academic Details', element: <AcademicDetailsForm /> },
  { title: 'Work Experience', element: <WorkExperienceForm /> },
  { title: 'Additional Documents', element: <AdditionalDocumentsForm /> },
];

function ProfileTab() {
  return (
    <Accordion defaultIndex={0}>
      {PROFILE_SECTIONS.map((item, key) => (
        <AccordionItem key={key}>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              {item.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>{item.element}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function BasicDetailsForm() {
  return (
    <VStack align='flex-start' spacing='4' divider={<StackDivider />}>
      {/* Full Name */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='full-name'>Full Name</FormLabel>
            <FormHelperText>Enter your full name.</FormHelperText>
          </Box>
          <Input id='full-name' width={['full', 'sm']} />
        </Stack>
      </FormControl>
      {/* Email */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='email'>Email Address</FormLabel>
            <FormHelperText>
              An email through the employer will contact you.
            </FormHelperText>
          </Box>
          <Input id='email' width={['full', 'sm']} />
        </Stack>
      </FormControl>
      {/* Phone Number */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='phone'>Phone Number</FormLabel>
            <FormHelperText>
              An phone number through the employer will contact you.
            </FormHelperText>
          </Box>
          <Input id='phone' width={['full', 'sm']} />
        </Stack>
      </FormControl>
      {/* Gender */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='gender'>Gender</FormLabel>
            <FormHelperText>Lorem ipsum dolor sit amet.</FormHelperText>
          </Box>
          <Select
            placeholder='Select Gender'
            id='gender'
            width={['full', 'sm']}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='non_binary'>Non Binary</option>
          </Select>
        </Stack>
      </FormControl>
      {/* Nationality */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='nationality'>Nationality</FormLabel>
            <FormHelperText>Lorem ipsum dolor sit amet.</FormHelperText>
          </Box>
          <Input id='nationality' width={['full', 'sm']} />
        </Stack>
      </FormControl>
      {/* Caste */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='caste'>Caste</FormLabel>
            <FormHelperText>Lorem ipsum dolor sit amet.</FormHelperText>
          </Box>
          <Select placeholder='Select Caste' id='caste' width={['full', 'sm']}>
            <option value='st'>ST</option>
            <option value='sc'>SC</option>
            <option value='obc-a'>OBC-A</option>
            <option value='obc-b'>OBC-B</option>
            <option value='ur'>UR</option>
          </Select>
        </Stack>
      </FormControl>
      <ButtonGroup spacing='6'>
        <Button>Reset</Button>
        <Button colorScheme='blue'>Save</Button>
      </ButtonGroup>
    </VStack>
  );
}

function AcademicDetailsForm() {
  return (
    <VStack align='flex-start' spacing='4' divider={<StackDivider />}>
      {/* Type of Course */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='gender'>Course</FormLabel>
            <FormHelperText>Choose qualified or ongoing course</FormHelperText>
          </Box>
          <Select
            placeholder='Select Course'
            id='course'
            width={['full', 'sm']}
          >
            <option value='secondary'>Secondary</option>
            <option value='higher-secondary'>Higher Secondary</option>
            <option value='diploma'>Diploma</option>
            <option value='bsc'>B.Sc</option>
            <option value='msc'>M.Sc</option>
            <option value='btech'>B.Tech</option>
            <option value='mtech'>M.Tech</option>
          </Select>
        </Stack>
      </FormControl>
      {/* Institute */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='institute'>Institute</FormLabel>
            {/* <FormHelperText>Enter your college or institute</FormHelperText> */}
          </Box>
          <Input
            placeholder='Enter college or institute here'
            id='institute'
            width={['full', 'sm']}
          />
        </Stack>
      </FormControl>
      {/* Board or Council */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='board'>
              Board or Council or University
            </FormLabel>
            {/* <FormHelperText>Enter your board or council or university</FormHelperText> */}
          </Box>
          <Input
            placeholder='Enter board or council or university here'
            id='board'
            width={['full', 'sm']}
          />
        </Stack>
      </FormControl>
      {/* Stream or Department */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='stream'>Department</FormLabel>
            {/* <FormHelperText>Enter your department or stream</FormHelperText> */}
          </Box>
          <Input
            placeholder='Enter department or stream here'
            id='stream'
            width={['full', 'sm']}
          />
        </Stack>
      </FormControl>
      {/* Start Date */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='start-date'>Course Start Date</FormLabel>
            {/* <FormHelperText>Enter your course start date</FormHelperText> */}
          </Box>
          <Input
            placeholder='Enter start date here'
            id='start-date'
            width={['full', 'sm']}
          />
        </Stack>
      </FormControl>
      {/* End Date */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='end-date'>Course End Date</FormLabel>
            {/* <FormHelperText>Enter your course end date</FormHelperText> */}
          </Box>
          <Input
            placeholder='Enter end date here'
            id='end-date'
            width={['full', 'sm']}
          />
        </Stack>
      </FormControl>
      {/* Marks */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='marks'>Marks CGPA or Percentage</FormLabel>
            <FormHelperText>Average marks cgpa or percentage</FormHelperText>
          </Box>
          <Input
            placeholder='Enter cgpa or percentage here'
            id='marks'
            width={['full', 'sm']}
          />
        </Stack>
      </FormControl>
      <ButtonGroup spacing='6'>
        <Button>Reset</Button>
        <Button colorScheme='blue'>Save</Button>
      </ButtonGroup>
    </VStack>
  );
}
function WorkExperienceForm() {
  return (
    <VStack align='flex-start' spacing='4' divider={<StackDivider />}>
      {/* Have Work Experience */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='have_exp'>
              Do You Have Prior Work Experience?
            </FormLabel>
          </Box>
          <Checkbox>Yes</Checkbox>
        </Stack>
      </FormControl>
      {/* Previous Company */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='company'>Previous Company</FormLabel>
          </Box>
          <Input
            placeholder='Enter name of company here'
            id='company'
            width={['full', 'sm']}
          />
        </Stack>
      </FormControl>
      {/* Start Date */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='start_date_exp'>Start Date</FormLabel>
            {/* <FormHelperText>Enter start date</FormHelperText> */}
          </Box>
          <Input
            placeholder='Enter start date here'
            id='start_date_exp'
            width={['full', 'sm']}
          />
        </Stack>
      </FormControl>
      {/* End Date */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='end_date_exp'>End Date</FormLabel>
            {/* <FormHelperText>Enter end date</FormHelperText> */}
          </Box>
          <Input
            placeholder='Enter end date here'
            id='end_date_exp'
            width={['full', 'sm']}
          />
        </Stack>
      </FormControl>
      {/* Last Salary */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='last_salary'>Last Salary</FormLabel>
            {/* <FormHelperText>Enter your last salary here</FormHelperText> */}
          </Box>
          <Input
            placeholder='Enter last salary here'
            id='last_salary'
            width={['full', 'sm']}
          />
        </Stack>
      </FormControl>
      <ButtonGroup spacing='6'>
        <Button>Reset</Button>
        <Button colorScheme='blue'>Save</Button>
      </ButtonGroup>
    </VStack>
  );
}
function AdditionalDocumentsForm() {
  return (
    <VStack align='flex-start' spacing='4' divider={<StackDivider />}>
      {/* Photo */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='photo'>Current photo</FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='photo'>
            Select File
          </Button>
        </Stack>
      </FormControl>
      {/* Signature */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='sign'>Your Signature</FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='sign'>
            Select File
          </Button>
        </Stack>
      </FormControl>
      {/* ID_Proof */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='ID_proof'>Valid Identity Proof</FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='ID_proof'>
            Select File
          </Button>
        </Stack>
      </FormControl>
      {/* Caste Certificate */}
      <FormControl>
        <Stack direction={['column', 'row']} spacing={['2', '20']}>
          <Box w={['full', 'xs']}>
            <FormLabel htmlFor='certificate'>
              Caste Certificate (if any)
            </FormLabel>
            <FormHelperText>Maximum Size 4MB</FormHelperText>
          </Box>
          <Button width={['full', '28']} id='certificate'>
            Select File
          </Button>
        </Stack>
      </FormControl>
    </VStack>
  );
}

function AccountTab() {
  return <Text>Account</Text>;
}
