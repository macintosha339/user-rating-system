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

const ratedUsersSlice = createSlice({
    name: "ratedUsers",
    initialState,
    reducers: {
      incrementRating: (state, action: PayloadAction<User>) => {
        const { id } = action.payload;
        const user = state.positiveRatedUsers.find((user) => user.id === id);
        console.log(user?.rating);
  
        if (user?.rating) {
          // Увеличиваем рейтинг пользователя, если он уже находится в positiveUsers
          user.rating++;
        } else {
          // Если пользователь не найден, добавляем его в positiveUsers с рейтингом 1
          state.positiveRatedUsers.push({
            ...action.payload,
            rating: 1,
          });
        }
      },
      decrementRating: (state, action: PayloadAction<User>) => {
        const { id } = action.payload;
        const user = state.negativeRatedUsers.find((user) => user.id === id);
        console.log(user?.rating);
  
        if (user?.rating) {
          // Увеличиваем рейтинг пользователя, если он уже находится в negativeUsers
          user.rating--;
        } else {
          // Если пользователь не найден, добавляем его в negativeUsers с рейтингом -1
          state.negativeRatedUsers.push({
            ...action.payload,
            rating: -1,
          });
        }
      },
    },
  });

export const { incrementRating, decrementRating } = ratedUsersSlice.actions;

export default ratedUsersSlice.reducer;