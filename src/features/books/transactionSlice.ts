import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TransactionState {
  id: number,
  bookId: number,
  userId: string,
  status: bookStatus
}

export type bookStatus = 'borrow' | 'return';

const initialState: TransactionState[] = [];

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    bookBorrow: (state, action: PayloadAction<TransactionState>) => {
      state.push(action.payload)
    },
    bookReturn: (state, action: PayloadAction<any>) => {
      const { id, status } = action.payload
      const existingTransaction = state.find(transaction => transaction.id === id)
      if (existingTransaction) {
        existingTransaction.status = status
      }
    },
  }
});

export const { bookBorrow, bookReturn } = transactionSlice.actions;

export const selectTransactions = (state: RootState) => state.transactions;

export default transactionSlice.reducer;