import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function Input({ placeholder, type, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return type === "password" ? (
    <div className="border-2 border-solid p-2  rounded-md border-gray flex items-center justify-between">
      <div>
        <p className="text-xs text-gray">{placeholder}</p>
        <input
          className="text-sm"
          type={showPassword ? "text" : "password"}
          onChange={(e) => onChange(e)}
        />
      </div>
      <button onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
      </button>
    </div>
  ) : (
    <div className="border-2 border-solid p-2  rounded-md border-gray">
      <p className="text-xs text-gray">{placeholder}</p>
      <input className="text-sm" onChange={(e) => onChange(e)} />
    </div>
  );
}

Input.defaultProps = {
  placeholder: "Enter the value: ",
  type: "text",
  onChange: () => {},
};
