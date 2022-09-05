import React from "react";

export default function Button({ children, type, onClick }) {
  return (
    <button
      className={`mt-4 text-xs font-medium ${
        type === "secondary" ? "bg-red" : "bg-black"
      } text-white px-3 py-1 rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: "primary",
  onClick: () => {},
};
