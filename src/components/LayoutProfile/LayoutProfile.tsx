import React, { FunctionComponent, useEffect } from "react";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// types
import { SessionCustomType } from "@/providers/UserProvider/UserProvider.types";

// components
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";

// styles
import styles from "./LayoutProfile.styles";

type LayoutProfileProps = {
  children: React.ReactNode;
};

const LayoutProfile: FunctionComponent<LayoutProfileProps> = ({ children }) => {
  const router = useRouter();
  const session = useSession() as unknown as SessionCustomType;

  useEffect(() => {
    if (session.status === "loading") return;
    if (session.status !== "authenticated") router.push("/");
  }, [session]);

  return (
    <Box sx={styles.container}>
      <ProfileMenu />
      {children}
    </Box>
  );
};

export default LayoutProfile;
