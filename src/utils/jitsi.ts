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
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://jitsi.deepsoul.pro/external_api.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
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
