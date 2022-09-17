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
import {
  getDoc,
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

export default function HomePage() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [post, setPost] = useState("");
  const [changeState, setChangeState] = useState(false);
  const [loading, setLoading] = useState(true);

  function handleChange(e) {
    setPost(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      // User Data
      const userRef = doc(db, "users", auth.currentUser?.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUser({ _id: userSnap.id, ...userSnap.data() });
      }

      // User Post Data
      const q = query(collection(db, "posts"), orderBy("post", "desc"));
      const postSnap = await getDocs(q);
      const posts = [];
      postSnap.forEach((doc) => {
        posts.push({ _id: doc.id, ...doc.data() });
      });
      setPostsData(posts);

      setLoading(false);
    }
    setTimeout(fetchData, 1000);
  }, [auth.currentUser?.uid, loading, changeState]);

  async function sharePost(e) {
    e.preventDefault();

    if (post.length > 0) {
      const id = toast.loading("Posting...");
      setChangeState(true);
      try {
        const postData = {
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            uid: user._id,
          },
          post: {
            message: post,

            likes: 0,
            date: getDate(),
          },
        };
        await setDoc(doc(db, "posts", uuid()), postData);
        setPost("");
        toast.update(id, {
          render: "Successfully Posted",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        setChangeState(false);
      } catch (error) {
        toast.update(id, {
          render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
        setChangeState(false);
      }
    } else {
      toast.error("Post cant be empty");
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
          row={"4"}
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
            authorName={`${post.user.firstName.trim()} ${post.user.lastName.trim()}`}
            publishedDate={post.post.date}
            message={post.post.message}
            likes={post.post.likes}
            id={post._id}
            key={post._id}
            setChangeState={setChangeState}
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
