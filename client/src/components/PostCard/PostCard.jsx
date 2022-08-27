import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { GoKebabVertical } from "react-icons/go";
import { MdOutlineInsertComment, MdOutlineThumbUp } from "react-icons/md";
import stringAvatar from "../../utils/stringAvatar";
import "./PostCard.css";

export default function PostCard({ post }) {
  const [showMenu, setShowMenu] = useState(false);
  function handleShowMenu() {
    setShowMenu((prev) => !prev);
  }

  return (
    <li className="border-solid border-b-2 border-light_gray mb-4 cursor-pointer">
      <div className="flex items-center">
        <Avatar
          {...stringAvatar(`${post.user.firstName} ${post.user.lastName}`)}
        />
        <div className="ml-2">
          <h5 className="text-sm font-medium hover-underline-animation ">
            {`${post.user.firstName} ${post.user.lastName}`}
          </h5>
          <p className="text-xs text-gray">Shared a post • {post.post.date}</p>
        </div>
        <button className="relative ml-auto" onClick={handleShowMenu}>
          <GoKebabVertical />

          <ul
            className={
              showMenu
                ? "absolute border-solid border-2 bg-white w-32 text-left rounded-lg py-1 right-2"
                : "hidden"
            }
          >
            <li className="hover:bg-dark_white py-2 px-4 cursor-pointer">
              Delete
            </li>
            <li className="hover:bg-dark_white py-2 px-4 cursor-pointer">
              Copy url
            </li>
          </ul>
        </button>
      </div>
      <p className="leading-loose px-1 py-2 sm:px-12">{post.post.message}</p>
      <div className="flex px-1 py-2 sm:px-12 items-center gap-12 ">
        <button className="p-2 rounded-3xl hover:bg-light_green hover:text-green">
          <MdOutlineInsertComment size={"1.25rem"} />
        </button>
        <div className="flex items-center ">
          <button className="p-2 rounded-3xl hover:bg-light_green hover:text-green">
            <MdOutlineThumbUp size={"1.25rem"} />
          </button>
          <p className="p-2 text-sm">{post.post.likes}</p>
        </div>
      </div>
    </li>
  );
}
