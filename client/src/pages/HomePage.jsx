import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard/PostCard";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import getDate from "../utils/getDate";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { user, loading } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);

  const { setState } = useContext(GlobalContext);
  const [post, setPost] = useState("");

  function handleChange(e) {
    setPost(e.target.value);
  }

  async function sharePost(e) {
    e.preventDefault();
    if (post.length > 0) {
      const id = toast.loading("Posting...");
      setState(true);
      try {
        const postData = {
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            uid: user._id,
          },
          post: {
            message: post,

            likes: [],
            date: getDate(),
          },
        };
        await setDoc(doc(db, "posts", uuid()), postData);
        setPost("");
        toast.update(id, {
          render: "Successfully Posted",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        setState(false);
      } catch (error) {
        toast.update(id, {
          render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
        setState(false);
      }
    } else {
      toast.error("Post cant be empty");
    }
  }

  if (loading || !user.firstName) {
    return <Spinner />;
  }

  return (
    <Layout home={true}>
      <form
        className=" px-2 md:px-24 py-8 bg-dark_white border-solid border-b-2 border-light_gray"
        onSubmit={sharePost}
      >
        <Input
          type={"textarea"}
          label="Write a post"
          name="post"
          row={"4"}
          value={post}
          onChange={handleChange}
        />
        <div className="text-right mt-4">
          <Button type="success" size={"medium"}>
            Share
          </Button>
        </div>
      </form>
      <ul className="md:px-24 py-2">
        {posts &&
          posts.map((post) => (
            <PostCard
              authorName={`${post.user.firstName.trim()} ${post.user.lastName.trim()}`}
              publishedDate={post.post.date}
              message={post.post.message}
              likes={post.post.likes}
              id={post._id}
              key={post._id}
              showDelete={user._id === post.user.uid}
              authorId={post.user.uid}
            />
          ))}
        <li className="mb-12 text-xs pb-4 text-center">
          That’s it so far. Hope you got some work inspiration from your
          network! :)
        </li>
      </ul>
    </Layout>
  );
}
