import React, { FunctionComponent, useMemo, useState } from "react";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

// types
import { Language } from "@/localization/localization.types";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";
import { useUserProvider } from "@/providers/UserProvider/UserProvider";

// components
import ModalWindow from "../ModalWindow/ModalWindow";

// constants
import { languages } from "@/localization/localization.const";

// styles
import styles from "./LanguageSelect.styles";

const LanguageSelect: FunctionComponent = () => {
  const { i18n, language, setLanguage } = useLocalesProvider();
  const { userData, editUser } = useUserProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const titleLanguage = useMemo(
    () =>
      languages
        .find((languageItem) => languageItem.key === language)
        ?.title.slice(0, 2) || languages[0].title.slice(0, 2),
    [language]
  );
  const unicodeFlagIcon = useMemo(
    () =>
      languages.find((languageItem) => languageItem.key === language)?.flag ||
      languages[0].flag,
    [language]
  );

  const onSelectLanguage = async (newLanguage: Language) => {
    await setLanguage(newLanguage);
    if (userData) await editUser({ ...userData, languageLocal: newLanguage });
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
        sx={styles.container}
      >
        <Box>{getUnicodeFlagIcon(unicodeFlagIcon)}</Box>
        <Typography>{titleLanguage}</Typography>
      </Button>
      <ModalWindow
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <Box sx={styles.containerModal}>
          <Box sx={styles.containerTitleModal}>
            <Typography variant="h6">{i18n._("Select language")}</Typography>
          </Box>
          <Box>
            {languages.map((languageItem) => (
              <Button
                key={languageItem.key}
                onClick={() => {
                  onSelectLanguage(languageItem.key);
                }}
                sx={styles.buttonModal}
              >
                <Box sx={styles.titlesButtonModal}>
                  {getUnicodeFlagIcon(languageItem.flag)}
                  <Typography>{languageItem.title}</Typography>
                </Box>
                <Checkbox checked={language === languageItem.key} />
              </Button>
            ))}
          </Box>
        </Box>
      </ModalWindow>
    </>
  );
};

export default LanguageSelect;
