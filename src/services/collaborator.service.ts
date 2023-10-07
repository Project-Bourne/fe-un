import { request } from "../hooks/api";

class CollabService {
  /**
   * Create a new workspace.
   * @param {Object} workspaceData - The data of the new workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async createWorkspace(workspaceData) {
    try {
      const response = await request(
        "space/create-space",
        "POST",
        workspaceData,
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a workspace by its ID.
   * @param {string} workspaceId - The ID of the workspace to delete.
   * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
   */

  async deleteWorkspace(workspaceId) {
    try {
      await request(
        `/workspaces/${workspaceId}`,
        "DELETE",
        {},
        true,
        false,
        false,
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a workspace by its ID.
   * @param {string} workspaceId - The ID of the workspace to update.
   * @param {Object} updatedData - The updated data of the workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */
  async updateWorkspace(workspaceId, updatedData) {
    try {
      const response = await request(
        `/space/${workspaceId}`,
        "PATCH",
        updatedData,
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Update a workspace by its ID.
   * @param {string} workspaceId - The ID of the workspace to update.
   * @returns {Promise<Object>} - The response data from the server.
   */
  async getWorspaceById(workspaceId) {
    try {
      const response = await request(
        `collab/${workspaceId}/collabs`,
        "GET",
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Get a workspace by its ID.
   * @param {string} workspaceId - The ID of the workspace to get.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async getWorkspace() {
    try {
      const response = await request(
        `space/spaces/`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // http://localhost:3080/api/v1/space/3847b0b0-33d5-4f57-bd37-c02b39978b2c/collabs

  static async getSpaceCollab(id) {
    try {
      const response = await request(
        `space/${id}/collabs`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new Collab.
   * @param {Object} collabData - The data of the new workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async createCollab(collabData) {
    try {
      const response = await request(
        "collab/add",
        "POST",
        collabData,
        true,
        false,
        false,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Export the Service class.
export default CollabService;
