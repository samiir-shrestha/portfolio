import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PageTracker } from "@/components/PageTracker";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageTracker />
      <Component {...pageProps} />
    </>
  );
}
