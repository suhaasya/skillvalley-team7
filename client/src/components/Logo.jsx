import React from "react";
import LogoIcon from "../images/logo.png";

export default function Logo() {
  return (
    <div className="w-11 h-11 border-solid border-2 border-dark_green bg-green p-1 rounded-2xl">
      <img src={LogoIcon} alt="logo" className="" />
    </div>
  );
}
