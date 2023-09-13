import Avatar from "../Avatar";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
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
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import {
  useBookmarkPost,
  useDeletePost,
  useGetLikeStatus,
  useLikePost,
  useRemoveBookmarkPost,
  useRemoveLike,
} from "../../hooks/usePostsData";
import { useGetUser } from "../../hooks/useUserData";

export default function PostCard({ data }) {
  const userId = auth.currentUser?.uid;
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const showDelete = userId === data?.user?._id;
  const likes = data?.likes;
  const likeRef = useGetLikeStatus(userId, data?._id);
  const like = likeRef?.data?.exists();
  const { data: user } = useGetUser(userId);
  const { mutate: likePost } = useLikePost(data?._id);
  const { mutate: removeLike } = useRemoveLike(data?._id);
  const { mutate: bookmarkPost } = useBookmarkPost(data?._id);
  const { mutate: removeBookmarkPost, isLoading: rmBmLoader } =
    useRemoveBookmarkPost(data?._id);

  const bookmarked = user?.bookmarks?.includes(data?._id);

  function handleShowMenu() {
    setShowMenu((prev) => !prev);
  }

  async function handleLike() {
    likePost({ userId, postId: data?._id });
  }

  async function handleRemoveLike() {
    removeLike({ userId, postId: data?._id });
  }

  async function handleBookmark() {
    bookmarked
      ? removeBookmarkPost({ userId, postId: data?._id })
      : bookmarkPost({ userId, postId: data?._id });
  }

  function handleClick() {
    navigate(`/users/${data?.user?._id}`);
  }

  const { mutate: deletePostById, isLoading } = useDeletePost();

  async function deletePost() {
    deletePostById({ userId: userId, postId: data._id });
  }

  if (isLoading) {
    return <li>loading...</li>;
  }

  return (
    <li className="py-2 px-2 md:px-0 sm:py-8 border-solid border-b-2 border-light_gray mb-4 cursor-pointer">
      <div className="flex items-center">
        <Avatar
          {...stringAvatar(`${data?.user?.name}`)}
          onClick={handleClick}
        />
        <div className="ml-2">
          <h5
            className="text-sm font-medium hover-underline-animation "
            onClick={handleClick}
          >
            {data?.user?.name}
          </h5>
          <p className="text-xs text-gray">
            Shared a post • {formatDate(data?.updatedAt?.seconds)}
          </p>
        </div>
        <button className="relative ml-auto" onClick={handleShowMenu}>
          <CiMenuKebab />

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
      <p className="leading-loose px-1 py-2 sm:px-14">{data?.description}</p>
      <div className="flex px-1 py-2 sm:px-12 items-center gap-12 ">
        <button className="p-2 rounded-3xl hover:bg-light_green hover:text-green">
          <MdOutlineInsertComment size={"1.25rem"} />
        </button>
        <div className="flex items-center ">
          <button
            className={`p-2 rounded-3xl hover:bg-light_green hover:text-green ${
              like && "text-green"
            }`}
            onClick={like ? handleRemoveLike : handleLike}
          >
            {like ? (
              <RiThumbUpFill size={"1.25rem"} />
            ) : (
              <RiThumbUpLine size={"1.25rem"} />
            )}
          </button>
          <p className="p-2 text-sm">{likes}</p>
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

function formatDate(timestampInSeconds) {
  const date = new Date(timestampInSeconds * 1000); // Convert seconds to milliseconds
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
