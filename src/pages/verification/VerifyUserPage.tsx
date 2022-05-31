import { useAppSelector } from '../../hooks';
import { AuthFormWrapper } from '../../_components/AuthFormWrapper';
import { EmailVerification } from './EmailVerification';
import { PhoneVerification } from './PhoneVerification';

export function VerifyUserPage() {
  const user = useAppSelector((state) => state.auth.user)!;
  return (
    <AuthFormWrapper>
      {!user?.emailVerified && <EmailVerification />}
      {user?.emailVerified && !user?.phoneNumber && <PhoneVerification />}
    </AuthFormWrapper>
  );
}
