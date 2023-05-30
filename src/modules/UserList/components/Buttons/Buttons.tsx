import React from "react";
import { updateUsers, loadMoreUsers } from "../../store/usersSlice";
import { Button } from "@mui/material";
import { useAction } from "../../hooks/useAction";
import { NEXT_PAGE, UPDATE_LIST } from "../../constants";
import "./Buttons.css";

export const Buttons: React.FC = () => {
  const handleRefresh = useAction({
    action: updateUsers,
  });

  const handleLoadMoreUsers = useAction({
    action: loadMoreUsers,
  });
  return (
    <div className="user-list__buttons">
      <Button variant="contained" color="primary" onClick={handleRefresh}>
        {UPDATE_LIST}
      </Button>
      <Button variant="contained" color="primary" onClick={handleLoadMoreUsers}>
        {NEXT_PAGE}
      </Button>
    </div>
  );
};
