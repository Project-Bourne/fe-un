import React, { ReactNode } from "react";
import styles from "./style.module.css";
import { Header, NavBar } from "@/components/layouts";

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * AppLayout component that provides the main application layout structure
 * Includes the navigation bar, header, and main content area
 *
 * @param {ReactNode} children - The content to be rendered within the layout
 * @returns {JSX.Element} The rendered layout component
 */
function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <div className={styles.appLayout}>
      {/* Navigation sidebar */}
      <NavBar />

      {/* Main content area */}
      <div className={styles.mainContent}>
        {/* Top header bar */}
        <Header />

        {/* Main content wrapper */}
        <main className={styles.childrenWrapper}>{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
