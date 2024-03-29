import React from "react";
import Avatar from "../components/Avatar";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard/PostCard";
import Spinner from "../components/Spinner";
import stringAvatar from "../utils/stringAvatar";

import { useGetUser, useGetUserPosts } from "../hooks/useUserData";
import { auth } from "../firebase.config";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { id } = useParams();
  const userId = id || auth.currentUser?.uid;
  const {
    isLoading: userLoader,
    error: userError,
    data: profile,
  } = useGetUser(userId);

  const {
    data: postsData,
    isLoading,
    error,
    isFetching,
  } = useGetUserPosts(userId);

  if (userError) {
    return <p>{userError.message}</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if (userLoader || isLoading || isFetching) {
    return <Spinner />;
  }

  return (
    <Layout profile={true}>
      <div className="flex justify-between items-start p-8 bg-light_white border-solid border-b border-light_gray">
        <div>
          <h3 className="text-3xl font-semibold">
            {profile?.firstName} {profile?.lastName}
          </h3>
          <p className="text-xl">{profile?.briefBio}</p>
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
          {postsData?.map((post) => (
            <PostCard data={post} key={post._id} />
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
