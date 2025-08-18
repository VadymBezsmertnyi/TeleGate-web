import React, { FunctionComponent } from "react";
import { Box } from "@mui/material";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";
import { useSubscriptionProvider } from "@/providers/SubscriptionProvider/SubscriptionProvider";

// components
import HeaderInfoProfile from "@/components/HeaderInfoProfile/HeaderInfoProfile";

// styles
import styles from "./ProfileEvents.styles";

const ProfileEvents: FunctionComponent = () => {
  const { i18n } = useLocalesProvider();
  const { infoBigEvents, infoSmallEvents } = useSubscriptionProvider();

  return (
    <Box sx={styles.container}>
      <HeaderInfoProfile
        title={i18n._("Events")}
        total={infoBigEvents.amountBigEvent + infoSmallEvents.amountSmallEvent}
        used={
          infoBigEvents.useAmountBigEvent + infoSmallEvents.useAmountSmallEvent
        }
        remaining={
          infoBigEvents.amountBigEvent +
          infoSmallEvents.amountSmallEvent -
          infoBigEvents.useAmountBigEvent -
          infoSmallEvents.useAmountSmallEvent
        }
      />
      <Box>ProfileEvents</Box>
    </Box>
  );
};

export default ProfileEvents;
