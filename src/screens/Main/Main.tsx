import React from "react";
import Head from "next/head";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Apple, Android } from "@mui/icons-material";

import { useLocalesProvider } from "@/localization/localization.provider";

export default function Main() {
  const { i18n } = useLocalesProvider();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const appStoreUrl = "https://apps.apple.com/us/app/telegate/id1234567890";
  const googlePlayUrl =
    "https://play.google.com/store/apps/details?id=com.telegate.app&hl=uk";

  return (
    <>
      <Head>
        <title>TeleGate – Telegram Bot Management Platform</title>
        <meta
          name="description"
          content="TeleGate helps you manage Telegram bots, groups, and messaging with powerful automation tools."
        />
        <meta
          property="og:title"
          content="TeleGate – Telegram Bot Management Platform"
        />
        <meta
          property="og:description"
          content="TeleGate helps you manage Telegram bots, groups, and messaging with powerful automation tools."
        />
        <meta property="og:image" content="/telegate-adaptive-icon.png" />
        <meta property="og:url" content="https://telegate.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="TeleGate – Telegram Bot Management Platform"
        />
        <meta
          name="twitter:description"
          content="TeleGate helps you manage Telegram bots, groups, and messaging with powerful automation tools."
        />
        <meta name="twitter:image" content="/telegate-adaptive-icon.png" />
      </Head>

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0088cc 0%, #229ED9 50%, #0088cc 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isMobile ? 2 : 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              textAlign: "center",
              color: "white",
              mb: 6,
            }}
          >
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                background: "linear-gradient(45deg, #ffffff, #f0f0f0)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {i18n._("TeleGate")}
            </Typography>

            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                mb: 3,
                fontWeight: 300,
                opacity: 0.9,
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {i18n._("Telegram Bot Management Platform")}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                maxWidth: 600,
                mx: "auto",
                opacity: 0.8,
                lineHeight: 1.6,
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              {i18n._(
                "TeleGate helps you manage Telegram bots, groups, and messaging with powerful automation tools."
              )}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Apple />}
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: "rgba(255, 255, 255, 0.9)",
                color: "#000",
                px: 4,
                py: 2,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1.1rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 1)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {i18n._("Download on App Store")}
            </Button>

            <Button
              variant="contained"
              size="large"
              startIcon={<Android />}
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: "rgba(255, 255, 255, 0.9)",
                color: "#000",
                px: 4,
                py: 2,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1.1rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                "&:hover": {
                  background: "rgba(255, 255, 255, 1)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {i18n._("Get it on Google Play")}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
