import React from "react";
import Avatar from "./Avatar";
import stringAvatar from "../utils/stringAvatar";

export default function ProfileCard({
  noUser,
  userName,
  userBio,
  onClick,
  id,
}) {
  return noUser ? (
    <li className="py-1 px-2 text-center">
      <p className="text-xs font-light">
        Hmmm... Seems like they haven't joined yet.
      </p>
    </li>
  ) : (
    userName && (
      <li
        className={` py-1 px-2 ${
          userName !== "undefined undefined" &&
          "cursor-pointer hover:bg-dark_white"
        } flex items-center gap-1`}
        onClick={() => onClick(id)}
      >
        {userName !== "undefined undefined" && (
          <Avatar {...stringAvatar(userName)} />
        )}

        <div>
          <h6 className="text-sm">
            {userName !== "undefined undefined" ? userName : "Select a Message"}
          </h6>
          <p className="text-xs">
            {userName !== "undefined undefined"
              ? userBio
              : "Choose from your existing conversations, start a new one with search."}
          </p>
        </div>
      </li>
    )
  );
}

ProfileCard.defaultProps = {
  onClick: () => {},
};
