import React, { useState } from "react";
import User from "../../interfaces/user";
import { ListItem, ButtonGroup } from "@mui/material";
import AvatarUI from "../../ui/Avatar";
import ItemText from "../../ui/ItemText";
import { useRateUser } from "../../hooks/useRateUser";
import { useRemoveFromRatedToUserList } from "../../hooks/useRemoveUser";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface ItemsListProps {
  users: User[];
  itemClassName: string;
  showRating?: boolean;
  showDeleteBtn?: boolean;
}

export const ItemsList: React.FC<ItemsListProps> = ({
  users,
  itemClassName,
  showRating,
  showDeleteBtn,
}) => {
  const { incrementRatingUser, decrementRatingUser } = useRateUser();
  const deleteUser = useRemoveFromRatedToUserList();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleRemoveUser = (user: User) => {
    setSelectedUser(user);
    console.log(selectedUser);
    setIsDialogOpen(true);
  };

  const dialog = () => (
    <Dialog open={isDialogOpen} onClose={handleCancelDelete}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        {selectedUser && selectedUser.rating === -4 && (
          <DialogContentText>
            Пора забанить {selectedUser.username}. Сделать это?
          </DialogContentText>
        )}
        {selectedUser && selectedUser.rating === 4 && (
          <DialogContentText>
            Нужно вознаградить {selectedUser.username}. Сделать это?
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete}>Отмена</Button>
        <Button onClick={handleConfirmDelete}>Да</Button>
      </DialogActions>
    </Dialog>
  );

  const handleConfirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser);
    }
    setIsDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
    {users.length === 0 ? (
      <p>Список пользователей пуст.</p>
    ) : (
      users.map((user: User) => (
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
            {showRating && <span>Rate: {user.rating}</span>}
          </ListItem>
          <ButtonGroup>
            <Button
              onClick={() => {
                if (user.rating < 5) {
                  incrementRatingUser(user);
                  if(user.rating === 4) handleRemoveUser(user);
                }
              }}
            >
              +
            </Button>
            <Button
              onClick={() => {
                if (user.rating > -5) {
                  decrementRatingUser(user);
                  if(user.rating === -4) handleRemoveUser(user);
                }
              }}
            >
              -
            </Button>
          </ButtonGroup>
          {user.rating === 0 && showDeleteBtn && (
            <Button
              onClick={() => {
                deleteUser(user);
              }}
            >
              Удалить
            </Button>
          )}
          {dialog()}
        </>
      ))
    )}
    </>
  );
};
