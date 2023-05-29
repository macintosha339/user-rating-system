import { configureStore } from "@reduxjs/toolkit";
import User from "../interfaces/user";
import ratedUsersSlice from "./ratedUsersSlice";
import { usersSlice } from "../modules/UserList";

interface UsersState {
  users: User[];
}

// Определяем интерфейс для корневого состояния
export interface RootState {
    users: UsersState;
}



export default configureStore({
  reducer: {
    users: usersSlice.reducer,
    ratedUsers: ratedUsersSlice
  },
});