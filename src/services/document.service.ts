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
}

// Export the Service class.
export default DocumentService;
