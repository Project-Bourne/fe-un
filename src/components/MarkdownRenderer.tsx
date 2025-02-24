/**
 * @file MarkdownRenderer.tsx
 * @description Renders markdown content using react-markdown along with remark-gfm for GitHub-flavored markdown support.
 */

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Props for MarkdownRenderer component.
 * @typedef {object} MarkdownRendererProps
 * @property {string} content - The markdown content to render.
 */

interface MarkdownRendererProps {
  content: string;
}

/**
 * MarkdownRenderer component converts markdown text to rendered HTML.
 *
 * @param {MarkdownRendererProps} props - Component properties.
 * @returns {JSX.Element} Rendered markdown content.
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}): JSX.Element => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
};

export default MarkdownRenderer;
