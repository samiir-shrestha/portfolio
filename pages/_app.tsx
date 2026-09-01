import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PageTracker } from "@/components/PageTracker";
import AntLoader from "@/components/AntLoader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AntLoader />
      <PageTracker />
      <Component {...pageProps} />
    </>
  );
}

