import React from "react";

const ActionButton = ({
  onClick,
  children,
  colorClass = "text-indigo-400 hover:text-indigo-300",
  ariaLabel,
}) => (
  <button
    className={`rounded-full border border-gray-700 bg-gray-800 p-2 ${colorClass}`}
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default ActionButton;
