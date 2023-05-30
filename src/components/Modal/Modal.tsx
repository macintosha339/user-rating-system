import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import User from "../../interfaces/user";
import { CANCEL, CONFIRM_DELETE, MAKE_IT, NEED_REWARD, TIME_TO_BAN, YES } from "../../constants";

interface ModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  user: User | null;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  user,
}) => {
  const getTitleText = () => {
    if (user && user.rating === -4) {
      return `${TIME_TO_BAN}${user.username}. ${MAKE_IT}`;
    }
    if (user && user.rating === 4) {
      return `${NEED_REWARD}${user.username}. ${MAKE_IT}`;
    }
    return "";
  };

  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>{CONFIRM_DELETE}</DialogTitle>
      <DialogContent>
        {user && <DialogContentText>{getTitleText()}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{CANCEL}</Button>
        <Button onClick={onConfirm}>{YES}</Button>
      </DialogActions>
    </Dialog>
  );
};