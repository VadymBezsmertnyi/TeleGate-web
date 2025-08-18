import React, { FunctionComponent, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

// constants
import {
  PROFILE_MENU_TAB_EVENTS,
  PROFILE_MENU_TAB_PRODUCTS,
  PROFILE_MENU_TAB_USER,
  PROFILE_MENU_TAB_WORKSHOPS,
  PROFILE_MENU_TABS,
} from "../LayoutProfile/LayoutProfile.constants";

// styles
import styles from "./ProfileMenu.styles";
import { PATHS } from "@/providers/paths.constants";

const ProfileMenu: FunctionComponent = () => {
  const { i18n } = useLocalesProvider();
  const router = useRouter();

  const selectedTab = useMemo(() => {
    if (router.pathname === PATHS.profile) return PROFILE_MENU_TAB_USER;
    return PROFILE_MENU_TABS.find((tab) =>
      router.pathname.includes(tab.toLocaleLowerCase())
    );
  }, [router.pathname]);

  const getTitle = (tab: (typeof PROFILE_MENU_TABS)[number]) => {
    if (tab === PROFILE_MENU_TAB_USER) return i18n._("Profile");
    if (tab === PROFILE_MENU_TAB_WORKSHOPS) return i18n._("Workshops");
    if (tab === PROFILE_MENU_TAB_EVENTS) return i18n._("Events");
    if (tab === PROFILE_MENU_TAB_PRODUCTS) return i18n._("Products");
    return tab;
  };

  const handleTabClick = (tab: (typeof PROFILE_MENU_TABS)[number]) => {
    if (tab === PROFILE_MENU_TAB_USER) router.push(PATHS.profile);
    else router.push(`${PATHS.profile}/${tab.toLocaleLowerCase()}`);
  };

  return (
    <Box sx={styles.container}>
      {PROFILE_MENU_TABS.map((tab) => (
        <Button
          key={`menu-tab-${tab}`}
          onClick={() => handleTabClick(tab)}
          sx={{
            color: tab === selectedTab ? "primary.main" : "inherit",
          }}
        >
          {getTitle(tab)}
        </Button>
      ))}
    </Box>
  );
};

export default ProfileMenu;
