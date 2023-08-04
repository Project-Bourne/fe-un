import React from "react";
import { Header, NavBar } from "@/components/layouts";
import { AppLayout } from "@/layout/index";
import "../styles/global.css";
import { Provider } from 'react-redux';
import store from '@/redux/store';

function App({ Component, pageProps, ...appProps }) {
  const isLayoutNeeded = appProps.router.pathname.includes("/auth");

  const LayoutWrapper = !isLayoutNeeded ? AppLayout : React.Fragment;

  return (
  <Provider store={store}>
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  </Provider>
  );
}

export default App;
