import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../interfaces/user";

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload.map((user) => ({
        ...user,
        rating: 0, // Добавляем поле rating со значением 0
      }));
    },
    updateUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    loadMoreUsers: (state, action: PayloadAction<User[]>) => {
      state.users = [...state.users, ...action.payload];
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setUsers, updateUsers, loadMoreUsers, removeUser } = usersSlice.actions;
export default usersSlice.reducer;