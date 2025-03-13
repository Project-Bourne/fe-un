/**
 * Utility to handle MiroTalk P2P API interactions
 */

// MiroTalk configuration
const MIROTALK_API_URL =
  process.env.NEXT_PUBLIC_MIROTALK_API_URL ||
  "http://192.168.17.200:8856/api/v1";
const MIROTALK_URL =
  process.env.NEXT_PUBLIC_MIROTALK_URL || "http://192.168.17.200:8856";
const API_KEY_SECRET =
  process.env.NEXT_PUBLIC_MIROTALK_API_KEY || "mirotalkp2p_default_secret";

/**
 * Creates a new MiroTalk meeting room
 * @returns {Promise<string>} The meeting room URL
 */
export const createMiroTalkMeeting = async (): Promise<string> => {
  try {
    const response = await fetch(`${MIROTALK_API_URL}/meeting`, {
      method: "POST",
      headers: {
        authorization: API_KEY_SECRET,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.error) {
      console.error("Error creating MiroTalk meeting:", data.error);
      throw new Error(data.error);
    }

    return data.meeting;
  } catch (error) {
    console.error("Error creating MiroTalk meeting:", error);
    throw error;
  }
};

/**
 * Gets all active MiroTalk meetings
 * @returns {Promise<any>} List of active meetings
 */
export const getMiroTalkMeetings = async (): Promise<any> => {
  try {
    const response = await fetch(`${MIROTALK_API_URL}/meetings`, {
      method: "GET",
      headers: {
        authorization: API_KEY_SECRET,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.error) {
      console.error("Error getting MiroTalk meetings:", data.error);
      throw new Error(data.error);
    }

    return data.meetings;
  } catch (error) {
    console.error("Error getting MiroTalk meetings:", error);
    throw error;
  }
};

/**
 * Join a MiroTalk meeting using the roomId
 * @param {string} roomId - The meeting room ID to join
 * @param {string} name - The display name of the user
 * @returns {string} The full URL to join the meeting
 */
export const getMiroTalkMeetingUrl = (
  roomId: string,
  name: string = "",
): string => {
  const encodedName = encodeURIComponent(name);

  // Remove trailing slashes from the base URL to prevent double slashes
  const baseUrl = MIROTALK_URL.replace(/\/+$/, "");

  // Ensure the roomId doesn't have any leading slashes
  const cleanRoomId = roomId.replace(/^\/+/, "");

  // Construct the URL with proper slash handling
  return `${baseUrl}/join/${cleanRoomId}${name ? "?name=" + encodedName : ""}`;
};

/**
 * Format a MiroTalk meeting room ID to make it more readable
 * @param {string} roomId - The meeting room ID
 * @returns {string} Formatted meeting room ID
 */
export const formatRoomId = (roomId: string): string => {
  // If the roomId is a full URL, extract just the ID part
  if (roomId.includes("/")) {
    roomId = roomId.split("/").pop() || roomId;
  }
  // Clean any remaining slashes
  return roomId.replace(/^\/+|\/+$/g, "");
};
