import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import currentUserSlice from '../features/users/currentUserSlice';
import usersReducer from '../features/users/usersSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    currentUser: currentUserSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
