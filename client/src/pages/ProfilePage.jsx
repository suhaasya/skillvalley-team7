import React from "react";
import Avatar from "../components/Avatar";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard/PostCard";
import Spinner from "../components/Spinner";
import stringAvatar from "../utils/stringAvatar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.user);

  const { id } = useParams();

  const userPosts = posts.filter((post) => post.user.uid === profile?._id);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const userRef = doc(db, "users", id || auth.currentUser?.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setProfile(userSnap.data());
          setLoading(false);
        } else {
          toast.error("user not found");
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
    fetchUser();
  }, [auth.currentUser?.uid, dispatch, id]);

  if (loading || !profile || !user.firstName) {
    return <Spinner />;
  }

  return (
    <Layout profile={true}>
      <div className="flex justify-between items-start p-8 bg-light_white border-solid border-b border-light_gray">
        <div>
          <h3 className="text-3xl font-semibold">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-xl">{profile.briefBio}</p>
        </div>
        <div className="block sm:hidden">
          <Avatar
            {...stringAvatar(
              `${profile?.firstName.trim()} ${profile?.lastName.trim()}`
            )}
          />
        </div>
        <div className="hidden sm:block">
          <Avatar
            type={"secondary"}
            {...stringAvatar(
              `${profile?.firstName.trim()} ${profile?.lastName.trim()}`
            )}
          />
        </div>
      </div>
      <div className="px-8">
        <div className="py-2 px-4 border-solid border-b border-light_gray">
          Posts
        </div>

        <ul className="md:px-24 py-2">
          {userPosts &&
            userPosts.map((post) => (
              <PostCard
                authorName={`${post.user.firstName.trim()} ${post.user.lastName.trim()}`}
                publishedDate={post.post.date}
                message={post.post.message}
                likes={post.post.likes}
                id={post._id}
                key={post._id}
                showDelete={profile._id === post.user.uid}
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
