import React, { useState } from "react";
import User from "../../interfaces/user";
import { ListItem, ButtonGroup, Button } from "@mui/material";
import AvatarUI from "../../ui/Avatar";
import ItemText from "../../ui/ItemText";
import { useRateUser } from "../../hooks/useRateUser";
import { useRemoveFromRatedToUserList } from "../../hooks/useRemoveUser";
import { Modal } from "../Modal/Modal";
import { EMPTY_USER_LIST, RATE, DELETE } from "../../constants";

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
    setIsDialogOpen(true);
  };

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
        <p>{EMPTY_USER_LIST}</p>
      ) : (
        users.map((user: User) => (
          <div key={user.id}>
              <ListItem className={itemClassName}>
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
                {showRating && (
                  <span>
                    {RATE}
                    {user.rating}
                  </span>
                )}
              </ListItem>
              <Modal
                isOpen={isDialogOpen}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                user={selectedUser}
              />
            <ButtonGroup>
            <Button
              onClick={() => {
                if (user.rating < 5) {
                  incrementRatingUser(user);
                  if (user.rating === 4) handleRemoveUser(user);
                }
              }}
            >
              +
            </Button>
            <Button
              onClick={() => {
                if (user.rating > -5) {
                  decrementRatingUser(user);
                  if (user.rating === -4) handleRemoveUser(user);
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
              {DELETE}
            </Button>
          )}
          </div>
        ))
      )}
    </>
  );
};
