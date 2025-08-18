import React, { FunctionComponent } from "react";
import Link from "next/link";
import { Trans } from "@lingui/react";

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
      <h1 className={styles.mainTitle}>
        <Trans id="Privacy Policy" />
      </h1>
      <div>
        <p className={styles.text}>
          <strong>
            <Trans id="Last updated:" />
          </strong>{" "}
          <Trans id="December 7, 2024" />
        </p>
        <p className={styles.text}>
          {i18n._(
            `The "{NAME_APP}" mobile and web applications are developed and operated by Vadym Bezsmertnyi, FOP ("us", "we", or "our"). This Privacy Policy explains how we collect, use, and protect your personal information when you access and use our mobile application and services ("Service").`,
            { NAME_APP }
          )}
        </p>
      </div>
      <div>
        <h2 className={styles.title}>{i18n._("Information We Collect")}</h2>
        {line(
          i18n._("Information Collection"),
          i18n._(
            "We collect information to ensure the effective functionality of the {NAME_APP} app. The data collected may include:",
            { NAME_APP }
          ),
          [
            i18n._("Contacts: to create client records."),
            i18n._("Calendar data: to synchronize appointments and reminders."),
            i18n._(
              "Camera and photo library: to upload client or work photos."
            ),
            i18n._(
              "Push notifications: to remind users about upcoming appointments."
            ),
            i18n._(
              "Personal user information: such as name, email address, and phone number."
            ),
            i18n._(
              "Subscription information: for managing your account and processing payments."
            ),
          ]
        )}
        {line(
          i18n._("Use of Information"),
          i18n._(
            "We do not use your information for unrelated purposes without your consent. The collected data is used to:"
          ),
          [
            i18n._("Create client records and appointments."),
            i18n._("Send SMS reminders to clients."),
            i18n._("Synchronize the calendar for appointment reminders."),
            i18n._(
              "Enable app features such as uploading photos and creating notes."
            ),
            i18n._("Manage subscriptions and process billing."),
          ]
        )}
        {line(
          i18n._("Access to Permissions"),
          i18n._(
            "Permissions are requested only for functions directly related to the app’s operation. The {NAME_APP} app requires access to the following device features:",
            { NAME_APP }
          ),
          [
            i18n._("Contacts: to add clients to the app."),
            i18n._("Calendar: to sync events."),
            i18n._("Camera and photo library: to upload images."),
            i18n._("Push notifications: to send reminders."),
          ]
        )}
      </div>
      <div>
        <h2 className={styles.title}>{i18n._("Data Security")}</h2>
        {line(
          i18n._("Data Security"),
          i18n._(
            "Your data is accessible only to you and is not shared without your consent. We use modern technologies to protect your data:"
          ),
          [
            "Encryption during data transmission.",
            "Limited access to servers where information is stored.",
            "Regular security updates.",
          ]
        )}
        {line(
          i18n._("Sharing Information with Third Parties"),
          i18n._(
            "These third parties have their own privacy policies, and we encourage you to review them. We may share your data with third parties in the following cases:"
          ),
          [
            "For sending SMS through external services (e.g., bulk messaging platforms).",
            "For processing payments via the Apple App Store or Google Play.",
          ]
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
              "Revoke permissions: You can modify app permissions via your device settings."
            ),
          ]
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
