import React, { FunctionComponent, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

// providers
import { useUserProvider } from "@/providers/UserProvider/UserProvider";
import { useLocalesProvider } from "@/localization/localization.provider";
import { useSubscriptionProvider } from "@/providers/SubscriptionProvider/SubscriptionProvider";
import { useBusinessProvider } from "@/providers/BusinessProvider/BusinessProvider";

// constants
import { languages } from "@/localization/localization.const";

// styles
import styles from "./Profile.styles";

const Profile: FunctionComponent = () => {
  const { i18n, language } = useLocalesProvider();
  const { userData } = useUserProvider();
  const { businessMarketUser } = useBusinessProvider();
  const { infoBusinessAdverts, infoAdverts, infoSmallEvents, infoWorkshops } =
    useSubscriptionProvider();

  const imageSource = useMemo(
    () =>
      businessMarketUser?.logo
        ? {
            uri: businessMarketUser.logo.url,
            cache: "force-cache",
          }
        : null,
    [businessMarketUser?.logo]
  );
  const titleLanguage = useMemo(
    () =>
      languages.find(
        (languageItem) => languageItem.key === userData?.languageLocal
      )?.title || languages[0].title,
    [userData?.languageLocal]
  );

  if (!userData) return null;
  return (
    <Box sx={styles.container}>
      <Box sx={styles.containerMain}>
        {userData.avatar ? (
          <Image
            src={userData.avatar.url}
            alt="avatar"
            width={200}
            height={200}
            layout="fixed"
          />
        ) : (
          <Box sx={styles.containerNotImage}>
            <Typography variant="h6">{i18n._("No avatar")}</Typography>
          </Box>
        )}
        <Box sx={styles.containerMainInfo}>
          <Typography variant="h6">
            {i18n._("First name")}:{" "}
            {userData.firstName || i18n._("No first name")}
          </Typography>
          <Typography variant="h6">
            {i18n._("Last name")}: {userData.lastName || i18n._("No last name")}
          </Typography>
          <Typography variant="h6">
            {i18n._("Phone number")}:{" "}
            {userData.phoneNumber || i18n._("No phone number")}
          </Typography>
          <Typography variant="h6">
            {i18n._("Email")}: {userData.email}
          </Typography>
          {userData.country_place_id && (
            <Typography variant="h6">
              {i18n._("Country")}:{" "}
              {userData.country_place_id[language].long_name}
            </Typography>
          )}
          {userData.region_place_id && (
            <Typography variant="h6">
              {i18n._("Region")}: {userData.region_place_id[language].long_name}
            </Typography>
          )}
          {userData.place_id && (
            <Typography variant="h6">
              {i18n._("Place")}: {userData.place_id[language].name}
            </Typography>
          )}
          <Typography variant="h6">
            {i18n._("Language")}: {titleLanguage}
          </Typography>
        </Box>
        {businessMarketUser && (
          <Box sx={styles.containerBusiness}>
            <Typography variant="h6">
              {i18n._("Business name")}:{" "}
              {businessMarketUser?.name || i18n._("No business name")}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={styles.containerItems}>
        <Box sx={styles.containerItem}>
          <Typography variant="h6" sx={styles.titleItem}>
            {i18n._("Events used")}: {infoSmallEvents.useAmountSmallEvent} (
            {i18n._("Events available")}:{" "}
            {infoSmallEvents.amountSmallEvent -
              infoSmallEvents.useAmountSmallEvent}
            )
          </Typography>
        </Box>
        <Box sx={styles.containerItem}>
          <Typography variant="h6" sx={styles.titleItem}>
            {i18n._("Workshops used")}: {infoWorkshops.useAmountWorkshop} (
            {i18n._("Workshops available")}:{" "}
            {infoWorkshops.amountWorkshop - infoWorkshops.useAmountWorkshop})
          </Typography>
        </Box>
        <Box sx={styles.containerItem}>
          <Typography variant="h6" sx={styles.titleItem}>
            {i18n._("Products used")}:{" "}
            {infoAdverts.useAmountAdvert +
              infoBusinessAdverts.useAmountBusinessAdvert}{" "}
            ({i18n._("Products available")}:{" "}
            {infoAdverts.amountAdvert +
              infoBusinessAdverts.amountBusinessAdvert -
              infoAdverts.useAmountAdvert -
              infoBusinessAdverts.useAmountBusinessAdvert}
            )
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
