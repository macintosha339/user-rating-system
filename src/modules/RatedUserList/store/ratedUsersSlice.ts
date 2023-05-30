import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../../interfaces/user";

interface RatedUsersState {
  positiveRatedUsers: User[];
  negativeRatedUsers: User[];
}

const initialState: RatedUsersState = {
  positiveRatedUsers: [],
  negativeRatedUsers: [],
};

export const ratedUsersSlice = createSlice({
  name: "ratedUsers",
  initialState,
  reducers: {
    incrementRating: (state, action: PayloadAction<User>) => {
      const { id } = action.payload;
      const user = state.positiveRatedUsers.find((user) => user.id === id);
      const userIndex = state.negativeRatedUsers.findIndex((user) => user.id === id);
      const negativeUser = state.negativeRatedUsers[userIndex];

      if (userIndex !== -1 && negativeUser && negativeUser.rating === 0) {
        // Пользователь найден в списке отрицательных рейтингов
        state.negativeRatedUsers.splice(userIndex, 1); // Удаляем пользователя из списка отрицательных рейтингов

        state.positiveRatedUsers.push({
          ...negativeUser,
          rating: 1,
        }); // Добавляем пользователя в список положительных рейтингов с рейтингом 1
      } else {
        if (user && user.rating >= 0) {
          // Увеличиваем рейтинг пользователя, если он уже находится в positiveUsers
          user.rating++;
        } else {
          const negativeUser = state.negativeRatedUsers.find(
            (user) => user.id === id
          );
          if (negativeUser && negativeUser.rating <= 0) {
            negativeUser.rating++;
          } else {
            // Если пользователь не найден, добавляем его в positiveUsers с рейтингом 1
            state.positiveRatedUsers.push({
              ...action.payload,
              rating: user ? user.rating + 1 : 1,
            });
          }
        }
      }
    },
    decrementRating: (state, action: PayloadAction<User>) => {
      const { id } = action.payload;
      const user = state.negativeRatedUsers.find((user) => user.id === id);
      const userIndex = state.positiveRatedUsers.findIndex((user) => user.id === id);
      const positiveUser = state.positiveRatedUsers[userIndex];

      if (userIndex !== -1 && positiveUser && positiveUser.rating === 0) {
        // Пользователь найден в списке положительных рейтингов
        state.positiveRatedUsers.splice(userIndex, 1); // Удаляем пользователя из списка положительных рейтингов

        state.negativeRatedUsers.push({
          ...positiveUser,
          rating: -1,
        }); // Добавляем пользователя в список отрицательных рейтингов с рейтингом -1
      } else {
        if (user && user.rating <= 0) {
          // Уменьшаем рейтинг пользователя, если он уже находится в negativeUsers
          user.rating--;
        } else {
          const positiveUser = state.positiveRatedUsers.find(
            (user) => user.id === id
          );
          if (positiveUser && positiveUser.rating >= 0) {
            positiveUser.rating--;
          } else {
            state.negativeRatedUsers.push({
              ...action.payload,
              rating: user ? user.rating - 1 : -1,
            });
          }
        }
      }
    },
    removeUser: (state, action: PayloadAction<Number>) => {
      const removedUser = state.positiveRatedUsers.find(
        (user) => user.id === action.payload
      );

      if (removedUser) {
        state.positiveRatedUsers = state.positiveRatedUsers.filter(
          (user) => user.id !== action.payload
        );
      } else {
        state.negativeRatedUsers = state.negativeRatedUsers.filter(
          (user) => user.id !== action.payload
        );
      }
    },
  },
});

export const { incrementRating, decrementRating, removeUser } = ratedUsersSlice.actions;
