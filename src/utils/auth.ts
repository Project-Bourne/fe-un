import { Cookies } from "react-cookie";

/**
 * Utility functions for authentication
 */

const cookies = new Cookies();

/**
 * Cleans up authentication state before login
 * Checks if deep-access cookie exists and removes it
 *
 * @returns {void}
 */
export const cleanupBeforeLogin = (): void => {
  if (typeof window === "undefined") return;

  try {
    // Check if deep-access cookie exists
    const deepAccessToken = cookies.get("deep-access");

    if (deepAccessToken) {
      console.log("Found existing deep-access token, removing before login");

      // Remove the deep-access cookie with different path options
      cookies.remove("deep-access", { path: "/" });
      cookies.remove("deep-access", { path: "" });
      cookies.remove("deep-access");

      // Also try to remove uuid cookie if it exists
      if (cookies.get("uuid")) {
        cookies.remove("uuid", { path: "/" });
        cookies.remove("uuid", { path: "" });
        cookies.remove("uuid");
      }

      // Try to remove using document.cookie directly as a fallback
      document.cookie =
        "deep-access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Also try with different domain options if needed
      const domain = window.location.hostname;
      document.cookie = `deep-access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      document.cookie = `uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;

      // Clear localStorage as well
      localStorage.removeItem("persist:root");
      localStorage.removeItem("userInfo");
    }
  } catch (error) {
    console.error("Error cleaning up authentication state:", error);
  }
};

/**
 * Redirects to the login page after cleaning up auth state
 *
 * @returns {void}
 */
export const redirectToLogin = (): void => {
  if (typeof window === "undefined") return;

  try {
    // First cleanup any existing auth state
    cleanupBeforeLogin();

    // Construct login URL with environment variables
    const serverIp = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS || "localhost";
    const irpPort = process.env.NEXT_PUBLIC_IRP_PORT || "3000";
    const loginUrl = `http://${serverIp}:${irpPort}/auth/login`;

    // Redirect to login page
    window.location.replace(loginUrl);
  } catch (error) {
    console.error("Error redirecting to login:", error);
  }
};
