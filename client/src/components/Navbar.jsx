import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

import {
  RiLogoutBoxRLine,
  RiSettings5Line,
  RiAccountCircleLine,
} from "react-icons/ri";

import ProfileCard from "./ProfileCard";
import users from "../backend/db/users";
import stringAvatar from "../utils/stringAvatar";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [popUpMenu, setPopUpMenu] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [userData, setUserData] = useState(users);
  const [searchValue, setSearchValue] = useState("");

  function handleChange(e) {
    setPopUpMenu(false);
    const { value } = e.target;
    setSearchValue(value.toLowerCase());

    if (value.length > 0) {
      setSearchResult(true);
      setUserData((prev) =>
        prev.filter((item) =>
          `${item.firstName} ${item.lastName}`
            .toLowerCase()
            .includes(searchValue)
        )
      );
    } else {
      setSearchResult(false);
      setSearchValue("");
      setUserData(users);
    }
  }

  function handleClick() {
    setSearchResult(false);
    setPopUpMenu((prev) => !prev);
  }

  function closeMenu() {
    popUpMenu && setPopUpMenu(false);
    searchResult && setSearchResult(false);
  }

  function logout() {
    signOut(auth)
      .then(() => {
        console.log("bye bye");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode} ${errorMessage}`);
      });
  }

  return (
    <nav
      className="flex items-center px-[2%] md:px-[5%] py-[0.5%] border-solid border-b-2 border-light_gray lg:px-[12%]"
      onClick={closeMenu}
    >
      <Logo />
      <div className="ml-auto flex gap-[2.5%]">
        <div className="relative">
          <SearchBar
            onChange={handleChange}
            value={searchValue}
            setValue={setSearchValue}
          />
          <ul
            className={
              searchResult
                ? "absolute border-solid border-2 rounded-lg p-1 bg-white top-12 w-60 sm:w-80 max-h-80 overflow-y-scroll z-10"
                : "hidden"
            }
          >
            {/* 
            Profile Card shown in search result
            */}

            {userData.length > 0 ? (
              userData.map((user) => (
                <ProfileCard
                  userName={`${user.firstName} ${user.lastName}`}
                  userBio={user.description}
                  key={user._id}
                />
              ))
            ) : (
              <ProfileCard noUser={true} />
            )}
          </ul>
        </div>

        <div className="relative">
          <button
            className="cursor-pointer hover:opacity-70"
            onClick={handleClick}
          >
            <Avatar {...stringAvatar("Suhas Khobragade")} />
          </button>

          {/* When Above Profile picture will be clicked this menu will be shown */}
          <ul
            className={
              popUpMenu
                ? "absolute border-solid border-2 rounded-lg py-1 bg-white right-1 top-12 z-10"
                : "hidden"
            }
          >
            <Link to={"/profile"}>
              <li className="hover:bg-dark_white py-2 px-4 cursor-pointer flex items-center gap-1">
                <RiAccountCircleLine />
                <p>Profile</p>
              </li>
            </Link>
            <Link to={"/settings"}>
              <li className="hover:bg-dark_white py-2 px-4 cursor-pointer flex items-center gap-1">
                <RiSettings5Line />
                <p>Settings</p>
              </li>
            </Link>

            <li
              className="hover:bg-dark_white py-2 px-4 text-red border-solid border-t-2 border-light_gray flex items-center gap-1 cursor-pointer"
              onClick={logout}
            >
              <RiLogoutBoxRLine />
              <p>Log out</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
