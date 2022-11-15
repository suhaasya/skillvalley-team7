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
import { useContext } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase.config";

export default function ChatSidebar() {
  const [users, setUsers] = useState(null);
  const [chats, setChats] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { user: currentUserData } = useSelector((state) => state.user);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    function getChats() {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(Object.entries(doc.data()));
      });
      return () => {
        unsub();
      };
    }
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  function handleChange(e) {
    setErr(false);
    const { value } = e.target;
    setSearchValue(value);
  }

  async function handleSearch() {
    const q = query(
      collection(db, "users"),
      where("firstName", "==", searchValue)
    );

    try {
      const querySnapshot = await getDocs(q);
      const searchedUsers = [];
      querySnapshot.forEach((doc) => {
        searchedUsers.push({ _id: doc.id, ...doc.data() });
      });
      searchedUsers.length === 0 && setErr(true);
      setUsers(searchedUsers.filter((user) => user._id !== currentUser.uid));
    } catch (err) {
      setErr(true);
      console.log(err.message);
    }
  }

  function handleKey(e) {
    e.code === "Enter" && handleSearch();
  }

  async function handleSelect(id) {
    // Logged in User Data
    const userRef = doc(db, "users", id);
    const userSnap = await getDoc(userRef);
    const user = { uid: userSnap.id, ...userSnap.data() };

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }

      //create user chats

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          _id: user.uid,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", id), {
        [combinedId + ".userInfo"]: {
          _id: currentUserData._id,
          firstName: currentUserData.firstName,
          lastName: currentUserData.lastName,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (error) {}

    setSearchValue("");
    setUsers(null);
  }

  function getChats(user) {
    dispatch({ type: "CHANGE_USER", payload: user });
  }

  return (
    <div className="w-2/5 border-solid border-r-2 border-light_gray overflow-y-scroll h-full">
      <div className="flex justify-center py-1 flex-col items-center">
        <SearchBar
          value={searchValue}
          setValue={setSearchValue}
          onChange={handleChange}
          onKeyDown={handleKey}
          type={"small"}
        />
      </div>

      {users && (
        <div className="border-solid border-b">
          {users.map((user, i) => (
            <ProfileCard
              onClick={() => handleSelect(user._id)}
              id={user._id}
              key={i}
              userName={`${user.firstName.trim()} ${user.lastName.trim()}`}
              userBio={user.description}
            />
          ))}
          {err && <span>user does not exists</span>}
        </div>
      )}

      {chats
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <ProfileCard
            onClick={() => getChats(chat[1].userInfo)}
            key={chat[0]}
            userName={`${chat[1].userInfo.firstName.trim()} ${chat[1].userInfo.lastName.trim()}`}
          />
        ))}

      <ProfileCard />
    </div>
  );
}
