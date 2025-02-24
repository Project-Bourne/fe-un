/**
 * @file DocumentPreview.tsx
 * @description A component that renders the document's content preview in markdown format.
 */

import React from "react";
import { useSelector } from "react-redux";
import MarkdownRenderer from "./MarkdownRenderer";

/**
 * DocumentPreview component renders the document's content using markdown.
 * If version history exists, it orders the documents in reverse order (most recent first).
 *
 * @returns {JSX.Element} The rendered document preview.
 */
const DocumentPreview: React.FC = (): JSX.Element => {
  const { singleDoc } = useSelector((state: any) => state.docs);

  let versions = [];
  if (
    singleDoc &&
    singleDoc.versions &&
    Array.isArray(singleDoc.versions) &&
    singleDoc.versions.length > 0
  ) {
    // Sort versions in descending order by timestamp to display most recent first.
    versions = [...singleDoc.versions].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  } else if (singleDoc) {
    // Use current document content if no version history exists.
    versions = [
      {
        content: singleDoc.data?.ops?.[0]?.insert || "",
        timestamp:
          singleDoc.updatedAt ||
          singleDoc.createdAt ||
          new Date().toISOString(),
      },
    ];
  }

  return (
    <div className="p-4">
      {versions.map((version, index) => (
        <div key={index} className="mb-6 border rounded p-4 shadow-sm">
          <MarkdownRenderer content={version.content} />
          <div className="mt-2 text-right text-gray-500 text-sm">
            {new Date(version.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentPreview;
