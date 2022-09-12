import React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard/PostCard";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import getDate from "../utils/getDate";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { getDoc, setDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";

export default function HomePage() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser?.uid;

  function handleChange(e) {
    setPost(e.target.value);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const docRef = doc(db, "users", currentUser);
      const docSnap = await getDoc(docRef);

      const querySnapshot = await getDocs(collection(db, "posts"));
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ _id: doc.id, ...doc.data() });
      });
      setPostsData(posts);

      if (docSnap.exists()) {
        setUser(docSnap.data());
        setLoading(false);
      }
    };

    fetchUsers();
  });

  async function sharePost(e) {
    e.preventDefault();
    try {
      const postData = {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          uid: user.useruid,
        },
        post: {
          message: post,

          likes: 0,
          date: getDate(),
        },
      };
      await setDoc(doc(db, "posts", uuid()), postData);
      setPost("");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`${errorCode} ${errorMessage}`);
    }
  }

  if (loading) {
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
        {postsData.map((post) => (
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
