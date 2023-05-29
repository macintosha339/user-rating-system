import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsers,
  updateUsers,
  loadMoreUsers,
} from "../../../../store/usersSlice";
import { List, Button } from "@mui/material";
import { RootState } from "../../../../store/store";
import User from "../../../../interfaces/user";
import { ItemsList } from "../../../../components/ItemsList/ItemsList";
import Title from "../../../../ui/Title";
import { fetchUsers } from "../../api/usersApi";
import "./UserList.css";

export const UserList: React.FC = () => {
  const users: User[] = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        dispatch(setUsers(data));
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    getUsers();
  }, [dispatch]);

  const handleRefresh = async () => {
    try {
      const data = await fetchUsers();
      dispatch(updateUsers(data));
    } catch (error) {
      console.log("Error refreshing users:", error);
    }
  };

  const handleNextPage = async () => {
    try {
      const data = await fetchUsers(); // Загрузка следующей страницы
      dispatch(loadMoreUsers(data)); // Добавление новых пользователей в список
    } catch (error) {
      console.log("Error loading next page:", error);
    }
  };

  return (
    <div className="user-list">
      <Title className="user-list__title" level="h2" text="User List" />
      <List>
        <ItemsList
          users={users}
          itemClassName="user-list__item"
        />
        <div className="user-list__buttons">
          <Button variant="contained" color="primary" onClick={handleRefresh}>
            Обновить список
          </Button>
          <Button variant="contained" color="primary" onClick={handleNextPage}>
            Следующая страница
          </Button>
        </div>
      </List>
    </div>
  );
};
