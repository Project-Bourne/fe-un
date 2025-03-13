/**
 * Utility to handle Jitsi script loading
 */

let jitsiPromise: Promise<void> | null = null;

/**
 * Loads the Jitsi external API script
 * @returns Promise that resolves when the script is loaded
 */
export const loadJitsiScript = (): Promise<void> => {
  if (jitsiPromise) {
    return jitsiPromise;
  }

  jitsiPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Cannot load Jitsi script in server-side context"));
      return;
    }

    // Check if script is already loaded
    if (window.JitsiMeetExternalAPI) {
      console.log("Jitsi script already loaded");
      resolve();
      return;
    }

    // Create script element for loading Jitsi
    const script = document.createElement("script");

    // Configure proper URL for Jitsi script
    const jitsiUrl = process.env.NEXT_PUBLIC_JITSI_URL || "localhost";
    const jitsiPort = process.env.NEXT_PUBLIC_JITSI_PORT || "8443";

    script.src = `http://${jitsiUrl}:${jitsiPort}/external_api.js`;
    console.log(`Loading Jitsi from: ${script.src}`);

    script.async = true;
    script.onload = () => {
      console.log("Jitsi script loaded successfully");
      resolve();
    };
    script.onerror = (e) => {
      console.error("Failed to load Jitsi script:", e);
      jitsiPromise = null;
      reject(new Error("Failed to load Jitsi script"));
    };

    document.body.appendChild(script);
  });

  return jitsiPromise;
};

// Add type definition for the Jitsi API
declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}
