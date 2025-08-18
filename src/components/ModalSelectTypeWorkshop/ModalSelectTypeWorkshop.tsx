import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

// components
import ModalWindow from "../ModalWindow/ModalWindow";

// styles
import styles from "./ModalSelectTypeWorkshop.styles";

type ModalSelectTypeWorkshopProps = {
  isOpen: boolean;
  values?: {
    moto: boolean;
    auto: boolean;
  };
  onClose: () => void;
  onSubmit: (values: { moto: boolean; auto: boolean }) => void;
};

const ModalSelectTypeWorkshop: FunctionComponent<
  ModalSelectTypeWorkshopProps
> = ({ isOpen, values, onClose, onSubmit }) => {
  const { i18n, language } = useLocalesProvider();
  const [typeWorkshops, setTypeWorkshops] = useState({
    moto: false,
    auto: false,
  });
  const isSelect = useMemo(
    () => typeWorkshops.moto || typeWorkshops.auto,
    [typeWorkshops]
  );

  const onClickSave = () => {
    if (!isSelect) return;
    onSubmit(typeWorkshops);
  };

  useEffect(() => {
    if (values) setTypeWorkshops(values);
  }, [values]);

  return (
    <ModalWindow open={isOpen} onClose={onClose}>
      <Box sx={styles.container}>
        <Box>
          <Typography variant="h4">{i18n._("Select type workshop")}</Typography>
          <Box sx={styles.containerButtons}>
            <Button
              variant="contained"
              color={typeWorkshops.moto ? "success" : "info"}
              onClick={() =>
                setTypeWorkshops((prev) => ({
                  ...prev,
                  moto: !prev.moto,
                }))
              }
            >
              {i18n._("Moto")}
            </Button>
            <Button
              variant="contained"
              color={typeWorkshops.auto ? "success" : "info"}
              onClick={() =>
                setTypeWorkshops((prev) => ({
                  ...prev,
                  auto: !prev.auto,
                }))
              }
            >
              {i18n._("Auto")}
            </Button>
          </Box>
        </Box>
        <Button
          disabled={!isSelect}
          variant="contained"
          color="primary"
          onClick={onClickSave}
        >
          {i18n._("Save")}
        </Button>
      </Box>
    </ModalWindow>
  );
};

export default ModalSelectTypeWorkshop;
