import React, { FunctionComponent } from "react";

// providers
import LocalesProvider from "@/localization/localization.provider";
import ApiProvider from "@/providers/ApiProvider/ApiProvider";
import UserProvider from "@/providers/UserProvider/UserProvider";
import SubscriptionProvider from "@/providers/SubscriptionProvider/SubscriptionProvider";
import BusinessProvider from "@/providers/BusinessProvider/BusinessProvider";
import PlacesProvider from "@/providers/PlacesProvider/PlacesProvider";
import WorkshopsProvider from "@/providers/WorkshopsProvider/WorkshopsProvider";
import LoadingProvider from "@/providers/LoadingProvider/LoadingProvider";
import MapProvider from "@/providers/MapProvider/MapProvider";

// components
import { Header } from "../Header/Header";
import MarketProvider from "@/providers/MarketProvider/MarketProvider";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <LocalesProvider>
      <LoadingProvider>
        <ApiProvider>
          <UserProvider>
            <MapProvider>
              <SubscriptionProvider>
                <BusinessProvider>
                  <PlacesProvider>
                    <WorkshopsProvider>
                      <MarketProvider>
                        <>
                          <Header />
                          <main>{children}</main>
                        </>
                      </MarketProvider>
                    </WorkshopsProvider>
                  </PlacesProvider>
                </BusinessProvider>
              </SubscriptionProvider>
            </MapProvider>
          </UserProvider>
        </ApiProvider>
      </LoadingProvider>
    </LocalesProvider>
  );
};

export default Layout;
