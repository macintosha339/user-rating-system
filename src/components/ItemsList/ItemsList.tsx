import React from "react";
import User from "../../interfaces/user";
import { ListItem, ButtonGroup, Button } from "@mui/material";
import AvatarUI from "../../ui/Avatar";
import ItemText from "../../ui/ItemText";
import { useRateUser } from "../../hooks/useRateUser";

interface ItemsListProps {
  users: User[];
  itemClassName: string;
  showRating?: boolean;
}

export const ItemsList: React.FC<ItemsListProps> = ({
  users,
  itemClassName,
  showRating
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
            {showRating && <span>Rating: {user.rating}</span>}
          </ListItem>
          <ButtonGroup>
            <Button onClick={() => {
              if(user.rating < 5) incrementRatingUser(user)
            }}>+</Button>
            <Button onClick={() => {
              if(user.rating > -5) decrementRatingUser(user)
            }}>-</Button>
          </ButtonGroup>
        </>
      ))}
    </>
  );
};
