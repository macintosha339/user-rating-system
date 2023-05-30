import React from "react";
import { useSelector } from "react-redux";
import { List, Divider } from "@mui/material";
import User from "../../../../interfaces/user";
import { RootState } from "../../../../store/store";
import { ItemsList } from "../../../../components/ItemsList/ItemsList";
import Title from "../../../../ui/Title";
import { POSITIVE_USERS, NEGATIVE_USERS } from "../../constants";
import "./RatedUserList.css";

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
    <div className="rated-user-list">
      <div className="rated-user-list__positive-list">
        <Title level="h2" text={POSITIVE_USERS} />
        <List>
          <ItemsList
            showRating={true}
            showDeleteBtn={true}
            users={positiveUsers}
            itemClassName="rated-user-list__item"
          />
        </List>
      </div>
      <Divider orientation="vertical" />
      <div className="rated-user-list__negative-list">
        <Title level="h2" text={NEGATIVE_USERS} />
        <List>
          <ItemsList
            showRating={true}
            showDeleteBtn={true}
            users={negativeUsers}
            itemClassName="rated-user-list__item"
          />
        </List>
      </div>
    </div>
  );
};
