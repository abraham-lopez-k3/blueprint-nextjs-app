// pages/_app.js
import React from "react";
import Head from "next/head";
import localFont from "next/font/local";
import { BlueprintProvider } from "../context/BlueprintContext";

import "../styles/globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Add Metadata to <head> */}
      <Head>
        <title>Service Blueprint</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      {/* Apply the Blueprint Context Provider */}
      <BlueprintProvider>
        <Component {...pageProps} />
      </BlueprintProvider>
    </>
  );
}

export default MyApp;
