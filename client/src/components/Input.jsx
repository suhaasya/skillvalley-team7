import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function Input({
  placeholder,
  type,
  onChange,
  required,
  name,
  value,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return type === "password" ? (
    <div className="border-2 border-solid p-2  rounded-md border-gray flex items-center justify-between ">
      <div>
        <p className="text-xs text-gray">
          {placeholder}
          {required && <span className="text-red"> *</span>}
        </p>
        <input
          className="text-sm w-max"
          name={name || placeholder.trim().replaceAll(" ", "")}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
      <button onClick={() => setShowPassword((prev) => !prev)}>
        {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
      </button>
    </div>
  ) : type === "textarea" ? (
    <div className="border-2 border-solid p-2  rounded-md border-gray">
      <p className="text-xs text-gray">
        {placeholder} {required && <span className="text-red"> *</span>}
      </p>
      <textarea
        className="text-sm w-full"
        value={value}
        onChange={(e) => onChange(e)}
        name={name || placeholder.trim().replaceAll(" ", "")}
      />
    </div>
  ) : (
    <div className="border-2 border-solid p-2  rounded-md border-gray">
      <p className="text-xs text-gray">
        {placeholder} {required && <span className="text-red"> *</span>}
      </p>
      <input
        className="text-sm"
        value={value}
        onChange={(e) => onChange(e)}
        name={name || placeholder.trim().replaceAll(" ", "")}
      />
    </div>
  );
}

Input.defaultProps = {
  placeholder: "Enter the value: ",
  type: "text",
  onChange: () => {},
  required: false,
  value: "",
};
