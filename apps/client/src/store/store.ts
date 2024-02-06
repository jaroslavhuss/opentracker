import { configureStore } from '@reduxjs/toolkit'
import errorReducer from "./gsms/errorSlice"
import successReducer from "./gsms/successSlice"
import authSlice from './gsms/authSlice'
export const store = configureStore({
  reducer: {
    error: errorReducer,
    success: successReducer,
    auth: authSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export interface IErrorGlobalState {
  error: {
    showError: boolean,
    errorMessages: {
      date?: string,
      message: string,
      rawData: string,
      cumulation?: number,
    }[],
  }
} 

export interface ISuccessGlobalState {
  success: {
    date?: string,
    message: string,
    rawData: string,
    showSuccess?: boolean,
  }
}