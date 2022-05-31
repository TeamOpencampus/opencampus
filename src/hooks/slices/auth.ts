import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIdTokenResult, User } from 'firebase/auth';

export const fetchUserRole = createAsyncThunk(
  'auth/fetchUserRole',
  async (user: User) => {
    const result = await getIdTokenResult(user);
    return result.claims.role;
  }
);

interface AuthState {
  loading: boolean;
  user?: User | null;
  error?: Error | null;
  role?: string | object;
}
const initialState: AuthState = { loading: true };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<object | undefined | null>) => {
      state.loading = false;
      state.user = action.payload as User;
      state.error = undefined;
      if (state.user === null) state.role = undefined;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.user = undefined;
      state.role = undefined;
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserRole.fulfilled, (state, action) => {
      state.role = action.payload;
    });
  },
});

export const { setValue, setError } = authSlice.actions;
export default authSlice.reducer;
