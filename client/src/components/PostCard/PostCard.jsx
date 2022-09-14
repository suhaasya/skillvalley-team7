import Avatar from "../Avatar";
import React, { useState } from "react";
import { GoKebabVertical } from "react-icons/go";
import { MdOutlineInsertComment } from "react-icons/md";
import { RiThumbUpLine, RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import stringAvatar from "../../utils/stringAvatar";
import "./PostCard.css";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useEffect } from "react";

export default function PostCard({
  authorName,
  showDelete,
  id,
  publishedDate,
  message,
  setLoading,
  likes,
  currentUser,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [bookmarked, setBookmarked] = useState(
    currentUser.bookmarks.includes(id)
  );
  function handleShowMenu() {
    setShowMenu((prev) => !prev);
  }

  useEffect(() => {
    async function bookmarkPost() {
      try {
        const userRef = doc(db, "users", currentUser._id);

        if (bookmarked) {
          await updateDoc(userRef, {
            bookmarks: arrayUnion(id),
          });
        } else {
          await updateDoc(userRef, {
            bookmarks: arrayRemove(id),
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    bookmarkPost();
  }, [currentUser._id, id, bookmarked]);

  async function deletePost() {
    setLoading(true);
    const postRef = doc(db, "posts", id);
    await deleteDoc(postRef);
    setLoading(false);
  }

  return (
    <li className="py-2 px-2 md:px-0 sm:py-8 border-solid border-b-2 border-light_gray mb-4 cursor-pointer">
      <div className="flex items-center">
        <Avatar {...stringAvatar(authorName)} />
        <div className="ml-2">
          <h5 className="text-sm font-medium hover-underline-animation ">
            {authorName}
          </h5>
          <p className="text-xs text-gray">Shared a post • {publishedDate}</p>
        </div>
        <button className="relative ml-auto" onClick={handleShowMenu}>
          <GoKebabVertical />

          <ul
            className={
              showMenu
                ? "absolute border-solid border-2 bg-white w-32 text-left rounded-lg py-1 right-2"
                : "hidden"
            }
          >
            {showDelete && (
              <li
                className="hover:bg-dark_white py-2 px-4 cursor-pointer w-full"
                onClick={deletePost}
              >
                Delete
              </li>
            )}
            <li className="hover:bg-dark_white py-2 px-4 cursor-pointer w-full">
              Copy url
            </li>
          </ul>
        </button>
      </div>
      <p className="leading-loose px-1 py-2 sm:px-12">{message}</p>
      <div className="flex px-1 py-2 sm:px-12 items-center gap-12 ">
        <button className="p-2 rounded-3xl hover:bg-light_green hover:text-green">
          <MdOutlineInsertComment size={"1.25rem"} />
        </button>
        <div className="flex items-center ">
          <button className="p-2 rounded-3xl hover:bg-light_green hover:text-green">
            <RiThumbUpLine size={"1.25rem"} />
          </button>
          <p className="p-2 text-sm">{likes}</p>
        </div>
        <button
          className="p-2 rounded-3xl hover:bg-light_green hover:text-green"
          onClick={() => {
            setBookmarked((prev) => !prev);
          }}
        >
          {bookmarked ? (
            <div className="text-green">
              <RiBookmarkFill size={"1.25rem"} />
            </div>
          ) : (
            <RiBookmarkLine size={"1.25rem"} />
          )}
        </button>
      </div>
    </li>
  );
}

PostCard.defaultProps = {
  authorName: "Unknown",
  publishedDate: "date",
  message: "nothing",
  likes: 0,
};
