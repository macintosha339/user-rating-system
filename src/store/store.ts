import { configureStore } from "@reduxjs/toolkit";
import User from "../interfaces/user";
import { ratedUsersSlice } from "../modules/RatedUserList";

import { usersSlice } from "../modules/UserList";

interface UsersState {
  users: User[];
}

// Определяем интерфейс для корневого состояния
export interface RootState {
    users: UsersState;
    ratedUsers: {
      positiveRatedUsers: User[],
      negativeRatedUsers: User[]
    }
}



export default configureStore({
  reducer: {
    users: usersSlice.reducer,
    ratedUsers: ratedUsersSlice.reducer
  },
});