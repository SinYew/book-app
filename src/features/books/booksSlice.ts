import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { books } from '../../data/books';

export interface BookState {
  id: number,
  title: string,
  description: string,
  genre: string,
  author: string,
  yearPublished: string,
  borrowAvailability: boolean,
  lastBorrower: string
}

const initialState: BookState[] = books;

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    bookAdded: (state, action: PayloadAction<BookState>) => {
      state.push(action.payload)
    },
    bookUpdated: (state, action: PayloadAction<any>) => {
      const { id, title, description, genre, author, yearPublished } = action.payload
      const existingBook = state.find(book => book.id === id)
      if (existingBook) {
        existingBook.title = title
        existingBook.description = description
        existingBook.genre = genre
        existingBook.author = author
        existingBook.yearPublished = yearPublished
      }
    },
    bookDeleted: (state, action: PayloadAction<any>) => {
      const { id } = action.payload
      const existingBook = state.find(book => book.id === id)
      if (existingBook) {
        return state.filter(book => book.id !== id)
      }
    },
  }
});

export const { bookAdded, bookUpdated, bookDeleted } = booksSlice.actions;

export const selectBooks = (state: RootState) => state.books;

export default booksSlice.reducer;