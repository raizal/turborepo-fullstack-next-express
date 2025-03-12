import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import authMiddleware from '../middleware/authMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authMiddleware),
});

// Define the state shape explicitly
interface State {
  auth: ReturnType<typeof authReducer>;
}

// Use the explicit state shape for RootState
export type RootState = State;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
