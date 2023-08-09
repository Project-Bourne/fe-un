import React from "react";
import { Header, NavBar } from "@/components/layouts";
import { AppLayout } from "@/layout/index";
import "../styles/global.css";
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps, ...appProps }) {
  const isLayoutNeeded = appProps.router.pathname.includes("/auth");

  const LayoutWrapper = !isLayoutNeeded ? AppLayout : React.Fragment;

  return (
  <Provider store={store}>
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
    <ToastContainer />
  </Provider>
  );
}

export default App;
