import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import SettingsCard from "../components/SettingsCard";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { deleteUser, getAuth, updatePassword } from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteUser,
  useGetUser,
  useUpdatePassword,
  useUpdateUser,
} from "../hooks/useUserData";

export default function SettingsPage() {
  const userId = auth.currentUser?.uid;

  const navigate = useNavigate();
  const { isLoading: userLoader, data } = useGetUser(userId);
  const { mutate: updatePassword, isLoading: updatePasswordLoader } =
    useUpdatePassword(auth?.currentUser);
  const { mutate: deleteUserAcc, isLoading: deleteUseAccLoader } =
    useDeleteUser(auth?.currentUser);
  const { mutate: updateUser, isLoading: updateUserLoading } =
    useUpdateUser(userId);
  const [currentUserData, setCurrentUserData] = useState({
    firstName: "",
    lastName: "",
    briefBio: "",
  });

  useEffect(() => {
    setCurrentUserData({
      firstName: data?.firstName,
      lastName: data?.lastName,
      briefBio: data?.briefBio,
    });
  }, [data?._id]);

  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setPasswordSettings((prev) => ({ ...prev, [name]: value }));
    setCurrentUserData((prev) => ({ ...prev, [name]: value }));
  }

  async function updateUserData(e) {
    e.preventDefault();
    updateUser(currentUserData);
  }

  function changePassword(e) {
    e.preventDefault();
    if (passwordSettings.newPassword === passwordSettings.confirmNewPassword) {
      updatePassword(passwordSettings.newPassword);
      setPasswordSettings({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
    toast.warning("password not matching!");
  }

  async function deleteAccount() {
    await deleteUserAcc();
    navigate("/");
  }

  if (userLoader) {
    return <Spinner />;
  }

  return (
    <Layout>
      <section className="px-[2%] py-4 flex flex-col gap-4 mb-12">
        <SettingsCard
          title={"Basic Profile"}
          onSubmit={updateUserData}
          loading={updateUserLoading}
        >
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <Input
              label={"First Name"}
              required={true}
              name={"firstName"}
              value={currentUserData.firstName}
              onChange={handleChange}
            />
            <Input
              label={"Last Name"}
              required={true}
              name={"lastName"}
              value={currentUserData.lastName}
              onChange={handleChange}
            />
            <div className="col-span-2">
              <Input
                type="textarea"
                label={"Brief bio"}
                name={"briefBio"}
                required={true}
                value={currentUserData.briefBio}
                onChange={handleChange}
              />
              <p className="text-xs m-1 text-gray">
                This is the very first thing peers read about you after your
                name. Be a little descriptive 🤙
              </p>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title={"Change Password"}
          onSubmit={changePassword}
          loading={updatePasswordLoader}
        >
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

          <Button
            type={"secondary"}
            onClick={deleteAccount}
            isLoading={deleteUseAccLoader}
          >
            Delete my account
          </Button>
        </SettingsCard>
      </section>
    </Layout>
  );
}
