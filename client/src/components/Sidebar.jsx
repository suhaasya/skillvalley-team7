import React from "react";
// import menuItem from "../data/menuItem";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Sidebar({ home, bookmarks, messages, profile }) {
  console.log(home);
  return (
    <section className="w-1/5 text-xl hidden lg:block">
      <ul className="flex flex-col gap-4 mt-4 mr-4">
        <li
          className={
            home
              ? "flex items-center gap-1 bg-[#E1E4E8] p-2 rounded cursor-pointer"
              : "flex items-center gap-1 hover:bg-[#E1E4E8] p-2 rounded cursor-pointer"
          }
        >
          <HomeIcon />
          <p>Home</p>
        </li>
        <li
          className={
            bookmarks
              ? "flex items-center gap-1 bg-[#E1E4E8] p-2 rounded cursor-pointer"
              : "flex items-center gap-1 hover:bg-[#E1E4E8] p-2 rounded cursor-pointer"
          }
        >
          <BookmarkIcon />
          <p>Bookmarks</p>
        </li>
        <li
          className={
            messages
              ? "flex items-center gap-1 bg-[#E1E4E8] p-2 rounded cursor-pointer"
              : "flex items-center gap-1 hover:bg-[#E1E4E8] p-2 rounded cursor-pointer"
          }
        >
          <MessageIcon />
          <p>Messages</p>
        </li>
        <li
          className={
            profile
              ? "flex items-center gap-1 bg-[#E1E4E8] p-2 rounded cursor-pointer"
              : "flex items-center gap-1 hover:bg-[#E1E4E8] p-2 rounded cursor-pointer"
          }
        >
          <AccountCircleIcon />
          <p>Profile</p>
        </li>
        {/* {menuItem.map((item) => {
          return (
            // Menu Item
            <li className="flex items-center gap-1 hover:bg-[#E1E4E8] p-2 rounded cursor-pointer">
              {item.icon}
              <p>{item.name}</p>
            </li>
          );
        })} */}
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
