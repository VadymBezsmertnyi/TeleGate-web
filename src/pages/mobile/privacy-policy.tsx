import { PrivacyPolicy } from "@/screens/PrivacyPolicy/PrivacyPolicy";

// types
import { NextPageWithLayout } from "../_app";

// components
import LayoutMobile from "@/components/LayoutMobile/LayoutMobile";

export default PrivacyPolicy;

(PrivacyPolicy as NextPageWithLayout).getLayout = function getLayout(page) {
  return <LayoutMobile>{page}</LayoutMobile>;
};
