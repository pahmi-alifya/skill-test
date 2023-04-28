import "@/styles/globals.css";
import "moment/locale/id";

import moment from "moment";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";

moment.locale("id");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
