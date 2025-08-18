import { FunctionComponent } from "react";

// components
import ProfileProducts from "@/screens/ProfileProducts/ProfileProducts";
import LayoutProfile from "@/components/LayoutProfile/LayoutProfile";

const ProfileProductsScreen: FunctionComponent = () => {
  return (
    <LayoutProfile>
      <ProfileProducts />
    </LayoutProfile>
  );
};

export default ProfileProductsScreen;
