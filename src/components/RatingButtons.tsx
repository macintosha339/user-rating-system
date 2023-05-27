import React from "react";
import { ButtonGroup, Button } from "@mui/material";

interface RatingButtonsProps {
  onIncrement: () => void;
  onDecrement: () => void;
}

const RatingButtons: React.FC<RatingButtonsProps> = ({
  onIncrement,
  onDecrement,
}) => {
  return (
    <div>
      <ButtonGroup>
        <Button onClick={onIncrement}>+</Button>
        <Button onClick={onDecrement}>-</Button>
      </ButtonGroup>
    </div>
  );
};

export default RatingButtons;