import { FunctionComponent } from "react";

// components
import ProfileWorkshops from "@/screens/ProfileWorkshops/ProfileWorkshops";
import LayoutProfile from "@/components/LayoutProfile/LayoutProfile";

const ProfileWorkshopsScreen: FunctionComponent = () => {
  return (
    <LayoutProfile>
      <ProfileWorkshops />
    </LayoutProfile>
  );
};

export default ProfileWorkshopsScreen;
