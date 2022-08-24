import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ProfileCard from "./ProfileCard";

const Search = styled("div")(({ theme }) => ({
  position: "relative",

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    border: "1px solid #959DA5",
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "29ch",
      },
    },
  },
}));

export default function Navbar() {
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [searchResult, setSearchResult] = useState(false);

  function handleChange(e) {
    console.log(e);
    setPopUpMenu(false);
    const { value } = e.target;
    value.length >= 1 ? setSearchResult(true) : setSearchResult(false);
  }

  function handleClick() {
    setSearchResult(false);
    setPopUpMenu((prev) => !prev);
  }

  function closeMenu() {
    popUpMenu && setPopUpMenu(false);
    searchResult && setSearchResult(false);
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <nav
      className="flex items-center px-[2%] md:px-[5%] py-[0.5%] border-solid border-b-2 border-[#E1E4E8] lg:px-[12%]"
      onClick={closeMenu}
    >
      <button className="logo">T7</button>
      <div className="ml-auto flex gap-[2.5%]">
        <div className="relative">
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#959DA5" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
            />
          </Search>
          <ul
            className={
              searchResult
                ? "absolute border-solid border-2 rounded-lg p-1 bg-white left-1 top-12 w-60 sm:w-80 max-h-80 overflow-y-scroll"
                : "hidden"
            }
          >
            {/* 
            Profile Card shown in search result
            */}
            <ProfileCard stringAvatar={stringAvatar} />
          </ul>
        </div>

        <div className="relative">
          <button
            className="cursor-pointer hover:opacity-70"
            onClick={handleClick}
          >
            <Avatar {...stringAvatar("Kent Dodds")} />
          </button>

          {/* When Above Profile picture will be clicked this menu will be shown */}
          <ul
            className={
              popUpMenu
                ? "absolute border-solid border-2 rounded-lg py-1 bg-white right-1 top-12"
                : "hidden"
            }
          >
            <li className="hover:bg-[#F6F8FA] py-2 px-4 cursor-pointer flex items-center gap-1">
              <AccountCircleIcon />
              <p>Profile</p>
            </li>
            <li className="hover:bg-[#F6F8FA] py-2 px-4 cursor-pointer flex items-center gap-1">
              <SettingsIcon />
              <p>Settings</p>
            </li>
            <li className="hover:bg-[#F6F8FA] py-2 px-4 cursor-pointer text-[#EB5757] border-solid border-t-2 border-[#E1E4E8] flex items-center gap-1">
              <LogoutIcon />
              <p>Log out</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
