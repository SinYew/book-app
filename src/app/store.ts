import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booksSlice from '../features/books/booksSlice';
import transactionSlice from '../features/books/transactionSlice';
import counterReducer from '../features/counter/counterSlice';
import currentUserSlice from '../features/users/currentUserSlice';
import usersReducer from '../features/users/usersSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    currentUser: currentUserSlice,
    books: booksSlice,
    transactions: transactionSlice
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
