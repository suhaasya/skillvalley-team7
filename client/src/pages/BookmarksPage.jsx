import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard/PostCard";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";

export default function BookmarksPage() {
  const { user, loading } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);

  if (loading || !user.firstName) {
    return <Spinner />;
  }

  return (
    <Layout bookmarks={true}>
      <ul className="md:px-24 py-2">
        {posts &&
          posts
            .filter((post) => user.bookmarks.indexOf(post._id) !== -1)
            .map((post) => (
              <PostCard
                authorName={`${post.user.firstName.trim()} ${post.user.lastName.trim()}`}
                publishedDate={post.post.date}
                message={post.post.message}
                likes={post.post.likes}
                id={post._id}
                key={post._id}
                showDelete={user._id === post.user.uid}
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
