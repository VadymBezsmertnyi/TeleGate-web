import { FunctionComponent } from "react";

// components
import ProfileEvents from "@/screens/ProfileEvents/ProfileEvents";
import LayoutProfile from "@/components/LayoutProfile/LayoutProfile";

const ProfileEventsScreen: FunctionComponent = () => {
  return (
    <LayoutProfile>
      <ProfileEvents />
    </LayoutProfile>
  );
};

export default ProfileEventsScreen;
