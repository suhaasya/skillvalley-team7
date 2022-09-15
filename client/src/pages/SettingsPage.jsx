import React from "react";
import Layout from "../components/Layout";
import SettingsCard from "../components/SettingsCard";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";

export default function SettingsPage() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [passwordSettings, setPasswordSettings] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });

  useEffect(() => {
    async function fetchData() {
      // User Data
      const userRef = doc(db, "users", auth.currentUser?.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUser({ _id: userSnap.id, ...userSnap.data() });
      }
      setLoading(false);
    }
    fetchData();
  }, [auth.currentUser?.uid]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setPasswordSettings((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userRef = doc(db, "users", auth.currentUser?.uid);
    setLoading(true);
    await updateDoc(userRef, { ...user });
    setLoading(false);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      <section className="px-[2%] py-4 flex flex-col gap-4">
        <SettingsCard title={"Basic Profile"} onSubmit={handleSubmit}>
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

        <SettingsCard title={"Change Password"}>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <Input
              label={"Current Password"}
              required={true}
              type={"password"}
              onChange={handleChange}
              value={passwordSettings.CurrentPassword}
            />
            <div></div>
            <Input
              label={"New Password"}
              type={"password"}
              required={true}
              onChange={handleChange}
              value={passwordSettings.NewPassword}
            />
            <Input
              label={"Confirm New Password"}
              type={"password"}
              required={true}
              onChange={handleChange}
              value={passwordSettings.ConfirmNewPassword}
            />
          </div>
        </SettingsCard>

        <SettingsCard title={"Delete Account"} save={false}>
          <p className="text-sm font-light">
            Delete your account and account data. This can’t be undone!
          </p>

          <Button type={"secondary"} onClick={() => console.log("Suhas")}>
            Delete my account
          </Button>
        </SettingsCard>
      </section>
    </Layout>
  );
}
