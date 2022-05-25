import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { schema } from 'normalizr';
import { auth } from '../../firebase';

interface AuthState {
  user: User | null;
}
const initialState: AuthState = { user: null };

export const signOut = createAsyncThunk('auth/signOut', auth.signOut);

const userEntity = new schema.Entity('user');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    // builder.addCase(signOut.fulfilled, (state, action) => {
    //   state.user = null;
    // });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
