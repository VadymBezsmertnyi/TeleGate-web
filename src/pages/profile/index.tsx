import { FunctionComponent } from "react";

// components
import Profile from "@/screens/Profile/Profile";
import LayoutProfile from "@/components/LayoutProfile/LayoutProfile";

const ProfileScreen: FunctionComponent = () => {
  return (
    <LayoutProfile>
      <Profile />
    </LayoutProfile>
  );
};

export default ProfileScreen;
