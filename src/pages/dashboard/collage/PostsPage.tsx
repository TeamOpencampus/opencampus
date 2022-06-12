import { Icon } from '@/components/Icon';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

export function PostsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset='slideInBottom'
        scrollBehavior='inside'
      >
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
        <ModalContent>
          <ModalHeader>Post Creation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl>
                <FormLabel htmlFor='companies'>Company</FormLabel>
                <Select id='companies' placeholder='Select Company'>
                  <option>Company1</option>
                  <option>Company2</option>
                  <option>Company3</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='job_description'>Job Description</FormLabel>
                <Input
                  id='job_description'
                  placeholder='Eg: Junior Developer'
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='location'>Location</FormLabel>
                <Input id='location' placeholder='City/Village/Urban' />
                <FormHelperText>Students will be placed here</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='salary'>Salary</FormLabel>
                <NumberInput>
                  <NumberInputField
                    id='salary'
                    placeholder='Amount in INR'
                  ></NumberInputField>
                </NumberInput>
                <FormHelperText>Students will get paid</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Department</FormLabel>
                <CheckboxGroup colorScheme='blue'>
                  <VStack align='flex-start'>
                    <Checkbox>Production</Checkbox>
                    <Checkbox>Research and Development</Checkbox>
                    <Checkbox>Purchasing</Checkbox>
                    <Checkbox>Marketing</Checkbox>
                    <Checkbox>Human Resource Management</Checkbox>
                  </VStack>
                </CheckboxGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='job_desc'>Job Description</FormLabel>
                <Textarea
                  id='job_desc'
                  placeholder='An overview for the job'
                ></Textarea>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button variant='outline' onClick={onClose}>
                Close
              </Button>
              <Button colorScheme='blue'>Create Post</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack spacing='4' align='stretch'>
        <HStack justify='space-between' align='center'>
          <Heading>Posts</Heading>
          <Button leftIcon={<Icon name='add' />} onClick={onOpen}>
            New Post
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
