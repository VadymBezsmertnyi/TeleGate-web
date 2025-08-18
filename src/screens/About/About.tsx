import React, { FunctionComponent } from "react";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

// constants
import { NAME_APP } from "@/constants";

// styles
import styles from "./About.module.css";

const About: FunctionComponent = () => {
  const { i18n } = useLocalesProvider();
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>
        {i18n._("About {NAME_APP}", { NAME_APP })}
      </h1>
      <p className={styles.title}>
        {i18n._(
          `Welcome to {NAME_APP} – your comprehensive Telegram bot management platform! This app is designed to help you efficiently manage Telegram bots, groups, members, and automate messaging workflows.`,
          { NAME_APP }
        )}
      </p>
      <p className={styles.subTitle}>{i18n._(`Key features of the app:`)}</p>
      <ul className={styles.list}>
        <li>
          {i18n._(
            `Bot Management: Create and manage multiple Telegram bots with ease.`
          )}
        </li>
        <li>
          {i18n._(
            `Group Management: Organize and manage Telegram groups and channels.`
          )}
        </li>
        <li>
          {i18n._(
            `Member Management: Track and manage group members with detailed profiles.`
          )}
        </li>
        <li>
          {i18n._(
            `Message Templates: Create and use customizable message templates for automated responses.`
          )}
        </li>
        <li>
          {i18n._(
            `Analytics: Get insights into bot performance and user engagement.`
          )}
        </li>
        <li>
          {i18n._(
            `Push Notifications: Receive real-time notifications for important events.`
          )}
        </li>
      </ul>
      <p className={styles.subTitle}>
        {i18n._(
          `We are constantly working to improve our platform to make Telegram bot management even more efficient and powerful. Your feedback and suggestions help us enhance {NAME_APP} and bring new features to make your bot management experience seamless.`,
          { NAME_APP }
        )}
      </p>
      <p className={styles.subTitle}>
        {i18n._(`Thank you for choosing {NAME_APP}!`, { NAME_APP })}
      </p>
    </div>
  );
};

export default About;
