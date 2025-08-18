import React, { FunctionComponent } from "react";
import { Box } from "@mui/material";

// components
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";

// styles
import styles from "./LayoutProfile.styles";

type LayoutProfileProps = {
  children: React.ReactNode;
};

const LayoutProfile: FunctionComponent<LayoutProfileProps> = ({ children }) => (
  <Box sx={styles.container}>
    <ProfileMenu />
    {children}
  </Box>
);

export default LayoutProfile;
