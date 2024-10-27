// pages/_app.js
import React from "react"; // Import React library
import Head from "next/head"; // Import Head component from Next.js for managing the document head
import localFont from "next/font/local"; // Import localFont for custom font handling
import { BlueprintProvider } from "../context/BlueprintContext"; // Import BlueprintProvider to manage global blueprint state

import "../styles/globals.css"; // Import global CSS styles

// Load custom fonts using localFont
const geistSans = localFont({
  src: "../fonts/GeistVF.woff", // Path to the font file
  variable: "--font-geist-sans", // CSS variable name for the font
  weight: "100 900", // Weight range for the font
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff", // Path to the font file
  variable: "--font-geist-mono", // CSS variable name for the font
  weight: "100 900", // Weight range for the font
});

// Main application component
function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Add Metadata to <head> */}
      <Head>
        <title>Service Blueprint</title> {/* Page title */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />{" "}
        {/* Responsive viewport settings */}
        <link rel="icon" href="favicon.ico" /> {/* Link to the favicon */}
      </Head>

      {/* Apply the Blueprint Context Provider for global state management */}
      <BlueprintProvider>
        <Component {...pageProps} />{" "}
        {/* Render the current page component with its props */}
      </BlueprintProvider>
    </>
  );
}

export default MyApp; // Export the main application component
