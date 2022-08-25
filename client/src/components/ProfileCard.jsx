import React from "react";
import Avatar from "@mui/material/Avatar";

export default function ProfileCard({ stringAvatar }) {
  return (
    <li className="hover:bg-[#F6F8FA] py-1 px-2 cursor-pointer flex items-center gap-1">
      <Avatar {...stringAvatar("Kent Dodds")} />
      <div>
        <h6 className="text-[0.875rem]">Suhas Khobragade</h6>
        <p className="text-[0.75rem]">Front-end Web Developer</p>
      </div>
    </li>
  );
}
