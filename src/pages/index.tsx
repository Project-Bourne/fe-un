/**
 * @file index.tsx
 * @description Main entry page that automatically redirects to the chat page.
 */

import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Home component that redirects to the chat page.
 *
 * @returns {JSX.Element} A loading indicator while redirecting.
 */
const Home = (): JSX.Element => {
  const router = useRouter();

  // Redirect to the chat page upon component mount
  useEffect(() => {
    router.replace("/chats");
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>
  );
};

export default Home;
