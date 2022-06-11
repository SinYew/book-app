import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { users } from '../../data/users';
import { UserState } from './usersSlice';

const initialState: UserState = users.find(user => user.id === "-wPwed35Pjz_aDjdVY11I") ?? users[0];

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    currentUserUpdated: (state, action: PayloadAction<any>) => {
      const { id } = action.payload
      const currentUser = users.find(user => user.id === id)
      if(currentUser){
        state.id = currentUser.id
        state.name = currentUser.name
        state.role = currentUser.role
        state.dateJoined = currentUser.dateJoined
      }
    },
  }
});

export const { currentUserUpdated } = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser;

export default currentUserSlice.reducer;
