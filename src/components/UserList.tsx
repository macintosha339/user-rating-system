import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import RatingButtons from "./RatingButtons";

interface UserListProps {
  users: User[];
}

interface User {
  id: number;
  name: string;
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      <Typography variant="h2">User List</Typography>
      <List>
        {users.map((user) => (
          <>
            <ListItem key={user.id}>
              <ListItemText primary={user.name} />
            </ListItem>
            <RatingButtons onIncrement={() => {}} onDecrement={() => {}} />
          </>
        ))}
      </List>
    </div>
  );
};

export default UserList;
