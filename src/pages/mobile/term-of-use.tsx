import TermsOfUse from "@/screens/TermsOfUse/TermsOfUse";

// types
import { NextPageWithLayout } from "../_app";

// components
import LayoutMobile from "@/components/LayoutMobile/LayoutMobile";

export default TermsOfUse;

(TermsOfUse as NextPageWithLayout).getLayout = function getLayout(page) {
  return <LayoutMobile>{page}</LayoutMobile>;
};
