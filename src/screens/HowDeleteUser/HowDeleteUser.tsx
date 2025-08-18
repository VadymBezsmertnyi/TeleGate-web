import React, { FunctionComponent } from "react";

// providers
import { useLocalesProvider } from "@/localization/localization.provider";

// constants
import { NAME_APP } from "@/constants";

// styles
import styles from "./HowDeleteUser.module.css";

const HowDeleteUser: FunctionComponent = () => {
  const { i18n } = useLocalesProvider();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{i18n._("How to delete personal data?")}</h2>
      <p className={styles.subTitle}>
        {i18n._(
          'If you wish to have your personal data deleted from the {NAME_APP} mobile application and website, you need to access the application, proceed to your profile, then go to the profile settings. At the top left corner, you will find the "Delete" button. After pressing it, your account will be deleted along with all your publications. Then, you will be redirected to the "Welcome" page where you can register again.',
          { NAME_APP }
        )}
      </p>
      <p className={styles.subTitle}>
        {i18n._(
          "All user data is being deleted. The following data will be erased:"
        )}
      </p>
      <p className={styles.subTitle}>
        -{i18n._("Google authorization (email, first name, last name, etc.)")}
      </p>
      <p className={styles.subTitle}>
        -
        {i18n._(
          "Meta (Facebook) authorization (email, first name, last name, etc.)"
        )}
      </p>
      <p className={styles.subTitle}>
        -{i18n._("Apple authorization (email, first name, last name, etc.)")}
      </p>
      <p className={styles.subTitle}>
        -{i18n._("All user posts, announcements, workshops, etc")}
      </p>
    </div>
  );
};

export default HowDeleteUser;
