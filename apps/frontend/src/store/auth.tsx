import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  User,
  ApiResponse,
  SignInInput,
  SignInResponse,
  UserResponseData,
  UpdateUserInput,
} from '@repo/entity';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isUpdating: boolean;
  isGettingUserData: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isUpdating: false,
  isGettingUserData: false,
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: SignInInput, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const responseData: ApiResponse<null> = await response.json();
      
      if (!responseData.success) {
        return rejectWithValue(responseData.message);
      }

      return responseData.message;
    } catch (error) {
      return rejectWithValue('An error occurred during sign up');
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: SignInInput, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (response.status === 401 || response.status === 403) {
        return rejectWithValue('Unauthorized');
      }

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const responseData: SignInResponse = await response.json();
      return responseData.data;
    } catch (error) {
      return rejectWithValue('An error occurred during sign in');
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (userInfo: UpdateUserInput, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('/api/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userInfo),
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const responseData: ApiResponse<UserResponseData> = await response.json();
      
      if (!responseData.success) {
        return rejectWithValue(responseData.message);
      }
      dispatch(getUserData());
      return responseData.data;
    } catch (error) {
      return rejectWithValue('An error occurred while updating user information');
    }
  }
);

export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 401 || response.status === 403) {
        return rejectWithValue({ status: response.status, message: 'Unauthorized' });
      }
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const responseData: ApiResponse<UserResponseData> = await response.json();
      
      if (!responseData.success) {
        return rejectWithValue(responseData.message);
      }

      return responseData.data;
    } catch (error) {
      return rejectWithValue('An error occurred while fetching user information');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const responseData: ApiResponse<null> = await response.json();
      
      if (!responseData.success) {
        return rejectWithValue(responseData.message);
      }

      return responseData.data;
    } catch (error) {
      return rejectWithValue('An error occurred while fetching user information');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.name,
          phoneNumber: action.payload.phoneNumber,
          photoURL: action.payload.photoURL,
        };
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })
      .addCase(getUserData.pending, (state) => {
        state.isGettingUserData = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isGettingUserData = false;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isGettingUserData = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {  
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
