import React, { FunctionComponent } from "react";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

// constants
import { NAME_APP, CONTACT_EMAIL } from "@/constants";

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
          `Welcome to {NAME_APP} – your comprehensive Telegram user management platform! This app helps you keep track of users and manage internal subscriptions in your Telegram groups without using external payment services.`,
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
            `User & Subscription Management: Track and manage group members with internal subscription system.`
          )}
        </li>
        <li>
          {i18n._(
            `No External Payments: You decide subscription amounts - we don't handle any transactions.`
          )}
        </li>
        <li>
          {i18n._(
            `User Accounting: Perfect for groups that don't use external payment services.`
          )}
        </li>
        <li className={styles.inDevelopment}>
          {i18n._(
            `Message Templates: Create and use customizable message templates for automated responses. (In Development)`
          )}
        </li>
        <li className={styles.inDevelopment}>
          {i18n._(
            `Analytics: Get insights into bot performance and user engagement. (In Development)`
          )}
        </li>
        <li className={styles.inDevelopment}>
          {i18n._(
            `Push Notifications: Receive real-time notifications for important events. (In Development)`
          )}
        </li>
      </ul>
      <p className={styles.subTitle}>
        {i18n._(
          `We are constantly working to improve our platform to make Telegram user management even more efficient and powerful. Your feedback and suggestions help us enhance {NAME_APP} and bring new features to make your user management experience seamless.`,
          { NAME_APP }
        )}
      </p>
      <p className={styles.subTitle}>
        {i18n._(`Thank you for choosing {NAME_APP}!`, { NAME_APP })}
      </p>

      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>{i18n._("Available Platforms")}</h2>
        <ul className={styles.platformList}>
          <li>{i18n._("iOS (iPhone & iPad)")}</li>
          <li>{i18n._("Android")}</li>
          <li className={styles.inDevelopment}>
            {i18n._("Web Browser (In Development)")}
          </li>
        </ul>
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>
          {i18n._("What makes us special")}
        </h2>
        <ul className={styles.list}>
          <li>
            {i18n._(
              `Internal subscription management - you control all amounts and terms.`
            )}
          </li>
          <li>
            {i18n._(
              `No external payment processing - we don't handle any transactions.`
            )}
          </li>
          <li>
            {i18n._(
              `Perfect for groups that manage subscriptions independently.`
            )}
          </li>
          <li>
            {i18n._(`Comprehensive user tracking and management system.`)}
          </li>
          <li>{i18n._(`Available on iOS and Android devices.`)}</li>
          <li>
            {i18n._(
              `Available in multiple languages for global accessibility.`
            )}
          </li>
        </ul>
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>{i18n._("Contact & Support")}</h2>
        <p className={styles.contactInfo}>
          {i18n._(
            "For support, feedback, or business inquiries, please contact us:"
          )}
        </p>
        <p className={styles.contactEmail}>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.link}>
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>{i18n._("Legal")}</h2>
        <div className={styles.legalLinks}>
          <a href="/privacy-policy" className={styles.legalLink}>
            {i18n._("Privacy Policy")}
          </a>
          <a href="/terms-of-use" className={styles.legalLink}>
            {i18n._("Terms of Use")}
          </a>
        </div>
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>{i18n._("About the Team")}</h2>
        <p className={styles.developerInfo}>
          {i18n._("Developed with ❤️ by our dedicated team")}
        </p>
        <p className={styles.developerNote}>
          {i18n._(
            "We're passionate about creating innovative solutions that make Telegram bot management simple and powerful."
          )}
        </p>
      </div>
    </div>
  );
};

export default About;
