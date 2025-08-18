import { FunctionComponent } from "react";

// components
import ProfileWorkshopsAdd from "@/screens/ProfileWorkshopsAdd/ProfileWorkshopsAdd";
import LayoutProfile from "@/components/LayoutProfile/LayoutProfile";

const ProfileWorkshopsScreen: FunctionComponent = () => {
  return (
    <LayoutProfile>
      <ProfileWorkshopsAdd />
    </LayoutProfile>
  );
};

export default ProfileWorkshopsScreen;
