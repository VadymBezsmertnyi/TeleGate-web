import { Box, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

// styles
import styles from "./HeaderInfoProfile.styles";

type HeaderInfoProfileProps = {
  title: string;
  total: number;
  used: number;
  remaining: number;
};

const HeaderInfoProfile: FunctionComponent<HeaderInfoProfileProps> = ({
  title,
  total,
  used,
  remaining,
}) => {
  const { i18n } = useLocalesProvider();

  return (
    <Box sx={styles.container}>
      <Typography variant="h6">{title}</Typography>
      <Box sx={styles.containerInfo}>
        <Typography>
          {i18n._("Total")}: {total}
        </Typography>
        <Typography>
          {i18n._("Used")}: {used}
        </Typography>
        <Typography>
          {i18n._("Remaining")}: {remaining}
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderInfoProfile;
