import Avatar from "../Avatar";
import React, { useState } from "react";
import { GoKebabVertical } from "react-icons/go";
import { MdOutlineInsertComment } from "react-icons/md";
import {
  RiThumbUpLine,
  RiBookmarkLine,
  RiBookmarkFill,
  RiThumbUpFill,
} from "react-icons/ri";
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
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useSelector } from "react-redux";

export default function PostCard({
  authorName,
  showDelete,
  id,
  publishedDate,
  message,
  likes,
}) {
  const { user } = useSelector((state) => state.user);
  const { setState, setLoading } = useContext(GlobalContext);

  const [showMenu, setShowMenu] = useState(false);
  const [bookmarked, setBookmarked] = useState(
    user && user.bookmarks.includes(id)
  );
  const [like, setLike] = useState(likes && likes.includes(user && user._id));

  function handleShowMenu() {
    setShowMenu((prev) => !prev);
  }

  async function deletePost() {
    setLoading(true);
    setState(true);
    const userRef = doc(db, "users", user._id);
    if (bookmarked) {
      await updateDoc(userRef, {
        bookmarks: arrayRemove(id),
      });
    }
    const postRef = doc(db, "posts", id);
    await deleteDoc(postRef);
    setState(false);
    setLoading(false);
  }

  async function handleLike() {
    setState(true);
    setLike((prev) => !prev);
    const postsRef = doc(db, "posts", id);

    if (likes.includes(user._id)) {
      await updateDoc(postsRef, {
        "post.likes": arrayRemove(user._id),
      });
    } else {
      await updateDoc(postsRef, {
        "post.likes": arrayUnion(user._id),
      });
    }
    setState(false);
  }

  async function handleBookmark() {
    setState(true);
    setBookmarked((prev) => !prev);
    const userRef = doc(db, "users", user._id);

    if (user.bookmarks.includes(id)) {
      await updateDoc(userRef, {
        bookmarks: arrayRemove(id),
      });
    } else {
      await updateDoc(userRef, {
        bookmarks: arrayUnion(id),
      });
    }
    setState(false);
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
      <p className="leading-loose px-1 py-2 sm:px-14">{message}</p>
      <div className="flex px-1 py-2 sm:px-12 items-center gap-12 ">
        <button className="p-2 rounded-3xl hover:bg-light_green hover:text-green">
          <MdOutlineInsertComment size={"1.25rem"} />
        </button>
        <div className="flex items-center ">
          <button
            className={`p-2 rounded-3xl hover:bg-light_green hover:text-green ${
              like && "text-green"
            }`}
            onClick={handleLike}
          >
            {like ? (
              <RiThumbUpFill size={"1.25rem"} />
            ) : (
              <RiThumbUpLine size={"1.25rem"} />
            )}
          </button>
          <p className="p-2 text-sm">{likes.length}</p>
        </div>
        <button
          className="p-2 rounded-3xl hover:bg-light_green hover:text-green"
          onClick={handleBookmark}
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
