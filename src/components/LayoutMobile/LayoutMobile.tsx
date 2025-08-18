import React, { FunctionComponent } from "react";

// providers
import LocalesProvider from "@/localization/localization.provider";

// components
import { Header } from "../Header/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const LayoutMobile: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <LocalesProvider>
      <Header isShowMenu={false} />
      <main>{children}</main>
    </LocalesProvider>
  );
};

export default LayoutMobile;
