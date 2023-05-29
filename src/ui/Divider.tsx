import React from "react";
import { Divider as MuiDivider } from "@mui/material";

interface DividerProps {
  orientation: "horizontal" | "vertical";
}

const Divider: React.FC<DividerProps> = ({ orientation }) => {
  return <MuiDivider orientation={orientation} />;
};

export default Divider;