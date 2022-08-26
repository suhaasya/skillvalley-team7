import React from "react";
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

export default function Footer({ home, bookmarks, messages, profile }) {
  return (
    <div className="stickyBottomNav lg:hidden fixed left-0 bottom-0 w-full z-10 bg-dark_white text-center text-black">
      <ul className="flex justify-around ">
        <MenuItem
          name={"Home"}
          icon={<AiOutlineHome />}
          iconActive={<AiFillHome />}
          condition={home}
          secondary={true}
        />
        <MenuItem
          name={"Bookmarks"}
          icon={<RiBookmarkLine />}
          iconActive={<RiBookmarkFill />}
          condition={bookmarks}
          secondary={true}
        />
        <MenuItem
          name={"Messages"}
          icon={<RiMessage2Line />}
          iconActive={<RiMessage2Fill />}
          condition={messages}
          secondary={true}
        />
        <MenuItem
          name={"Profile"}
          icon={<RiAccountCircleLine />}
          iconActive={<RiAccountCircleFill />}
          condition={profile}
          secondary={true}
        />
      </ul>
    </div>
  );
}
