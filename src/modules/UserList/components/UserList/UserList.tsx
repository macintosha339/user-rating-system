import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUsers } from "../../store/usersSlice";
import { List } from "@mui/material";
import { Buttons } from "../Buttons/Buttons";
import { RootState } from "../../../../store/store";
import User from "../../../../interfaces/user";
import { ItemsList } from "../../../../components/ItemsList/ItemsList";
import Title from "../../../../ui/Title";
import { fetchUsers } from "../../api/usersApi";
import { USER_LIST, ERROR_FETCH } from "../../constants";
import "./UserList.css";

export const UserList: React.FC = () => {
  const users: User[] = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        dispatch(updateUsers(data));
      } catch (error) {
        console.log(ERROR_FETCH, error);
      }
    };

    getUsers();
  }, [dispatch]);

  return (
    <div className="user-list">
      <Title className="user-list__title" level="h2" text={USER_LIST} />
      <List className="user-list__container">
        <ItemsList
          users={users}
          itemClassName="user-list__item"
        />
        <Buttons />
      </List>
    </div>
  );
};
