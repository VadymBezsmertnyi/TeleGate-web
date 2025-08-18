import React, { FunctionComponent } from "react";
import { Dialog } from "@mui/material";

type ModalWindowProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const ModalWindow: FunctionComponent<ModalWindowProps> = ({
  children,
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
};

export default ModalWindow;
