import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { WithAuthentication } from '../../components/WithAuthentication';
import { useAppDispatch } from '../../hooks';
import {
  BasicDetailsSchema,
  BasicDetailsValidator,
} from '../../model/UserProfile';

export function OnboardingPage() {
  // const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<BasicDetailsSchema>({
    resolver: zodResolver(BasicDetailsValidator),
  });

  // useEffect(() => {
  //   if (user) {
  //     setValue('email', user.email!);
  //   }
  // }, [user]);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler = async (values: BasicDetailsSchema) => {
    // if (user) {
    //   try {
    //     const ref = doc(collection(getFirestore(), 'profiles'), user.uid);
    //     await setDoc(ref, { basic: values }, { merge: true });
    //     dispatch(markAsCreated());
    //     toast({
    //       status: 'success',
    //       position: 'bottom',
    //       title: 'Success',
    //       description: 'Basic details updated successfully.',
    //       isClosable: true,
    //     });
    //     navigate('/', { replace: true });
    //   } catch (e) {
    //     toast({
    //       status: 'error',
    //       position: 'bottom',
    //       title: 'Failed',
    //       description: 'Failed to update basic details.',
    //       isClosable: true,
    //     });
    //   }
    // }
  };

  return (
    <WithAuthentication>
      <Container maxW='container.md'>
        <form onSubmit={handleSubmit(submitHandler)}>
          <VStack
            align='flex-start'
            justify='center'
            minH='100vh'
            p='4'
            spacing='6'
          >
            <Box>
              <Heading>Welcome to OpenCampus 🥳</Heading>
              <Text>Let's get started by knowing you better.</Text>
            </Box>
            <Grid
              w='full'
              templateColumns={['1fr', 'repeat(2, 1fr)']}
              gap='4'
              my='6'
            >
              <GridItem>
                {/* Full Name */}
                <FormControl isInvalid={Boolean(errors.name)}>
                  <FormLabel htmlFor='name'>Full Name</FormLabel>
                  <Input id='name' {...register('name')} />
                  {errors.name ? (
                    <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                  ) : (
                    <FormHelperText>Enter your full name.</FormHelperText>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                {/* Email */}
                <FormControl isInvalid={Boolean(errors.email)} isDisabled>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input id='email' {...register('email')} />
                  {errors.email ? (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  ) : (
                    <FormHelperText>
                      An email through the employer will contact you.
                    </FormHelperText>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                {/* Phone */}
                <FormControl isInvalid={Boolean(errors.phone)}>
                  <FormLabel htmlFor='phone'>Phone Number</FormLabel>
                  <Input id='phone' {...register('phone')} />
                  {errors.phone ? (
                    <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
                  ) : (
                    <FormHelperText>
                      An phone number through the employer will contact you.
                    </FormHelperText>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                {/* Gender */}
                <FormControl isInvalid={Boolean(errors.gender)}>
                  <FormLabel htmlFor='gender'>Gender</FormLabel>
                  <Select
                    placeholder='Select Gender'
                    id='gender'
                    {...register('gender')}
                  >
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='non_binary'>Non Binary</option>
                  </Select>
                  {errors.gender && (
                    <FormErrorMessage>{errors.gender.message}</FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                {/* Caste */}
                <FormControl isInvalid={Boolean(errors.caste)}>
                  <FormLabel htmlFor='caste'>Caste</FormLabel>
                  <Select
                    placeholder='Select Caste'
                    id='caste'
                    {...register('caste')}
                  >
                    <option value='st'>ST</option>
                    <option value='sc'>SC</option>
                    <option value='obc-a'>OBC-A</option>
                    <option value='obc-b'>OBC-B</option>
                    <option value='ur'>UR</option>
                  </Select>
                  {errors.caste && (
                    <FormErrorMessage>{errors.caste.message}</FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                {/* Nationality */}
                <FormControl isInvalid={Boolean(errors.nationality)}>
                  <FormLabel htmlFor='nationality'>Nationality</FormLabel>
                  <Input id='nationality' {...register('nationality')} />
                  {errors.nationality && (
                    <FormErrorMessage>
                      {errors.nationality.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
            </Grid>
            <Button
              colorScheme='blue'
              type='submit'
              w={['full', 'inherit']}
              isLoading={isSubmitting}
            >
              Save &amp; Continue
            </Button>
          </VStack>
        </form>
      </Container>
    </WithAuthentication>
  );
}
