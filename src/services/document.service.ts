import { request } from "../hooks/api";

class DocumentService {
  /**
   * Create a new workspace.
   * @param {Object} docData - The data of the new workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async createDocument(docData) {
    try {
      const response = await request(
        "doc/add",
        "POST",
        docData,
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllDocuments(userId) {
    try {
      const response = await request("", "GET", true, false, false);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getDoc(id) {
    try {
      const response = await request(`doc/${id}`, "GET", true, false, false);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates the content of an existing document without creating a new version.
   * This method sends a PATCH request to update the document's content while preserving its version history.
   *
   * @param {string} documentId - The unique identifier of the document.
   * @param {string} newContent - The new content to update in the document.
   * @param {Record<string, string>} headers - An object containing request headers, such as authentication tokens.
   * @returns {Promise<any>} A promise that resolves to the updated document object.
   * @throws {Error} Throws an error if the network request fails or if the server returns a non-OK status.
   */
  static async updateDocContent(
    documentId: string,
    newContent: string,
    headers: Record<string, string>,
  ): Promise<any> {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_API_URL || ""; // Base URL for the API
    const url = `${baseUrl}/documents/${documentId}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          data: {
            ops: [{ insert: newContent }],
          },
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

// Export the Service class.
export default DocumentService;
