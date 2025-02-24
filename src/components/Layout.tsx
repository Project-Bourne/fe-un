/**
 * @file Layout.tsx
 * @description Provides a common layout for the application with a header, main content, and footer.
 */

import React from "react";
import Link from "next/link";

/**
 * Props for Layout component.
 * @typedef {object} LayoutProps
 * @property {React.ReactNode} children - The child components to render within the layout.
 */

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component wraps the page content with a header and footer for uniform styling.
 *
 * @param {LayoutProps} props - Component properties.
 * @returns {JSX.Element} The layout wrapped content.
 */
const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">My Application</h1>
          <nav>
            <Link href="/chats">
              <a className="text-blue-500 hover:underline mx-2">Chats</a>
            </Link>
            <Link href="/documents">
              <a className="text-blue-500 hover:underline mx-2">Documents</a>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6 animate-fadeIn">
        {children}
      </main>
      <footer className="bg-white shadow p-4 text-center text-sm">
        © {new Date().getFullYear()} My Application
      </footer>
    </div>
  );
};

export default Layout;
