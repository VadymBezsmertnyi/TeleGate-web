import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

// providers
import { SessionProvider } from "next-auth/react";

// components
import Layout from "@/components/Layout/Layout";

// styles
import "../app/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { session } = pageProps;
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <SessionProvider session={session}>
        <Layout>{page}</Layout>
      </SessionProvider>
    ));

  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
