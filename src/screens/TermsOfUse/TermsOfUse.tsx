import React, { FunctionComponent } from "react";
import { Trans } from "@lingui/react";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

// constants
import { CONTACT_EMAIL, NAME_APP } from "@/constants";

// styles
import styles from "./TermsOfUse.module.css";

const TermsOfUse: FunctionComponent = () => {
  const { i18n } = useLocalesProvider();

  const line = (subTitle: string, text: string) => (
    <>
      {subTitle.length ? <h4 className={styles.subTitle}>{subTitle}</h4> : null}
      {text.length ? <p className={styles.text}>{text}</p> : null}
    </>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>
        <Trans id="Terms of Use" />
      </h1>
      <div>
        <p className={styles.text}>
          <strong>
            <Trans id="Last updated:" />
          </strong>{" "}
          {i18n._("April {numberMonth}, 2025", {
            numberMonth: 4,
          })}
        </p>
        <p className={styles.text}>
          {i18n._(
            `"{NAME_APP}" mobile application is developed by Vadym Bezsmertnyi, FOP ("us", "we", or "our"). By accessing or using our mobile application ("Service"), you (the User) agree to abide by and be bound by these Terms of Use. Please read these terms carefully before using the app.`,
            { NAME_APP }
          )}
        </p>
      </div>
      <div>
        {line(
          i18n._("1. Purpose of the Application"),
          i18n._(
            `{NAME_APP} is a mobile application created to help stylists, makeup artists, and other professionals manage their client appointments effectively. The app allows users to create detailed notes for each client meeting, synchronize schedules with their device’s calendar, send SMS reminders to clients, and receive notifications about upcoming appointments.`,
            { NAME_APP }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`2. Permissions and Usage Restrictions`),
          i18n._(
            `By using {NAME_APP}, you agree to utilize the app solely for its intended purposes. Any misuse of the app, such as reverse-engineering, unauthorized modifications, or illegal activities, is strictly prohibited. Users are also responsible for maintaining the confidentiality of their account credentials and ensuring that the app is used in compliance with local laws and regulations.`,
            { NAME_APP }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`3. Subscriptions and Payments`),
          i18n._(
            `{NAME_APP} offers a one-month free trial, after which a subscription is required to access premium features. Payments are processed through the Apple App Store or Google Play, according to their respective policies. Subscriptions renew automatically unless canceled at least 24 hours before the end of the billing period. All payments are non-refundable unless required by applicable law.`,
            {
              NAME_APP,
            }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`4. Subscription Information`),
          i18n._(
            `The following subscriptions are available for use in the app:`
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`- Annual`),
          i18n._(
            `- Subscription name: annual_29_88_12m\n- Duration: 1 year\n- Price: $29.88 per year`
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`- Semi-Annual`),
          i18n._(
            `- Subscription name: semi_annual_17_94_6m\n- Duration: 6 months\n- Price: $17.94 per 6 months`
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`- Monthly`),
          i18n._(
            `- Subscription name: monthly_2_99_1m\n- Duration: 1 month\n- Price: $2.99 per month`
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`5. Notifications and Reminders`),
          i18n._(
            `The app sends notifications and reminders to inform users about upcoming appointments and related updates. By enabling push notifications, users consent to receiving these alerts. It is the user’s responsibility to ensure notifications are active on their device to avoid missing important reminders.`
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`6. Responsibility for Data`),
          i18n._(
            `The app provides tools for managing and storing client data, but users are responsible for entering accurate information and maintaining backups of critical data when necessary. {NAME_APP} is not liable for any data loss due to user error, device failure, or unauthorized access.`,
            { NAME_APP }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`7. Changes to Terms`),
          i18n._(
            `These Terms of Use may be updated periodically. Any changes will be published within the app, and the effective date will be revised accordingly. Continued use of the app after updates signifies acceptance of the new terms.`
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`8. Limitation of Liability`),
          i18n._(
            `{NAME_APP} and its developers are not responsible for any damages resulting from the use or inability to use the app. This includes issues caused by errors, interruptions, third-party integrations, or unauthorized access to data.`,
            { NAME_APP }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`9. Support`),
          i18n._(
            `For assistance with technical issues, subscription questions, or other inquiries, users can contact us at {CONTACT_EMAIL}. Our team strives to address support requests promptly, typically within 48 hours.`,
            { CONTACT_EMAIL }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`10. Account Deletion`),
          i18n._(
            `If you wish to delete your account, you can do so through the app's settings or by submitting a request via the developer's feedback form at the following link: https://vb-dev.org.ua/#feedback.`
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`11. Apple's Standard Terms`),
          i18n._(
            `In addition to these Terms of Use, {NAME_APP} operates under the Apple Standard End User License Agreement (EULA), which can be found at the following link:`,
            { NAME_APP }
          )
        )}
        <a
          href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Apple Standard EULA
        </a>
      </div>
      <div>
        {line(
          i18n._(
            `By using {NAME_APP}, you confirm that you have read and agreed to these Terms of Use.`,
            { NAME_APP }
          ),
          ""
        )}
      </div>
    </div>
  );
};

export default TermsOfUse;
