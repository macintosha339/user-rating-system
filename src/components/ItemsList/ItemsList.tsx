import React from "react";
import { useDispatch } from "react-redux";
import User from "../../interfaces/user";
import { ListItem, ButtonGroup, Button } from "@mui/material";
import AvatarUI from "../../ui/Avatar";
import ItemText from "../../ui/ItemText";
import { incrementRating, decrementRating } from "../../store/ratedUsersSlice";
import { removeUser } from "../../store/usersSlice";

interface ItemsListProps {
  users: User[];
  itemClassName: string;
}

export const ItemsList: React.FC<ItemsListProps> = ({
  users,
  itemClassName,
}) => {
    const dispatch = useDispatch();

  const onIncrementRateUser = (user: User): void => {
    dispatch(incrementRating(user));
    dispatch(removeUser(user.id));
  };

  const onDecrementRateUser = (user: User): void => {
    dispatch(decrementRating(user));
    dispatch(removeUser(user.id));
  };
  return (
    <>
      {users.map((user: User) => (
        <>
          <ListItem key={user.id} className={itemClassName}>
            <AvatarUI
              first_name={user.first_name}
              last_name={user.last_name}
              avatar={user.avatar}
            />
            <ItemText
              first_name={user.first_name}
              last_name={user.last_name}
              username={user.username}
              country={user.address.country}
            />
          </ListItem>
          <ButtonGroup>
            <Button onClick={() => onIncrementRateUser(user)}>+</Button>
            <Button onClick={() => onDecrementRateUser(user)}>-</Button>
          </ButtonGroup>
        </>
      ))}
    </>
  );
};
