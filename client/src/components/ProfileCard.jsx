import React from "react";
import Avatar from "@mui/material/Avatar";

export default function ProfileCard({ stringAvatar }) {
  return (
    <li className="hover:bg-dark_white py-1 px-2 cursor-pointer flex items-center gap-1">
      <Avatar {...stringAvatar("Kent Dodds")} />
      <div>
        <h6 className="text-sm">Suhas Khobragade</h6>
        <p className="text-xs">Front-end Web Developer</p>
      </div>
    </li>
  );
}
