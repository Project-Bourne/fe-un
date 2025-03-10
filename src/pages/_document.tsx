import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

/**
 * Custom Document component for Next.js
 * This component is used to augment the application's HTML and body tags
 *
 * @returns {JSX.Element} The custom document structure
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          src={`http://${process.env.NEXT_PUBLIC_JITSI_URL}:${process.env.NEXT_PUBLIC_JITSI_PORT}/external_api.js`}
          strategy="afterInteractive"
          onLoad={() => {
            console.log("Jitsi script loaded successfully");
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
