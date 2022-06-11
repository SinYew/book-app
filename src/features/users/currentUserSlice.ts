import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { users } from '../../data/users';
import { UserState } from './usersSlice';

const initialState: UserState = users.find(user => user.id === "-wPwed35Pjz_aDjdVY11I") ?? users[0];

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {}
});

export const selectCurrentUser = (state: RootState) => state.currentUser;

export default currentUserSlice.reducer;
