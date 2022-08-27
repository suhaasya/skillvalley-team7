import React from "react";
import Avatar from "@mui/material/Avatar";
import stringAvatar from "../utils/stringAvatar";

export default function ProfileCard({ user, noUser }) {
  return noUser ? (
    <li className="py-1 px-2 text-center">
      <p className="text-xs font-light">
        Hmmm... Seems like they haven't joined yet.
      </p>
    </li>
  ) : (
    <li className="hover:bg-dark_white py-1 px-2 cursor-pointer flex items-center gap-1">
      <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)} />

      <div>
        <h6 className="text-sm">{`${user.firstName} ${user.lastName}`}</h6>
        <p className="text-xs">{user.description}</p>
      </div>
    </li>
  );
}
