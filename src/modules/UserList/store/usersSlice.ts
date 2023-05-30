import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../../interfaces/user";

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

// Создание slice для хранения данных о пользователях
export const usersSlice = createSlice({
  name: "users", // Название slice
  initialState, // Исходное состояние
  reducers: {
    // Обновление списка пользователей
    updateUsers: (state, action: PayloadAction<User[]>) => {
      // Обновляем список пользователей, присваивая каждому пользователю рейтинг 0
      state.users = action.payload.map((user) => ({ ...user, rating: 0 }));
    },
    // Загрузка дополнительных пользователей
    loadMoreUsers: (state, action: PayloadAction<User[]>) => {
      // Добавляем дополнительных пользователей в список, присваивая каждому рейтинг 0
      state.users.push(...action.payload.map((user) => ({ ...user, rating: 0 })));
    },
    // Удаление пользователя
    removeUser: (state, action: PayloadAction<number>) => {
      // Удаляем пользователя из списка по его id
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { updateUsers, loadMoreUsers, removeUser } = usersSlice.actions;