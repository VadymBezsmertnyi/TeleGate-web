import React, { FunctionComponent } from "react";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

// constants
import { CONTACT_EMAIL, NAME_APP } from "@/constants";

// styles
import styles from "./TermsOfUse.module.css";

const TermsOfUse: FunctionComponent = () => {
  const { i18n } = useLocalesProvider();

  const line = (subTitle: string, text: string, list: string[] = []) => (
    <>
      {subTitle.length ? <h4 className={styles.subTitle}>{subTitle}</h4> : null}
      {text.length ? (
        <p
          className={
            text.includes("Price: Free")
              ? styles.priceFree
              : text.includes("Price:")
              ? styles.price
              : styles.text
          }
        >
          {text}
        </p>
      ) : null}
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
      <h1 className={styles.mainTitle}>{i18n._("Terms of Use")}</h1>
      <div>
        <p className={styles.text}>
          <strong>{i18n._("Last updated:")}</strong>{" "}
          {i18n._("August {numberDay}, 2025", {
            numberDay: 18,
          })}
        </p>
        <p className={styles.text}>
          {i18n._(
            `"{NAME_APP}" mobile application and web service is developed by Vadym Bezsmertnyi, FOP ("us", "we", or "our"). By accessing or using our mobile application and web services ("Service"), you (the User) agree to abide by and be bound by these Terms of Use. Please read these terms carefully before using the service.`,
            { NAME_APP }
          )}
        </p>
      </div>
      <div>
        {line(
          i18n._("1. Purpose of the Service"),
          i18n._(
            `{NAME_APP} is a Telegram bot management platform designed to help administrators and moderators manage Telegram groups and channels effectively. The service allows users to monitor group members, analyze group activity, manage message templates, send automated messages, and perform various administrative tasks through Telegram bot integration.`,
            { NAME_APP }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`2. Permissions and Usage Restrictions`),
          i18n._(
            `By using {NAME_APP}, you agree to utilize the service solely for its intended purposes. Any misuse of the service, such as reverse-engineering, unauthorized modifications, or illegal activities, is strictly prohibited. Users are responsible for ensuring that their use of the service complies with Telegram's Terms of Service and local laws and regulations. You may not use the service for spam, harassment, or any activities that violate Telegram's policies.`,
            { NAME_APP }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`3. Subscriptions and Payments`),
          i18n._(
            `{NAME_APP} offers a free tier with basic features, and two premium subscription plans (Pro and Ultimate) for advanced functionality. All subscriptions are billed monthly. Payments are processed through the Apple App Store or Google Play, according to their respective policies. Apple and Google may adjust subscription prices depending on your region. Subscriptions renew automatically unless canceled at least 24 hours before the end of the billing period. All payments are non-refundable unless required by applicable law.`,
            {
              NAME_APP,
            }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`4. Subscription Information`),
          i18n._(`The following subscription plans are available:`)
        )}
      </div>
      <div>
        {line(i18n._("Free Plan"), i18n._("Price: Free"), [
          i18n._("Manage 1 group"),
          i18n._("Up to 20 members per group"),
          i18n._("No filters"),
          i18n._("No analytics"),
          i18n._("No bot templates"),
          i18n._("No automation"),
        ])}
      </div>
      <div>
        {line(i18n._("Pro Plan"), i18n._("Price: $5.99 per month"), [
          i18n._("Manage up to 5 groups"),
          i18n._("Up to 100 members per group"),
          i18n._("Available filters"),
          i18n._("Basic analytics (statistics by groups and members)"),
          i18n._("Bot templates (greetings, auto-messages)"),
          i18n._("No automation"),
        ])}
      </div>
      <div>
        {line(i18n._("Ultimate Plan"), i18n._("Price: $11.99 per month"), [
          i18n._("Manage unlimited groups"),
          i18n._("Unlimited members"),
          i18n._("Smart filters (activity, dates, tags, last activity)"),
          i18n._(
            "Full analytics (graphs, growth dynamics, behavioral metrics)"
          ),
          i18n._("Advanced bot scenarios (funnels, reminders, autoprocesses)"),
          i18n._(
            "Automation (planned: auto-kick inactive, reminders, auto-messages)"
          ),
        ])}
      </div>
      <div>
        {line(
          i18n._(`5. Telegram Integration`),
          i18n._(
            `{NAME_APP} integrates with Telegram's API to provide group management functionality. Users must comply with Telegram's Terms of Service and API usage policies. The service requires appropriate Telegram bot permissions to function properly.`,
            { NAME_APP }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`6. Data Management and Privacy`),
          i18n._(
            `The service processes Telegram group data for management purposes. Users are responsible for ensuring they have the necessary permissions to manage the groups they connect to the service. {NAME_APP} is not liable for any data loss or unauthorized access to Telegram groups. Users must comply with Telegram's Terms of Service and API usage policies.`,
            { NAME_APP }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`7. Changes to Terms`),
          i18n._(
            `These Terms of Use may be updated periodically. Any changes will be published within the service, and the effective date will be revised accordingly. Continued use of the service after updates signifies acceptance of the new terms.`
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`8. Limitation of Liability`),
          i18n._(
            `{NAME_APP} and its developers are not responsible for any damages resulting from the use or inability to use the service. This includes issues caused by errors, interruptions, Telegram API limitations, or unauthorized access to data. We are not responsible for illegal use of the application by users.`,
            { NAME_APP }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`9. Prohibited Activities and Content Monitoring`),
          i18n._(
            `We may monitor channels to which the bot is connected. In case of detecting content that violates international norms (drugs, weapons, human trafficking, terrorism, etc.), we may submit a complaint to close the channel, block the user account, and funds will not be refunded. Users are responsible for ensuring that their use of the service complies with all applicable laws and regulations.`,
            { NAME_APP }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`10. Support`),
          i18n._(
            `For assistance with technical issues, subscription questions, or other inquiries, users can contact us at {CONTACT_EMAIL}. Our team strives to address support requests promptly, typically within 48 hours.`,
            { CONTACT_EMAIL }
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`11. Account Deletion`),
          i18n._(
            `If you wish to delete your account, you can do so through the app's settings or by submitting a request via the developer's feedback form at the following link: https://vb-dev.org.ua/#feedback.`
          )
        )}
      </div>
      <div>
        {line(
          i18n._(`12. Apple's Standard Terms`),
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
