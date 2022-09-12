import React from "react";

export default function Spinner() {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-50 bg-dark_white flex items-center justify-center">
      <div className="w-16 h-16 border-solid border-8 border-t-green border-r-transparent border-b-green border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
}
