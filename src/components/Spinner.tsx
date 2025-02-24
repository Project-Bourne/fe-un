/**
 * @file Spinner.tsx
 * @description A simple spinner component for loading states.
 */

import React from "react";

/**
 * Spinner component displays a rotating spinner for loading indication.
 *
 * @returns {JSX.Element} Spinner element.
 */
const Spinner: React.FC = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
