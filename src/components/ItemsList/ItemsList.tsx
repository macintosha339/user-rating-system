import React from "react";
import User from "../../interfaces/user";
import { ListItem, ButtonGroup, Button } from "@mui/material";
import AvatarUI from "../../ui/Avatar";
import ItemText from "../../ui/ItemText";
import { useRateUser } from "../../hooks/useRateUser";

interface ItemsListProps {
  users: User[];
  itemClassName: string;
}

export const ItemsList: React.FC<ItemsListProps> = ({
  users,
  itemClassName,
}) => {
    const { incrementRatingUser, decrementRatingUser } = useRateUser();
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
            <Button onClick={() => incrementRatingUser(user)}>+</Button>
            <Button onClick={() => decrementRatingUser(user)}>-</Button>
          </ButtonGroup>
        </>
      ))}
    </>
  );
};
