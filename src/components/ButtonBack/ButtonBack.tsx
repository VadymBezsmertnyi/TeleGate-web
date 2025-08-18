import React, { FunctionComponent } from "react";
import { Button } from "@mui/material";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

type ButtonBackProps = {
  title?: string;
  onClick: () => void;
};

const ButtonBack: FunctionComponent<ButtonBackProps> = ({ title, onClick }) => {
  const { i18n } = useLocalesProvider();

  return (
    <Button onClick={onClick} variant="contained" color="primary">
      {title || i18n._("Back")}
    </Button>
  );
};

export default ButtonBack;
