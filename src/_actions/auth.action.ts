import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  linkWithCredential,
  PhoneAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  verifyPasswordResetCode,
} from 'firebase/auth';
import md5Hex from 'md5-hex';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function useAuthActions() {
  const navigate = useNavigate();

  return {
    signIn,
    signUp,
    resetPassword,
    confirmResetPassword,
    logOut,
    setupProfile,
    verifyResetCode,
    verifyOtp,
    sendEmailVerification,
  };

  async function verifyOtp(
    user: User,
    verificationId: string,
    verificationCode: string
  ) {
    const authCredential = PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    await linkWithCredential(user, authCredential);
  }

  function verifyResetCode(code: string) {
    return verifyPasswordResetCode(auth, code);
  }
  function confirmResetPassword(code: string, password: string) {
    return confirmPasswordReset(auth, code, password);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function setupProfile(user: User, fullname: string, email: string) {
    const hash = md5Hex(email.trim().toLowerCase());
    return updateProfile(user, {
      displayName: fullname,
      photoURL: `https://www.gravatar.com/avatar/${hash}?d=identicon`,
    });
  }
  async function logOut() {
    await signOut(auth);
    navigate('/', { replace: true });
  }
}

export { useAuthActions };
