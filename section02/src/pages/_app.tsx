import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import {ReactNode} from "react";
import {NextPage} from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
}

export default function App({
  Component,
  pageProps
}: AppProps & {
  Component: NextPageWithLayout
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <GlobalLayout>
      {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  )
}
