import React, { FunctionComponent } from "react";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

// constants
import { CONTACT_EMAIL, NAME_APP } from "@/constants";

// styles
import styles from "./PrivacyPolicy.module.css";

export const PrivacyPolicy: FunctionComponent = () => {
  const { i18n } = useLocalesProvider();

  const line = (subTitle: string, text: string, list: string[] = []) => (
    <>
      <h4 className={styles.subTitle}>{subTitle}</h4>
      {text.length ? <p className={styles.text}>{text}</p> : null}
      {list.length ? (
        <ul className={styles.list}>
          {list.map((item, index) => (
            <li className={styles.itemList} key={index}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>{i18n._("Privacy Policy")}</h1>
      <div>
        <p className={styles.text}>
          <strong>{i18n._("Last updated:")}</strong>{" "}
          {i18n._("August {numberDay}, 2025", {
            numberDay: 18,
          })}
        </p>
        <p className={styles.text}>
          {i18n._(
            `The "{NAME_APP}" mobile application and web service are developed and operated by Vadym Bezsmertnyi, FOP ("us", "we", or "our"). This Privacy Policy explains how we collect, use, and protect your personal information when you access and use our Telegram bot management platform and services ("Service").`,
            { NAME_APP }
          )}
        </p>
      </div>
      <div>
        <h2 className={styles.title}>{i18n._("Information We Collect")}</h2>
        {line(
          i18n._("Information Collection"),
          i18n._(
            "We collect information to ensure the effective functionality of the {NAME_APP} service. The data collected may include:",
            { NAME_APP }
          ),
          [
            i18n._(
              "Telegram account information: username, user ID, and profile data."
            ),
            i18n._(
              "Group and channel data: information about Telegram groups you manage."
            ),
            i18n._(
              "Member data: information about group members for management purposes."
            ),
            i18n._(
              "Message templates: custom templates you create for automated messaging."
            ),
            i18n._("Analytics data: usage statistics and performance metrics."),
            i18n._(
              "Subscription information: for managing your account and processing payments."
            ),
            i18n._("Device information: for app functionality and security."),
          ]
        )}
        {line(
          i18n._("Use of Information"),
          i18n._(
            "We process your data based on legitimate interests and contractual necessity. The collected data is used to:"
          ),
          [
            i18n._("Provide Telegram group management functionality."),
            i18n._("Analyze group activity and member statistics."),
            i18n._(
              "Send automated messages and notifications through your bot."
            ),
            i18n._("Manage message templates and bot settings."),
            i18n._("Process subscriptions and billing."),
            i18n._("Improve service functionality and user experience."),
          ]
        )}
        {line(
          i18n._("Telegram API Integration"),
          i18n._(
            "Our service integrates with Telegram's API to provide group management features. We only access data that you authorize through Telegram's authentication process. The {NAME_APP} service requires the following permissions:",
            { NAME_APP }
          ),
          [
            i18n._(
              "Read group information: to display group details and member lists."
            ),
            i18n._(
              "Send messages: to deliver automated notifications and templates."
            ),
            i18n._(
              "Manage groups: to perform administrative tasks you authorize."
            ),
            i18n._(
              "Access member data: to provide member management features."
            ),
            i18n._("Analytics data: to provide usage statistics and insights."),
          ]
        )}
      </div>
      <div>
        <h2 className={styles.title}>{i18n._("Data Security")}</h2>
        {line(
          i18n._("Data Security"),
          i18n._(
            "Your data is protected using industry-standard security measures. We implement the following security practices:"
          ),
          [
            "End-to-end encryption for data transmission.",
            "Secure API authentication with Telegram.",
            "Limited access to servers where information is stored.",
            "Regular security updates and monitoring.",
            "Compliance with Telegram's security requirements.",
          ]
        )}
        {line(
          i18n._("Sharing Information with Third Parties"),
          i18n._(
            "We may share your data with third parties in the following cases:"
          ),
          [
            "Telegram API: for service functionality and bot operations.",
            "Payment processors: Apple App Store and Google Play for subscription billing.",
            "Analytics services: for service improvement (anonymized data only).",
            "Legal requirements: when required by law or to protect our rights.",
            "Telegram moderation: for reporting content that violates international norms.",
          ]
        )}
        {line(
          i18n._("International Data Transfers"),
          i18n._(
            "Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws."
          )
        )}
        {line(
          i18n._("Content Monitoring and Prohibited Activities"),
          i18n._(
            "We may monitor channels to which the bot is connected to ensure compliance with international norms and laws. In case of detecting content that violates international standards (drugs, weapons, human trafficking, terrorism, etc.), we may submit complaints to relevant authorities, block user accounts, and take other necessary actions. Funds will not be refunded in such cases. This monitoring is conducted to protect our service and comply with legal obligations."
          )
        )}
        {line(
          i18n._("User Rights"),
          i18n._(
            "To exercise your rights, contact us at {CONTACT_EMAIL}. You have the following rights:",
            {
              CONTACT_EMAIL,
            }
          ),
          [
            i18n._(
              "Access your data: You can review the data we store about you."
            ),
            i18n._(
              "Delete your data: You can request the deletion of your information."
            ),
            i18n._(
              "Revoke Telegram permissions: You can disconnect your Telegram account at any time."
            ),
            i18n._(
              "Export your data: You can request a copy of your data in a portable format."
            ),
            i18n._(
              "Rectify your data: You can request correction of inaccurate personal data."
            ),
            i18n._(
              "Restrict processing: You can request limitation of data processing under certain circumstances."
            ),
          ]
        )}
        {line(
          i18n._("Data Retention"),
          i18n._(
            "We retain your data only as long as necessary to provide our services. Data is automatically deleted when you delete your account or revoke Telegram permissions. Some data may be retained for legal or security purposes as required by law. We comply with applicable data protection laws including GDPR where applicable."
          )
        )}
        {line(
          i18n._("Changes to the Privacy Policy"),
          i18n._(
            "We may update this Privacy Policy periodically. All updates will be published on this page with the updated date.\nWe recommend checking this section regularly to stay informed of any changes. For significant updates, we will notify you via the app or email."
          )
        )}
        {line(
          i18n._("Contact Information"),
          i18n._(
            "If you have questions about this Privacy Policy, contact us at {CONTACT_EMAIL}.",
            { CONTACT_EMAIL }
          )
        )}
      </div>
    </div>
  );
};
