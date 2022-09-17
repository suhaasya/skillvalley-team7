import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function Input({
  label,
  type,
  onChange,
  required,
  name,
  row,
  value,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return type === "password" ? (
    <div className="border-2 border-solid p-2  rounded-md border-gray flex items-center justify-between bg-white">
      <div className="w-full">
        <p className="text-xs text-gray">
          {label}
          {required && <span className="text-red"> *</span>}
        </p>
        <input
          className="text-sm w-full"
          placeholder={placeholder && placeholder}
          name={name || label.trim().replaceAll(" ", "")}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div
        onClick={() => setShowPassword((prev) => !prev)}
        className="cursor-pointer"
      >
        {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
      </div>
    </div>
  ) : type === "textarea" ? (
    <div className="border-2 border-solid p-2  rounded-md border-gray bg-white">
      <p className="text-xs text-gray">
        {label} {required && <span className="text-red"> *</span>}
      </p>
      <textarea
        className="text-sm w-full"
        maxLength={"280"}
        row={row}
        placeholder={placeholder && placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        name={name || label.trim().replaceAll(" ", "")}
      />
    </div>
  ) : (
    <div className="border-2 border-solid p-2  rounded-md border-gray bg-white">
      <p className="text-xs text-gray">
        {label} {required && <span className="text-red"> *</span>}
      </p>
      <input
        className="text-sm w-full"
        placeholder={placeholder && placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        name={name || label.trim().replaceAll(" ", "")}
      />
    </div>
  );
}

Input.defaultProps = {
  label: "Enter the value: ",
  type: "text",
  onChange: () => {},
  required: false,
  value: "",
  row: "2",
};
