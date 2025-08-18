import {
  Box,
  Button,
  Chip,
  ClickAwayListener,
  ListItemButton,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  GoogleLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Settings as SettingsIcon } from "@mui/icons-material";

// types
import { SessionCustomType } from "@/providers/UserProvider/UserProvider.types";

// providers
import { useUserProvider } from "@/providers/UserProvider/UserProvider";
import { useLocalesProvider } from "@/localization/localization.provider";

// components
import Avatar from "../Avatar";
import ModalWindow from "../ModalWindow/ModalWindow";

// constants
import { PATHS } from "@/providers/paths.constants";

// styles
import styles from "./ProfileHeader.styles";

const ProfileHeader: FunctionComponent = () => {
  const router = useRouter();
  const { i18n } = useLocalesProvider();
  const { userData, meUser, signInGoogle, signInApple, exitUser } =
    useUserProvider();
  const session = useSession() as unknown as SessionCustomType;
  const [isShowModal, setIsShowModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onPressToProfile = () => {
    router.push(PATHS.profile);
    setOpenMenu(false);
  };

  const onPressSingOut = () => {
    exitUser();
    signOut();
    setOpenMenu(false);
  };

  const onAutoSignIn = async () => {
    const response = await meUser(true);
    if (!response && session.status === "authenticated" && session.data) {
      if (session.data.provider === "google")
        await signInGoogle(session.data.id_token);
      if (session.data.provider === "apple")
        await signInApple(session.data.id_token);
    }
  };

  const onPressAuthApple = async () => {
    await signIn("apple", { callbackUrl: "/" });
    setIsShowModal(false);
  };

  const onPressAuthGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
    setIsShowModal(false);
  };

  const handleClose = (
    event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent
  ) => {
    if (
      containerRef.current &&
      containerRef.current.contains(event.target as Node)
    ) {
      return;
    }

    setOpenMenu(false);
  };

  useEffect(() => {
    onAutoSignIn();
  }, [session]);

  return (
    <>
      {userData ? (
        <Chip
          ref={containerRef}
          label={<SettingsIcon />}
          avatar={
            <Avatar
              variant="rounded"
              src={userData.avatar?.url}
              sx={styles.avatar}
            />
          }
          onClick={() => {
            setOpenMenu((prevOpen) => !prevOpen);
          }}
        />
      ) : (
        <Button
          onClick={() => {
            setIsShowModal(true);
          }}
        >
          {i18n._("Sign in")}
        </Button>
      )}
      <ModalWindow
        open={isShowModal}
        onClose={() => {
          setIsShowModal(false);
        }}
      >
        <Box sx={styles.containerTitleModal}>
          <Typography component={"h2"}>
            {i18n._("You can sign in using:")}
          </Typography>
        </Box>
        <Box sx={styles.buttonsModal}>
          <GoogleLoginButton onClick={onPressAuthGoogle} />
          <AppleLoginButton onClick={onPressAuthApple} />
        </Box>
        <Button
          onClick={() => {
            setIsShowModal(false);
          }}
        >
          {i18n._("Close")}
        </Button>
      </ModalWindow>
      <ClickAwayListener onClickAway={handleClose}>
        <Popper open={openMenu} anchorEl={containerRef.current}>
          <Paper>
            <ListItemButton onClick={onPressToProfile}>
              {i18n._("Profile")}
            </ListItemButton>
            <ListItemButton onClick={onPressSingOut}>
              {i18n._("Sign out")}
            </ListItemButton>
          </Paper>
        </Popper>
      </ClickAwayListener>
    </>
  );
};

export default ProfileHeader;
