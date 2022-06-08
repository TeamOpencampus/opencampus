import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

export const checkProfileCreated = createAsyncThunk(
  'firestore/checkProfileCreated',
  async () => {
    const user = getAuth().currentUser;
    const ref = doc(collection(getFirestore(), 'profiles'), user!.uid);
    const snapshot = await getDoc(ref);
    return snapshot.exists();
  }
);

export const createUserProfile = createAsyncThunk(
  'profile/createUserProfile',
  async (data: Record<string, any>) => {
    const user = getAuth().currentUser;
    const ref = doc(collection(getFirestore(), 'profiles'), user!.uid);
    await setDoc(ref, { basic: data }, { merge: true });
  }
);

interface ProfileState {
  loading: boolean;
  created?: boolean;
  error?: string;
}

const initialState: ProfileState = { loading: true };

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    markAsCreated: (state) => {
      state.loading = false;
      state.created = true;
    },
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkProfileCreated.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.created = action.payload;
    });
    builder.addCase(createUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.created = true;
    });
    builder.addCase(createUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.name;
      state.created = undefined;
    });
  },
});

export const { markAsCreated, reset } = profileSlice.actions;
export default profileSlice.reducer;
