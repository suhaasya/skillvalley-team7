import React, { useEffect } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard/PostCard";
import Spinner from "../components/Spinner";
import { useBookmarkPost, useGetBoookmarkPosts } from "../hooks/usePostsData";
import { auth, db } from "../firebase.config";
import { useGetUser } from "../hooks/useUserData";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";

export default function BookmarksPage() {
  const userId = auth.currentUser?.uid;
  const { isLoading: userLoader, data: user } = useGetUser(userId);
  const { data: postsData, isLoading } = useGetBoookmarkPosts(user?.bookmarks);

  useEffect(() => {}, [user?.bookmarks?.length]);

  if (isLoading || userLoader) {
    return <Spinner />;
  }

  return (
    <Layout bookmarks={true}>
      <ul className="md:px-24 py-2">
        {postsData?.map((post) => (
          <PostCard data={post} key={post._id} />
        ))}
        <li className="mb-4 text-xs pb-4 text-center">
          That’s it so far. Hope you got some work inspiration from your
          network! :)
        </li>
      </ul>
    </Layout>
  );
}
