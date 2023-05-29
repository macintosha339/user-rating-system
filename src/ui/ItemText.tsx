import React from "react";
import { ListItemText } from "@mui/material";

interface ItemTextProps {
    first_name: string;
    last_name: string;
    username: string;
    country: string;
  }

const ItemText: React.FC<ItemTextProps> = ({ first_name, last_name, username, country }) => {
  return (
    <ListItemText
      primary={`${first_name} ${last_name}`}
      secondary={`Username: ${username}, Country: ${country}`}
    />
  );
};

export default ItemText;
