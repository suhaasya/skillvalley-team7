import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard/PostCard";
import posts from "../backend/db/posts";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";

export default function HomePage() {
  const [post, setPost] = useState("");

  function handleChange(e) {
    setPost(e.target.value);
  }

  function sharePost(e) {
    e.preventDefault();
    setPost("");
  }

  return (
    <Layout home={true}>
      <form
        className=" px-2 md:px-24 py-8 bg-dark_white border-solid border-b-2 border-light_gray"
        onSubmit={sharePost}
      >
        <Input
          type={"textarea"}
          placeholder="Write a post"
          name="post"
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
        {posts.map((post) => (
          <PostCard
            authorName={`${post.user.firstName} ${post.user.lastName}`}
            publishedDate={post.post.date}
            message={post.post.message}
            likes={post.post.likes}
            key={post._id}
          />
        ))}
        <li className="mb-4 text-xs pb-4 text-center">
          That’s it so far. Hope you got some work inspiration from your
          network! :)
        </li>
      </ul>
    </Layout>
  );
}
