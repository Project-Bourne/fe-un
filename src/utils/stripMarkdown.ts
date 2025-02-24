/**
 * @file stripMarkdown.ts
 * @description Provides a helper function to remove markdown syntax from strings.
 */

/**
 * Strips markdown syntax from the provided text and returns plain text.
 * This function removes common markdown characters such as bold, italic, inline code, headings, blockquotes, and links.
 *
 * @param {string} text - The input string containing markdown syntax.
 * @returns {string} - The plain text with markdown syntax removed.
 */
export function stripMarkdown(text: string): string {
  if (!text) return "";
  return (
    text
      // Remove bold and italic markers
      .replace(/(\*\*|__)(.*?)\1/g, "$2")
      .replace(/(\*|_)(.*?)\1/g, "$2")
      // Remove inline code
      .replace(/`([^`]+)`/g, "$1")
      // Remove headings
      .replace(/#+\s/g, "")
      // Remove blockquotes
      .replace(/>+\s?/g, "")
      // Remove links
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
  );
}
