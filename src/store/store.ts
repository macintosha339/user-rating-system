import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../interfaces/user";

interface UsersState {
  users: User[];
}

// Определяем интерфейс для корневого состояния
export interface RootState {
    users: UsersState;
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});