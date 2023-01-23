import React from "react";

export default function Button({ children, type, onClick, size, disabled }) {
  return (
    <button
      className={`${size === "medium" ? " " : "mt-4 text-xs"} font-medium ${
        type === "secondary"
          ? "bg-red"
          : type === "success"
          ? "bg-green"
          : "bg-black"
      } text-white px-3 py-1 rounded`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: "primary",
  size: "small",
  onClick: () => {},
};
