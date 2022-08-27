import React from "react";

export default function MenuItem({
  secondary,
  condition,
  name,
  icon,
  iconActive,
}) {
  return secondary ? (
    <li
      className={
        condition
          ? " bg-white border-solid border-t-2 border-black p-2 grow  justify-center"
          : " bg-dark_white p-2 grow  justify-center"
      }
    >
      <div className="flex justify-center">{condition ? iconActive : icon}</div>
      <p>{name}</p>
    </li>
  ) : (
    <li
      className={
        condition
          ? "flex items-center gap-1 bg-light_gray p-2 rounded cursor-pointer"
          : "flex items-center gap-1 hover:bg-light_gray p-2 rounded cursor-pointer"
      }
    >
      {condition ? iconActive : icon}
      <p>{name}</p>
    </li>
  );
}
