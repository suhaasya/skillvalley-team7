import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import SearchBar from "../components/SearchBar";
import { auth, db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserChat,
  useGetAllChats,
  useGetUser,
  useSearchUsers,
} from "../hooks/useUserData";

export default function ChatSidebar({ onChatSelect, activeChatId }) {
  const userId = auth.currentUser?.uid;
  const navigate = useNavigate();
  const { data: user } = useGetUser(userId);

  const [popUpMenu, setPopUpMenu] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [searchUsersData, setSearchUsersData] = useState();
  const { data: userChats } = useGetAllChats(userId);

  const [searchValue, setSearchValue] = useState("");
  const { data } = useSearchUsers(searchValue);
  const { mutate } = useCreateUserChat(userId);

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  function handleClick() {
    setPopUpMenu((prev) => !prev);
  }

  function closeMenu() {
    setSearchResult(false);
  }

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  async function handleCreateChat(otherUser) {
    const currentUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const user2 = {
      firstName: otherUser.firstName,
      lastName: otherUser.lastName,
      _id: otherUser._id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await mutate({ currentUser: currentUser, otherUser: user2 });
  }

  return (
    <div
      className="w-2/5 border-solid border-r-2 border-light_gray overflow-y-scroll h-full"
      onClick={() => setSearchResult(false)}
    >
      <div className="flex justify-center py-1 flex-col items-center">
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
              ? "absolute  border-solid border-2 rounded-lg p-1 bg-white top-32 w-60 sm:w-80 max-h-80 overflow-y-scroll z-10"
              : "hidden"
          }
        >
          {/* 
            Profile Card shown in search result
            */}

          {data?.length ? (
            data?.map((user) =>
              user._id !== userId ? (
                <ProfileCard
                  userName={`${user.firstName} ${user.lastName}`}
                  userBio={user.briefBio}
                  key={user._id}
                  onClick={() => {
                    handleCreateChat(user);
                  }}
                />
              ) : null
            )
          ) : (
            <ProfileCard noUser={true} />
          )}
        </ul>
      </div>
      <ul className="flex flex-col gap-2">
        {userChats?.map((user) => (
          <li>
            <ProfileCard
              userName={`${user.firstName} ${user.lastName}`}
              userBio={user.briefBio}
              key={user._id}
              id={user._id}
              active={activeChatId === user._id}
              onClick={onChatSelect}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
