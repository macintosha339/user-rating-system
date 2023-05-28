import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../store/usersSlice";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
} from "@mui/material";
import { RootState } from "../store/store";
import User from "../interfaces/user";
import RatingButtons from "./RatingButtons";
import "./UserList.css";

const UserList: React.FC = () => {
  const users: User[] = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://random-data-api.com/api/users/random_user?size=3"
        );
        dispatch(setUsers(response.data));
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleRefresh = () => {
    // Логика обновления списка пользователей
  };
  
  const handleNextPage = () => {
    // Логика загрузки следующей страницы пользователей
  };

  return (
    <div className="user-list">
      <h2 className="user-list__title">User List</h2>
      <List>
        {users.map((user: User) => (
          <>
            <ListItem key={user.id} className="user-list__item">
              <ListItemAvatar>
                <Avatar
                  alt={`${user.first_name} ${user.last_name}`}
                  src={user.avatar}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                secondary={`Username: ${user.username}, Country: ${user.address.country}`}
              />
            </ListItem>
            <RatingButtons onDecrement={() => {}} onIncrement={() => {}} />
          </>
        ))}
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

export default UserList;
