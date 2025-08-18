import React, { FunctionComponent } from "react";

// providers
import LocalesProvider from "@/localization/localization.provider";

// components
import { Header } from "../Header/Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <LocalesProvider>
      <>
        <Header />
        <main>{children}</main>
      </>
    </LocalesProvider>
  );
};

export default Layout;
