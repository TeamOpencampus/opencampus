import { collection } from 'firebase/firestore';
import { firestore } from '../firebase';
// import { useAuth } from '../_state/AuthContext';

const profiles = collection(firestore, 'profiles');

export function useProfile() {
  // const { state } = useAuth();
  return { isCreated };

  /**
   * Check is user profile is created.
   */
  async function isCreated() {
    // const docRef = doc(profiles, state?.user.uid);
    // const docSnapshot = await getDoc(docRef);
    // return docSnapshot.exists();
  }
}
