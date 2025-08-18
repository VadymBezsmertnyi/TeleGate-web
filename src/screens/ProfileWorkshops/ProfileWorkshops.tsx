import React, { FunctionComponent } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

// providers
import { useSubscriptionProvider } from "@/providers/SubscriptionProvider/SubscriptionProvider";
import { useLocalesProvider } from "@/localization/localization.provider";

// components
import HeaderInfoProfile from "@/components/HeaderInfoProfile/HeaderInfoProfile";

// constants
import { PATHS } from "@/providers/paths.constants";

// styles
import styles from "./ProfileWorkshops.styles";

const ProfileWorkshops: FunctionComponent = () => {
  const router = useRouter();
  const { i18n } = useLocalesProvider();
  const { infoWorkshops } = useSubscriptionProvider();

  return (
    <Box sx={styles.container}>
      <HeaderInfoProfile
        title={i18n._("Workshops")}
        total={infoWorkshops.amountWorkshop + infoWorkshops.useAmountWorkshop}
        used={infoWorkshops.useAmountWorkshop}
        remaining={infoWorkshops.amountWorkshop}
      />
      <Box sx={styles.containerBody}>
        {infoWorkshops.useAmountWorkshop > 0 ? (
          <Box sx={styles.containerList}>
            <Typography variant="h6">{i18n._("Workshops used")}</Typography>
          </Box>
        ) : (
          <Box sx={styles.containerNoWorkshops}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push(PATHS.profileWorkshopsAdd)}
            >
              {i18n._("Create workshop")}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfileWorkshops;
