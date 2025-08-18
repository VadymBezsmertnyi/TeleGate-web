import React, { FunctionComponent, useMemo } from "react";
import { Trans } from "@lingui/react";
import Link from "next/link";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

// components
import LanguageSelect from "../LanguageSelect/LanguageSelect";

// constants
import { PATHS } from "@/providers/paths.constants";

// styles
import styles from "./Header.module.css";
import { NAME_APP } from "@/constants";

type HeaderProps = {
  isShowMenu?: boolean;
};

export const Header: FunctionComponent<HeaderProps> = ({
  isShowMenu = true,
}) => {
  const router = useRouter();
  const { i18n } = useLocalesProvider();

  return (
    <Box className={styles.container}>
      <Box
        className={styles.containerLogo}
        onClick={() => {
          router.push(PATHS.main);
        }}
      >
        <Image
          src={"/adaptive-logo.png"}
          alt={i18n._("Logo")}
          width={50}
          height={50}
        />
        <Typography component={"p"} className={styles.titleLogo}>
          {NAME_APP}
        </Typography>
      </Box>
      {isShowMenu ? (
        <Box className={styles.listMenu}>
          <Link href={PATHS.main} className={styles.menuElement}>
            <Trans id="Home" />
          </Link>
          <Link href={PATHS.termOfUse} className={styles.menuElement}>
            <Trans id="Term of use" />
          </Link>
          <Link href={PATHS.privacyPolicy} className={styles.menuElement}>
            <Trans id="Privacy policy" />
          </Link>
        </Box>
      ) : (
        <Box />
      )}
      <Box className={styles.containerLeft}>
        <LanguageSelect />
      </Box>
    </Box>
  );
};
