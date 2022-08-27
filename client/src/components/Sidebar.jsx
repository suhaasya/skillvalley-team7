import React from "react";
// import menuItem from "../data/menuItem";

import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import {
  RiMessage2Line,
  RiMessage2Fill,
  RiBookmarkFill,
  RiBookmarkLine,
  RiAccountCircleLine,
  RiAccountCircleFill,
} from "react-icons/ri";
import MenuItem from "./MenuItem";

export default function Sidebar({ home, bookmarks, messages, profile }) {
  return (
    <section className="w-1/5 text-xl hidden lg:block">
      <ul className="flex flex-col gap-4 mt-4 mr-4">
        <MenuItem
          name={"Home"}
          icon={<AiOutlineHome />}
          iconActive={<AiFillHome />}
          condition={home}
        />
        <MenuItem
          name={"Bookmarks"}
          icon={<RiBookmarkLine />}
          iconActive={<RiBookmarkFill />}
          condition={bookmarks}
        />
        <MenuItem
          name={"Messages"}
          icon={<RiMessage2Line />}
          iconActive={<RiMessage2Fill />}
          condition={messages}
        />
        <MenuItem
          name={"Profile"}
          icon={<RiAccountCircleLine />}
          iconActive={<RiAccountCircleFill />}
          condition={profile}
        />
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
