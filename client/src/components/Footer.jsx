import React from "react";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import {
  // RiMessage2Line,
  // RiMessage2Fill,
  RiBookmarkFill,
  RiBookmarkLine,
  RiAccountCircleLine,
  RiAccountCircleFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

export default function Footer({ home, bookmarks, messages, profile }) {
  return (
    <div className="stickyBottomNav lg:hidden fixed left-0 bottom-0 w-full z-10 bg-dark_white text-center text-black">
      <ul className="flex justify-between">
        <div className="w-1/3">
          <Link to="/home">
            <MenuItem
              name={"Home"}
              icon={<AiOutlineHome />}
              iconActive={<AiFillHome />}
              condition={home}
              secondary={true}
            />
          </Link>
        </div>

        <div className="w-1/3">
          <Link to="/bookmarks">
            <MenuItem
              name={"Bookmarks"}
              icon={<RiBookmarkLine />}
              iconActive={<RiBookmarkFill />}
              condition={bookmarks}
              secondary={true}
            />
          </Link>
        </div>

        {/* <div className="w-1/4">
          <Link to="/messages">
            <MenuItem
              name={"Messages"}
              icon={<RiMessage2Line />}
              iconActive={<RiMessage2Fill />}
              condition={messages}
              secondary={true}
            />
          </Link>
        </div> */}

        <div className="w-1/3">
          <Link to={"/profile"}>
            <MenuItem
              name={"Profile"}
              icon={<RiAccountCircleLine />}
              iconActive={<RiAccountCircleFill />}
              condition={profile}
              secondary={true}
            />
          </Link>
        </div>
      </ul>
    </div>
  );
}
