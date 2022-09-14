import React from "react";
import Layout from "../components/Layout";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { useEffect } from "react";
import { useState } from "react";

import PostCard from "../components/PostCard/PostCard";
import Spinner from "../components/Spinner";
import { db } from "../firebase.config";

export default function BookmarksPage() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [postsData, setPostsData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // User Data
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser({ _id: userSnap.id, ...userSnap.data() });
      }

      // User Post Data
      const postSnap = await getDocs(collection(db, "posts"));
      const posts = [];
      postSnap.forEach((doc) => {
        posts.push({ _id: doc.id, ...doc.data() });
      });

      setPostsData(posts);

      setLoading(false);
    }

    setTimeout(fetchData, 1000);
  }, [auth.currentUser.uid, user]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout bookmarks={true}>
      <ul className="md:px-24 py-2">
        {postsData
          .filter((post) => user.bookmarks.indexOf(post._id) !== -1)
          .map((post) => (
            <PostCard
              authorName={`${post.user.firstName.trim()} ${post.user.lastName.trim()}`}
              publishedDate={post.post.date}
              message={post.post.message}
              likes={post.post.likes}
              id={post._id}
              key={post._id}
              setLoading={setLoading}
              showDelete={user._id === post.user.uid}
              currentUser={user}
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
