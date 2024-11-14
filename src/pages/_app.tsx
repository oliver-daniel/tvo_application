import type { AppProps } from "next/app";

import "@/styles/_index.scss";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Oliver Daniel Take-Home Assignment</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
