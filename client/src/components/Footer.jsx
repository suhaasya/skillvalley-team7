import React from "react";
import menuItem from "../data/menuItem";
// import HomeIcon from "@mui/icons-material/Home";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import MessageIcon from "@mui/icons-material/Message";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Footer() {
  return (
    <div class="stickyBottomNav lg:hidden fixed left-0 bottom-0 w-full z-10 bg-[#F6F8FA] text-center text-[#212121]">
      <ul className="flex justify-around px-[2%] md:px-[5%] py-[1%]">
        {/* <li className="">
          <HomeIcon />
          <p>Home</p>
        </li>
        <li>
          <BookmarkIcon />
          <p>Bookmarks</p>
        </li>
        <li>
          <MessageIcon />
          <p>Messages</p>
        </li>
        <li>
          <AccountCircleIcon />
          <p>Profile</p>
        </li> */}

        {menuItem.map((item) => {
          return (
            <li className="">
              {item.icon}
              <p>{item.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
