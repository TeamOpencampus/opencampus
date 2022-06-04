import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

export const checkProfileCreated = createAsyncThunk(
  'firestore/checkProfileCreated',
  async (user: User) => {
    const ref = doc(getFirestore(), 'profiles', user.uid);
    const snapshot = await getDoc(ref);
    return snapshot.exists();
  }
);

interface ProfileState {
  loading: boolean;
  created?: boolean;
  error?: Error;
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
  },
});

export const { markAsCreated, reset } = profileSlice.actions;
export default profileSlice.reducer;
