import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard/PostCard";
import Input from "../components/Input";
import Button, { Spin } from "../components/Button";
import { useState } from "react";

import getDate from "../utils/getDate";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase.config";
import Spinner from "../components/Spinner";
import usePostsData, { useAddPostData } from "../hooks/usePostsData";
import useUserData from "../hooks/useUserData";

export default function HomePage() {
  const userId = auth.currentUser?.uid;
  const { postsLoader, postsError, postsData } = usePostsData();
  const { userLoader, userError, userData: user } = useUserData(userId);

  const { mutate: addPost, isLoading } = useAddPostData();

  const [post, setPost] = useState("");

  function handleChange(e) {
    setPost(e.target.value);
  }

  const postDetails = {
    description: post,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    user: {
      _id: userId,
      name: user?.firstName + " " + user?.lastName,
    },
    likes: 0,
  };

  function sharePost(e) {
    e.preventDefault();

    const data = {
      userId: auth?.currentUser?.uid,
      postData: postDetails,
    };

    addPost(data);
    setPost("");
  }

  if (userLoader || postsLoader) {
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
          <Button type="success" size={"medium"} disabled={isLoading}>
            Share
          </Button>
        </div>
      </form>
      {
        <p className="flex items-start justify-center pt-4">
          {" "}
          {isLoading ? <Spin /> : null}{" "}
        </p>
      }
      <ul className="md:px-24 py-2">
        {postsData?.map((post) => (
          <PostCard data={post} key={post._id} />
        ))}
        <li className="mb-12 text-xs pb-4 text-center">
          That’s it so far. Hope you got some work inspiration from your
          network! :)
        </li>
      </ul>
    </Layout>
  );
}
