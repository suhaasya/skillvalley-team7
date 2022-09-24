import React from "react";
// import menuItem from "../data/menuItem";

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

export default function Sidebar({ home, bookmarks, messages, profile }) {
  return (
    <section className="w-1/5 text-xl hidden lg:block">
      <ul className="flex flex-col gap-4 mt-4 mr-4">
        <Link to={"/home"}>
          <MenuItem
            name={"Home"}
            icon={<AiOutlineHome />}
            iconActive={<AiFillHome />}
            condition={home}
          />
        </Link>
        <Link to="/bookmarks">
          <MenuItem
            name={"Bookmarks"}
            icon={<RiBookmarkLine />}
            iconActive={<RiBookmarkFill />}
            condition={bookmarks}
          />
        </Link>
        {/* <Link to="/messages">
          <MenuItem
            name={"Messages"}
            icon={<RiMessage2Line />}
            iconActive={<RiMessage2Fill />}
            condition={messages}
          />
        </Link> */}
        <Link to="/profile">
          <MenuItem
            name={"Profile"}
            icon={<RiAccountCircleLine />}
            iconActive={<RiAccountCircleFill />}
            condition={profile}
          />
        </Link>
      </ul>
    </section>
  );
}

Sidebar.defaultProps = {
  home: false,
  bookmark: false,
  messages: false,
  profile: false,
};
