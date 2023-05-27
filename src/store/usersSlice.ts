import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
}

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
      state.users = action.payload;
    },
    // Другие action creators для управления состоянием пользователей
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;