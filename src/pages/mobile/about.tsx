import About from "../../screens/About/About";

// types
import { NextPageWithLayout } from "../_app";

// components
import LayoutMobile from "@/components/LayoutMobile/LayoutMobile";

export default About;

(About as NextPageWithLayout).getLayout = function getLayout(page) {
  return <LayoutMobile>{page}</LayoutMobile>;
};
