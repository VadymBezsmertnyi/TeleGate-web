import HowDeleteUser from "@/screens/HowDeleteUser/HowDeleteUser";

// types
import { NextPageWithLayout } from "../_app";

// components
import LayoutMobile from "@/components/LayoutMobile/LayoutMobile";

export default HowDeleteUser;

(HowDeleteUser as NextPageWithLayout).getLayout = function getLayout(page) {
  return <LayoutMobile>{page}</LayoutMobile>;
};
