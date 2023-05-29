import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsers, loadMoreUsers
} from "../../../../store/usersSlice";
import { List, Button } from "@mui/material";
import { RootState } from "../../../../store/store";
import User from "../../../../interfaces/user";
import { ItemsList } from "../../../../components/ItemsList/ItemsList";
import Title from "../../../../ui/Title";
import { fetchUsers } from "../../api/usersApi";
import { useAction } from "../../hooks/useAction";
import { NEXT_PAGE, UPDATE_LIST, USER_LIST, ERROR_FETCH } from "../../constants";
import "./UserList.css";

export const UserList: React.FC = () => {
  const users: User[] = useSelector((state: RootState) => state.users.users);
  const handleRefresh = useAction({
    action: setUsers
  });

  const handleLoadMoreUsers = useAction({
    action: loadMoreUsers
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        dispatch(setUsers(data));
      } catch (error) {
        console.log(ERROR_FETCH, error);
      }
    };

    getUsers();
  }, [dispatch]);

  return (
    <div className="user-list">
      <Title className="user-list__title" level="h2" text={USER_LIST} />
      <List>
        <ItemsList
          users={users}
          itemClassName="user-list__item"
        />
        <div className="user-list__buttons">
          <Button variant="contained" color='primary' onClick={handleRefresh}>
            {UPDATE_LIST}
          </Button>
          <Button variant="contained" color='primary' onClick={handleLoadMoreUsers}>
            {NEXT_PAGE}
          </Button>
        </div>
      </List>
    </div>
  );
};
