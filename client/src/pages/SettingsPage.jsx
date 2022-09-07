import React from "react";
import Layout from "../components/Layout";
import SettingsCard from "../components/SettingsCard";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import userData from "../backend/db/userData";

export default function SettingsPage() {
  const [basicSettings, setBasicSettings] = useState({
    ...userData,
  });

  const [passwordSettings, setPasswordSettings] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setBasicSettings((prev) => ({ ...prev, [name]: value }));
    setPasswordSettings((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Layout>
      <section className="px-[2%] py-4 flex flex-col gap-4">
        <SettingsCard title={"Basic Profile"} onSubmit={handleSubmit}>
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <Input
              placeholder={"First Name"}
              required={true}
              value={basicSettings.FirstName}
              onChange={handleChange}
            />
            <Input
              placeholder={"Last Name"}
              required={true}
              value={basicSettings.LastName}
              onChange={handleChange}
            />
            <div className="col-span-2">
              <Input
                type="textarea"
                placeholder={"Brief bio"}
                required={true}
                value={basicSettings.Briefbio}
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
              placeholder={"Current Password"}
              required={true}
              type={"password"}
              onChange={handleChange}
              value={passwordSettings.CurrentPassword}
            />
            <div></div>
            <Input
              placeholder={"New Password"}
              type={"password"}
              required={true}
              onChange={handleChange}
              value={passwordSettings.NewPassword}
            />
            <Input
              placeholder={"Confirm New Password"}
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
