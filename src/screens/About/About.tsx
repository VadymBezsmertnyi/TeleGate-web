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
          `Welcome to {NAME_APP} – your mobile companion for stylists, makeup artists, and other professionals! This app is designed to help you efficiently manage client meetings, take notes, and sync your schedule with your phone's calendar.`,
          { NAME_APP }
        )}
      </p>
      <p className={styles.subTitle}>{i18n._(`Key features of the app:`)}</p>
      <ul className={styles.list}>
        <li>
          {i18n._(
            `Clients and Notes: Easily create and store client profiles, take notes for each meeting.`
          )}
        </li>
        <li>
          {i18n._(
            `Calendar Sync: Your meetings automatically sync with your device's calendar.`
          )}
        </li>
        <li>
          {i18n._(
            `Reminders: Receive notifications for upcoming meetings and send SMS reminders to clients.`
          )}
        </li>
        <li>
          {i18n._(
            `Ease of Use: Intuitive interface for quick access to your data.`
          )}
        </li>
        <li>
          {i18n._(
            `Subscriptions: Access additional features with a subscription, including a free trial period.`
          )}
        </li>
      </ul>
      <p className={styles.subTitle}>
        {i18n._(
          `We are always striving to improve our app to make it even more useful for you. Therefore, we appreciate your feedback and suggestions for enhancement. Together, we can take {NAME_APP} to the next level!`,
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
