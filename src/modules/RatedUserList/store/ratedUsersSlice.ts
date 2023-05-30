import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../../interfaces/user";
import { RATED_USERS } from "../constants";

interface RatedUsersState {
  positiveRatedUsers: User[];
  negativeRatedUsers: User[];
}

const initialState: RatedUsersState = {
  positiveRatedUsers: [],
  negativeRatedUsers: [],
};

// Создание slice для хранения данных о рейтинге пользователей
export const ratedUsersSlice = createSlice({
  name: RATED_USERS,
  initialState,
  reducers: {
    // Увеличение рейтинга пользователя
    incrementRating: (state, action: PayloadAction<User>) => {
      const { id } = action.payload;
      const user = state.positiveRatedUsers.find((user) => user.id === id); // Поиск пользователя в списке положительных рейтингов
      const userIndex = state.negativeRatedUsers.findIndex((user) => user.id === id); // Поиск индекса пользователя в списке отрицательных рейтингов
      const negativeUser = state.negativeRatedUsers[userIndex];

      if (userIndex !== -1 && negativeUser && negativeUser.rating === 0) {
        // Если пользователь найден в списке отрицательных рейтингов и его рейтинг равен 0
        state.negativeRatedUsers.splice(userIndex, 1); // Удаляем пользователя из списка отрицательных рейтингов

        state.positiveRatedUsers.push({
          ...negativeUser,
          rating: 1,
        }); // Добавляем пользователя в список положительных рейтингов с рейтингом 1
      } else {
        if (user && user.rating >= 0) {
          // Если пользователь уже находится в списке положительных рейтингов и его рейтинг больше или равен 0
          user.rating++; // Увеличиваем рейтинг пользователя
        } else {
          const negativeUser = state.negativeRatedUsers.find((user) => user.id === id);
          if (negativeUser && negativeUser.rating <= 0) {
            // Если пользователь найден в списке отрицательных рейтингов и его рейтинг меньше или равен 0
            negativeUser.rating++; // Увеличиваем рейтинг пользователя
          } else {
            // Если пользователь не найден в списке оцененных пользователей, добавляем его в список положительных рейтингов с рейтингом 1
            state.positiveRatedUsers.push({
              ...action.payload,
              rating: user ? user.rating + 1 : 1,
            });
          }
        }
      }
    },
    // Уменьшение рейтинга пользователя
    decrementRating: (state, action: PayloadAction<User>) => {
      const { id } = action.payload;
      const user = state.negativeRatedUsers.find((user) => user.id === id); // Поиск пользователя в списке отрицательных рейтингов
      const userIndex = state.positiveRatedUsers.findIndex((user) => user.id === id); // Поиск индекса пользователя в списке положительных рейтингов
      const positiveUser = state.positiveRatedUsers[userIndex];

      if (userIndex !== -1 && positiveUser && positiveUser.rating === 0) {
        // Если пользователь найден в списке положительных рейтингов и его рейтинг равен 0
        state.positiveRatedUsers.splice(userIndex, 1); // Удаляем пользователя из списка положительных рейтингов

        state.negativeRatedUsers.push({
          ...positiveUser,
          rating: -1,
        }); // Добавляем пользователя в список отрицательных рейтингов с рейтингом -1
      } else {
        if (user && user.rating <= 0) {
          // Если пользователь уже находится в списке отрицательных рейтингов и его рейтинг меньше или равен 0
          user.rating--; // Уменьшаем рейтинг пользователя
        } else {
          const positiveUser = state.positiveRatedUsers.find((user) => user.id === id);
          if (positiveUser && positiveUser.rating >= 0) {
            // Если пользователь найден в списке положительных рейтингов и его рейтинг больше или равен 0
            positiveUser.rating--; // Уменьшаем рейтинг пользователя
          } else {
            // Если пользователь не найден, добавляем его в список отрицательных рейтингов с рейтингом -1
            state.negativeRatedUsers.push({
              ...action.payload,
              rating: user ? user.rating - 1 : -1,
            });
          }
        }
      }
    },
    // Удаление пользователя
    removeRatedUser: (state, action: PayloadAction<number>) => {
      const removedUser = state.positiveRatedUsers.find((user) => user.id === action.payload); // Поиск пользователя в списке положительных рейтингов

      if (removedUser) {
        state.positiveRatedUsers = state.positiveRatedUsers.filter((user) => user.id !== action.payload); // Удаляем пользователя из списка положительных рейтингов
      } else {
        state.negativeRatedUsers = state.negativeRatedUsers.filter((user) => user.id !== action.payload); // Удаляем пользователя из списка отрицательных рейтингов
      }
    },
  },
});

export const { incrementRating, decrementRating, removeRatedUser } = ratedUsersSlice.actions;