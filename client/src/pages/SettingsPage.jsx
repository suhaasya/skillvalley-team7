import React from "react";
import Layout from "../components/Layout";
import SettingsCard from "../components/SettingsCard";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { deleteUser, getAuth, updatePassword } from "firebase/auth";
import { useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SettingsPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

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
    fetchData();
  }, [auth.currentUser?.uid]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setPasswordSettings((prev) => ({ ...prev, [name]: value }));
  }

  async function updateUserData(e) {
    e.preventDefault();
    const userRef = doc(db, "users", auth.currentUser?.uid);
    const id = toast.loading("Updating...");

    await updateDoc(userRef, { ...user });
    toast.update(id, {
      render: "Successfully Changed",
      type: "success",
      isLoading: false,
      autoClose: 1000,
    });
  }

  function changePassword(e) {
    e.preventDefault();
    if (passwordSettings.newPassword === passwordSettings.confirmNewPassword) {
      const id = toast.loading("Updating...");
      updatePassword(auth.currentUser, passwordSettings.newPassword)
        .then(() => {
          // Update successful.
          toast.update(id, {
            render: "Successfully Changed",
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
        })
        .catch((error) => {
          // An error ocurred
          toast.update(id, {
            render: error.message,
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
        });
    } else {
      toast.error("Passwords are not matching");
    }
  }

  function deleteAccount() {
    const userAction = window.confirm("are you sure you wanna do this?");

    if (userAction) {
      const id = toast.loading("Deleting...");

      deleteUser(auth.currentUser)
        .then(() => {
          deleteUserData(user._id);

          postsData.forEach((post) => {
            if (post.user.uid === user._id) {
              deleteUserPost(post._id);
            }
          });

          toast.update(id, {
            render: "Successfully Deleted your account",
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
          navigate("/");
        })
        .catch((error) => {
          // An error ocurred
          toast.update(id, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        });
    }
  }

  async function deleteUserPost(id) {
    await deleteDoc(doc(db, "posts", id));
  }
  async function deleteUserData(id) {
    await deleteDoc(doc(db, "users", id));
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      <section className="px-[2%] py-4 flex flex-col gap-4">
        <SettingsCard title={"Basic Profile"} onSubmit={updateUserData}>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <Input
              label={"First Name"}
              required={true}
              name={"firstName"}
              value={user.firstName}
              onChange={handleChange}
            />
            <Input
              label={"Last Name"}
              required={true}
              name={"lastName"}
              value={user.lastName}
              onChange={handleChange}
            />
            <div className="col-span-2">
              <Input
                type="textarea"
                label={"Brief bio"}
                name={"briefBio"}
                required={true}
                value={user.briefBio}
                onChange={handleChange}
              />
              <p className="text-xs m-1 text-gray">
                This is the very first thing peers read about you after your
                name. Be a little descriptive 🤙
              </p>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title={"Change Password"} onSubmit={changePassword}>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <Input
              label={"Current Password"}
              name={"currentPassword"}
              required={true}
              type={"password"}
              onChange={handleChange}
              value={passwordSettings.currentPassword}
            />
            <div></div>
            <Input
              label={"New Password"}
              name={"newPassword"}
              type={"password"}
              required={true}
              onChange={handleChange}
              value={passwordSettings.newPassword}
            />
            <Input
              label={"Confirm New Password"}
              name={"confirmNewPassword"}
              type={"password"}
              required={true}
              onChange={handleChange}
              value={passwordSettings.confirmNewPassword}
            />
          </div>
        </SettingsCard>

        <SettingsCard title={"Delete Account"} save={false}>
          <p className="text-sm font-light">
            Delete your account and account data. This can’t be undone!
          </p>

          <Button type={"secondary"} onClick={deleteAccount}>
            Delete my account
          </Button>
        </SettingsCard>
      </section>
    </Layout>
  );
}
