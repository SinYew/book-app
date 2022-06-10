import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { users } from '../../data/users';

export interface UserState {
  id: string,
  name: string,
  role: userRole;
  dateJoined: string
}
export type userRole = 'admin' | 'editor' | 'user';

const initialState: UserState[] = users;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    userAdded: {
      reducer(state, action: PayloadAction<UserState>) {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.push(action.payload)
      },
      prepare(name:string, role: userRole) {
        const payload: UserState = {
          id: nanoid(),
          name,
          role,
          dateJoined: new Date().toLocaleDateString('en-CA')
        };

        return {payload}
      }
    },
    // other reducers here
    userUpdated: {
      reducer(state, action: PayloadAction<any>) {
        const { id, name, role } = action.payload
        const existingUser = state.find(user => user.id === id)
        if (existingUser) {
          existingUser.name = name
          existingUser.role = role
        }
      },
      prepare(id: string, name:string, role: userRole) {
        const payload: any = {
          id,
          name,
          role
        };

        return {payload}
      }
    },
    userDeleted: {
      reducer(state, action: PayloadAction<any>) {
        const { id } = action.payload
        const existingUser = state.find(user => user.id === id)
        if (existingUser) {
          return state.filter(user => user.id !== id)
        }
      },
      prepare(id: string) {
        const payload: any = {
          id
        };

        return {payload}
      }
    },
  }
});

export const { userAdded, userUpdated, userDeleted} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
