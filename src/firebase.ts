import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDcF3qy9QVxGiRVwp6j9zsY_7pUBvP56io',
  authDomain: 'opencampus-61d6e.firebaseapp.com',
  projectId: 'opencampus-61d6e',
  storageBucket: 'opencampus-61d6e.appspot.com',
  messagingSenderId: '805283024711',
  appId: '1:805283024711:web:6b8731d331b0af0f4d8662',
  measurementId: 'G-CK8SQ5SVNP',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
