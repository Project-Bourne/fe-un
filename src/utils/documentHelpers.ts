/**
 * @file documentHelpers.ts
 * @description Provides helper functions for document content extraction.
 */

/**
 * Extracts content from an API response based on the provided route name.
 *
 * @param {string} routeName - The name of the API route (e.g., "translator", "summarizer").
 * @param {any} apiResponse - The API response object.
 * @returns {string} The content extracted from the response.
 * @throws {Error} Throws an error if the routeName is unsupported.
 */
export function extractContent(routeName: string, apiResponse: any): string {
  switch (routeName) {
    case "translator":
      return apiResponse?.data?.textTranslation || "";
    case "summarizer":
      return apiResponse?.data?.summaryArray
        ? apiResponse.data.summaryArray[0].summary
        : "";
    case "factcheck":
    case "irp":
      return apiResponse?.data?.confidence?.content5wh || "";
    case "analyser":
      return apiResponse?.data?.text || "";
    case "interrogator":
      return apiResponse?.data?.answer || "";
    case "digest":
      return apiResponse?.data?.report || "";
    default:
      throw new Error(`Unsupported route: ${routeName}`);
  }
}
