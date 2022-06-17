import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import {
  getAuth,
  linkWithCredential,
  PhoneAuthProvider,
  RecaptchaVerifier,
  reload,
} from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AuthFormWrapper } from '../../components/AuthFormWrapper';
import { auth } from '../../firebase';

type TVerificationData = {
  verificationId: string;
  phoneNumber: string;
};

const PhoneVerificationInput = z.object({
  // countryCode: z.string().nonempty(),
  phoneNumber: z
    .string()
    .length(10, 'Mobile number must be 10 charaters long.'),
});
type TPhoneVerificationInput = z.infer<typeof PhoneVerificationInput>;

export function PhoneVerification() {
  const toast = useToast();
  // const user = useAppSelector((state) => state.auth.user)!;

  // Ref to render reCaptcha on.
  const captchaRef = useRef<HTMLDivElement>(null);
  // Store RecaptchaVerifier in state.
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>();
  // Store latest widgetId in state.
  const [widgetId, setWidgetId] = useState<number | null>();
  // Store state of RecaptchaVerifier.
  // Used to control submit button.
  const [captchaSolved, setCaptchaSolved] = useState(false);

  // Store required data for verification completion in state.
  const [verificationData, setVerificationData] =
    useState<TVerificationData | null>();

  // Render RecaptchaVerifier on first paint.
  useEffect(() => {
    const verifier = new RecaptchaVerifier(
      captchaRef.current!,
      {
        callback: function (response: unknown) {
          // Enable `Send OTP` button.
          setCaptchaSolved(true);
        },
        'expired-callback': function () {
          // Close the OTP modal
          onClose();
          // Disable `Send OTP` button.
          setCaptchaSolved(false);
        },
      },
      auth
    );
    setRecaptchaVerifier(verifier);
    // Prerender reCaptcha widget.
    verifier.render().then((wid) => setWidgetId(wid));
  }, []);

  // Manage modal state here
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [verficationCode, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const handleVerification = async () => {
    setVerifying(true);
    try {
      // Create credentials
      const credential = PhoneAuthProvider.credential(
        verificationData?.verificationId!,
        verficationCode
      );
      // Link with account
      await linkWithCredential(auth.currentUser!, credential);
      toast({
        title: 'Mobile number added',
        // description: ``,
        status: 'success',
        isClosable: true,
        position: 'bottom',
      });
      onClose();
      await reload(getAuth().currentUser!);
    } catch (e) {
      toast({
        title: 'Failed to verify mobile number.',
        description: (e as FirebaseError).code,
        status: 'error',
        isClosable: true,
        position: 'bottom',
      });
    } finally {
      setVerifying(false);
    }
  };

  // Manage form state here
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<TPhoneVerificationInput>({
    resolver: zodResolver(PhoneVerificationInput),
  });

  const verificationHandler = async (values: TPhoneVerificationInput) => {
    const phoneAuthProvider = new PhoneAuthProvider(auth);
    try {
      const phoneNumber = `+91${values.phoneNumber}`;
      const verificationId = await phoneAuthProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier!
      );
      setVerificationData({ phoneNumber, verificationId });
      onOpen();
    } catch (e) {
      setVerificationData(null);
      toast({
        title: 'Failed to send otp.',
        description: (e as any).code,
        position: 'bottom',
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align='stretch' spacing='4'>
              <Text>Enter the otp sent to {verificationData?.phoneNumber}</Text>
              <HStack justify='center'>
                <PinInput
                  value={verficationCode}
                  variant='flushed'
                  onChange={(val) => setOtp(val)}
                  otp
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <ModalFooter>
                <Button variant='outline' mr='3' onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant='solid'
                  colorScheme='blue'
                  isDisabled={verficationCode.length !== 6}
                  isLoading={verifying}
                  onClick={handleVerification}
                >
                  Verify
                </Button>
              </ModalFooter>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AuthFormWrapper>
        <form onSubmit={handleSubmit(verificationHandler)}>
          <VStack spacing='4' align='start'>
            <Heading size='lg'>Verify your mobile.</Heading>
            {/* Email TextBox */}
            <FormControl isInvalid={Boolean(errors.phoneNumber)}>
              <FormLabel htmlFor='phoneNumber'>Mobile Number</FormLabel>
              <InputGroup>
                <InputLeftAddon children='+91' pointerEvents='none' />
                <Input
                  id='phoneNumber'
                  type='tel'
                  autoComplete='phone'
                  {...register('phoneNumber')}
                />
              </InputGroup>

              {errors.phoneNumber ? (
                <FormErrorMessage>
                  {errors.phoneNumber.message}
                </FormErrorMessage>
              ) : (
                <FormHelperText>Provide your mobile number.</FormHelperText>
              )}
            </FormControl>
            <Box height='78px' bg='gray.100' ref={captchaRef} />

            {/* Submit Button */}
            <Button
              width='full'
              colorScheme='blue'
              type='submit'
              isDisabled={!captchaSolved}
              isLoading={isSubmitting}
              loadingText='Sending...'
            >
              Send OTP
            </Button>
          </VStack>
        </form>
      </AuthFormWrapper>
    </>
  );
}
