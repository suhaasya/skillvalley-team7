import React, { useState, useEffect } from "react";
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
import Spinner from "./Spinner";
import { db } from "../firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export default function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [popUpMenu, setPopUpMenu] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [searchUsers, setSearchUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      // User Data
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      }

      // User Post Data
      const usersSnap = await getDocs(collection(db, "users"));
      const users = [];
      usersSnap.forEach((doc) => {
        users.push({ _id: doc.id, ...doc.data() });
      });
      setUsers(users);
      setSearchUsers(users);
      setLoading(false);
    }
    fetchData();
  }, [auth.currentUser.uid]);

  function handleChange(e) {
    setPopUpMenu(false);
    const { value } = e.target;
    setSearchValue(value.toLowerCase());

    if (value.length > 0) {
      setSearchResult(true);
      setSearchUsers((prev) => {
        return prev.filter((item) =>
          `${item.firstName} ${item.lastName}`
            .toLowerCase()
            .includes(searchValue)
        );
      });
    } else {
      setSearchResult(false);
      setSearchValue("");
      setSearchUsers(users);
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

  if (loading) {
    return <Spinner />;
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

            {searchUsers.length > 0 ? (
              searchUsers.map((user, i) => (
                <ProfileCard
                  userName={`${user.firstName.trim()} ${user.lastName.trim()}`}
                  userBio={user.description}
                  key={i}
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
            <Avatar
              {...stringAvatar(
                `${user?.firstName.trim()} ${user?.lastName.trim()}`
              )}
            />
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
