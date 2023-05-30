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
    positiveRatedUsers: User[];
    negativeRatedUsers: User[];
  };
}

// Получаем сохраненное состояние из localStorage (если есть)
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// Сохраняем текущее состояние в localStorage
const saveStateToLocalStorage = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch (error) {
    // Обработка ошибок сохранения состояния
  }
};

// Загружаем состояние из localStorage при инициализации стора
const initialState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    ratedUsers: ratedUsersSlice.reducer,
  },
  preloadedState: initialState,
});

// Сохраняем состояние в localStorage при каждом изменении состояния
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;