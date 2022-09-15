import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Avatar from "../components/Avatar";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard/PostCard";
import Spinner from "../components/Spinner";
import { db } from "../firebase.config";
import stringAvatar from "../utils/stringAvatar";

export default function ProfilePage() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [postsData, setPostsData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [changeState, setChangeState] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // User Data
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData({ _id: userSnap.id, ...userSnap.data() });
      }

      // User Post Data
      const postSnap = await getDocs(collection(db, "posts"));
      const posts = [];
      postSnap.forEach((doc) => {
        posts.push({ _id: doc.id, ...doc.data() });
      });
      setPostsData(
        posts.filter((post) => post.user.uid === auth.currentUser.uid)
      );

      setLoading(false);
    }
    fetchData();
  }, [auth.currentUser.uid, loading, changeState]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Layout profile={true}>
      <div className="flex justify-between items-start p-8 bg-light_white border-solid border-b border-light_gray">
        <div>
          <h3 className="text-3xl font-semibold">
            {userData.firstName} {userData.lastName}
          </h3>
          <p className="text-xl">{userData.briefBio}</p>
        </div>
        <div className="block sm:hidden">
          <Avatar
            {...stringAvatar(
              `${userData?.firstName.trim()} ${userData?.lastName.trim()}`
            )}
          />
        </div>
        <div className="hidden sm:block">
          <Avatar
            type={"secondary"}
            {...stringAvatar(
              `${userData?.firstName.trim()} ${userData?.lastName.trim()}`
            )}
          />
        </div>
      </div>
      <div className="px-8">
        <div className="py-2 px-4 border-solid border-b border-light_gray">
          Posts
        </div>

        <ul className="md:px-24 py-2">
          {postsData.map((post) => (
            <PostCard
              authorName={`${post.user.firstName.trim()} ${post.user.lastName.trim()}`}
              publishedDate={post.post.date}
              message={post.post.message}
              likes={post.post.likes}
              id={post._id}
              key={post._id}
              setChangeState={setChangeState}
              showDelete={userData._id === post.user.uid}
              currentUser={userData}
            />
          ))}
          <li className="mb-4 text-xs pb-4 text-center">
            That’s it so far. Hope you got some work inspiration from your
            network! :)
          </li>
        </ul>
      </div>
    </Layout>
  );
}
