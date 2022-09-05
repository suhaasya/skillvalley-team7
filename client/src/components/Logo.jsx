import React from "react";
import LogoIcon from "../images/ScreamLogo.svg";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <button className="">
        <img
          src={LogoIcon}
          alt="logo"
          className="w-11 h-11 rounded-2xl border-solid border-2 border-light_green"
        />
      </button>
    </Link>
  );
}
