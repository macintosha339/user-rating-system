import React from "react";
import { useSelector } from "react-redux";
import { List, Divider } from "@mui/material";
import User from "../../../../interfaces/user";
import { RootState } from "../../../../store/store";
import { ItemsList } from "../../../../components/ItemsList/ItemsList";
import Title from "../../../../ui/Title";

interface RatedUsersState {
  positiveRatedUsers: User[];
  negativeRatedUsers: User[];
}

export const RatedUserList: React.FC = () => {
  const ratedUsers: RatedUsersState = useSelector(
    (state: RootState) => state.ratedUsers
  );

  const positiveUsers = ratedUsers.positiveRatedUsers;
  const negativeUsers = ratedUsers.negativeRatedUsers;

  return (
    <div>
      <Title level="h2" text="Positive Users" />
      <List>
        <ItemsList showRating={true} users={positiveUsers} itemClassName="rated-user-list__item" />
      </List>
      <Divider />
      <Title level="h2" text="Negative Users" />
      <List>
        <ItemsList showRating={true} users={negativeUsers} itemClassName="rated-user-list__item" />
      </List>
    </div>
  );
};