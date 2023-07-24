import React from "react";
import { Header, NavBar } from "@/components/layouts";
import { AppLayout } from "@/layout/index";
import "../styles/global.css";

function App({ Component, pageProps, ...appProps }) {
  const isLayoutNeeded = appProps.router.pathname.includes("/auth");

  const LayoutWrapper = !isLayoutNeeded ? AppLayout : React.Fragment;

  return (
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  );
}

export default App;
