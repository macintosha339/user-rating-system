import React from "react";
import { ListItemAvatar, Avatar } from "@mui/material";

interface AvatarUIProps {
  first_name: string;
  last_name: string;
  avatar: string;
}

const AvatarUI: React.FC<AvatarUIProps> = ({ first_name, last_name, avatar }) => {
  return (
    <ListItemAvatar>
      <Avatar alt={`${first_name} ${last_name}`} src={avatar} />
    </ListItemAvatar>
  );
};

export default AvatarUI;
