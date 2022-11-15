import React from "react";
import Avatar from "../components/Avatar";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard/PostCard";
import Spinner from "../components/Spinner";
import stringAvatar from "../utils/stringAvatar";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { user, loading } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);

  const userPosts = posts.filter((post) => post.user.uid === user._id);

  if (loading || !user.firstName) {
    return <Spinner />;
  }

  return (
    <Layout profile={true}>
      <div className="flex justify-between items-start p-8 bg-light_white border-solid border-b border-light_gray">
        <div>
          <h3 className="text-3xl font-semibold">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-xl">{user.briefBio}</p>
        </div>
        <div className="block sm:hidden">
          <Avatar
            {...stringAvatar(
              `${user?.firstName.trim()} ${user?.lastName.trim()}`
            )}
          />
        </div>
        <div className="hidden sm:block">
          <Avatar
            type={"secondary"}
            {...stringAvatar(
              `${user?.firstName.trim()} ${user?.lastName.trim()}`
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
                showDelete={user._id === post.user.uid}
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
