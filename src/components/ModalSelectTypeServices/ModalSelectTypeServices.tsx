import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

// components
import ModalWindow from "../ModalWindow/ModalWindow";

// styles
import styles from "./ModalSelectTypeServices.styles";
import { useWorkshopsProviderState } from "@/providers/WorkshopsProvider/useWorkshopsProvider.constants";

type ModalSelectTypeServicesProps = {
  isOpen: boolean;
  typeWorkshops: {
    moto: boolean;
    auto: boolean;
  };
  values?: {
    moto: number[];
    auto: number[];
  };
  onClose: () => void;
  onSubmit: (values: { moto: number[]; auto: number[] }) => void;
};

const ModalSelectTypeServices: FunctionComponent<
  ModalSelectTypeServicesProps
> = ({ isOpen, typeWorkshops, values, onClose, onSubmit }) => {
  const { i18n, language } = useLocalesProvider();
  const { typesWorkServices } = useWorkshopsProviderState();
  const [typeServices, setTypeServices] = useState<{
    moto: number[];
    auto: number[];
  }>({
    moto: [],
    auto: [],
  });

  const isSelect = useMemo(() => {
    if (typeWorkshops.moto && typeWorkshops.auto)
      return typeServices.moto.length > 0 && typeServices.auto.length > 0;
    if (typeWorkshops.moto) return typeServices.moto.length > 0;
    if (typeWorkshops.auto) return typeServices.auto.length > 0;
    return false;
  }, [typeWorkshops, typeServices]);

  const onClickSave = () => {
    if (!isSelect) return;
    onSubmit(typeServices);
  };

  useEffect(() => {
    if (values) setTypeServices(values);
  }, [values]);

  return (
    <ModalWindow open={isOpen} onClose={onClose}>
      <Box sx={styles.container}>
        <Typography variant="h6">{i18n._("Moto")}</Typography>
        {typeWorkshops.moto && (
          <Box sx={styles.containerServices}>
            {typesWorkServices.moto.map((item) => (
              <Box key={item.id} sx={styles.item}>
                <Checkbox
                  checked={typeServices.moto.includes(item.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTypeServices({
                        ...typeServices,
                        moto: [...typeServices.moto, item.id],
                      });
                    } else {
                      setTypeServices({
                        ...typeServices,
                        moto: typeServices.moto.filter((id) => id !== item.id),
                      });
                    }
                  }}
                />
                <Typography>{item.title}</Typography>
              </Box>
            ))}
          </Box>
        )}
        <Typography variant="h6">{i18n._("Auto")}</Typography>
        {typeWorkshops.auto && (
          <Box sx={styles.containerServices}>
            {typesWorkServices.auto.map((item) => (
              <Box key={item.id} sx={styles.item}>
                <Checkbox
                  checked={typeServices.auto.includes(item.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTypeServices({
                        ...typeServices,
                        auto: [...typeServices.auto, item.id],
                      });
                    } else {
                      setTypeServices({
                        ...typeServices,
                        auto: typeServices.auto.filter((id) => id !== item.id),
                      });
                    }
                  }}
                />
                <Typography>{item.title}</Typography>
              </Box>
            ))}
          </Box>
        )}
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

export default ModalSelectTypeServices;
