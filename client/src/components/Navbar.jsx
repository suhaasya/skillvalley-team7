import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

import {
  RiLogoutBoxRLine,
  RiSettings5Line,
  RiAccountCircleLine,
} from "react-icons/ri";

import ProfileCard from "./ProfileCard";
import stringAvatar from "../utils/stringAvatar";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { useGetUser, useSearchUsers } from "../hooks/useUserData";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

export default function Navbar() {
  const userId = auth.currentUser?.uid;
  const navigate = useNavigate();
  const { data: user } = useGetUser(userId);

  const [popUpMenu, setPopUpMenu] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [searchUsersData, setSearchUsersData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const { data } = useSearchUsers(searchValue);

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  function handleClick() {
    setPopUpMenu((prev) => !prev);
  }

  function closeMenu() {
    setSearchResult(false);
  }

  async function logout() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <nav
      className="flex items-center px-[3%] md:px-[5%] py-[0.5%] border-solid border-b-2 border-light_gray lg:px-[12%]"
      onClick={closeMenu}
    >
      <Link to={"/home"}>
        <Logo />
      </Link>
      <div className="ml-auto flex gap-[2.5%]">
        <div className="relative">
          <SearchBar
            onChange={handleChange}
            value={searchValue}
            onKeyDown={() => {
              setSearchResult(true);
            }}
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

            {data?.length ? (
              data?.map((user) => (
                <ProfileCard
                  userName={`${user.firstName} ${user.lastName}`}
                  userBio={user.briefBio}
                  key={user._id}
                  onClick={() => {
                    navigate(`/users/${user._id}`);
                  }}
                />
              ))
            ) : (
              <ProfileCard noUser={true} />
            )}
          </ul>
        </div>

        <div className="relative">
          <span
            className="cursor-pointer hover:opacity-70"
            onClick={handleClick}
          >
            <Avatar {...stringAvatar(`${user?.firstName} ${user?.lastName}`)} />
          </span>

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
