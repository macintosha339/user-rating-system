import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import RatingButtons from "./RatingButtons";

interface RatedUserListProps {
  ratedUsers: RatedUser[];
}

interface RatedUser {
  id: number;
  name: string;
  rating: number;
}

const RatedUserList: React.FC<RatedUserListProps> = ({ ratedUsers }) => {
  return (
    <div>
      <Typography variant="h2">Rated User List</Typography>
      <List>
        {ratedUsers.map((user) => (
        <>
          <ListItem key={user.id}>
            <ListItemText
              primary={`${user.name} (Rating: ${user.rating})`}
            />
          </ListItem>
          <RatingButtons onIncrement={() => {}} onDecrement={() => {}}/>
        </>
        ))}
      </List>
    </div>
  );
};

export default RatedUserList;