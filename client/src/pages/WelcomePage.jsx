import React from "react";
import { useState } from "react";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import { getAuth, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { promiseHandler } from "../utils/promiseHandler";
import { createUser } from "../utils/firebase/user";

export default function WelcomePage() {
  const auth = getAuth();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => {
      return promiseHandler(createUser(data));
    },
  });

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    briefBio: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (isValidform(userData)) {
      try {
        updateProfile(auth.currentUser, {
          displayName: `${userData.firstName}${userData.lastName}`,
        });

        const userDataCopy = {
          ...userData,
          bookmarks: [],
          email: auth.currentUser.email,
        };

        const data = {
          id: auth.currentUser.uid,
          body: userDataCopy,
        };

        await mutate(data);

        setUserData({
          firstName: "",
          lastName: "",
          briefBio: "",
        });

        toast.success("Account create successfully please login");
        navigate("/login");
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <FormContainer onSubmit={onSubmit}>
      <h3 className="text-2xl font-medium text-center">
        Welcome to Scream-One 👋
      </h3>
      <p className="text-gray text-center">
        First thing first, tell use a bit about yourself.
      </p>
      <Input
        name="firstName"
        value={userData.firstName}
        label={"First Name"}
        required={true}
        onChange={handleChange}
      />
      <Input
        name="lastName"
        value={userData.lastName}
        label={"Last Name"}
        required={true}
        onChange={handleChange}
      />
      <Input
        name="briefBio"
        value={userData.briefBio}
        label={"Brief bio"}
        required={true}
        type="textarea"
        onChange={handleChange}
        placeholder={
          "Ex: Product Designer @ Scream-One and more that just your job title 😇"
        }
      />
      <div className="text-right">
        <Button size={"medium"} type={"success"} isLoading={isLoading}>
          Continue
        </Button>
      </div>
    </FormContainer>
  );
}

function isValidform(form) {
  if (form.firstName === "") {
    toast.warn("please fill first name.");
    return false;
  }
  if (form.lastName === "") {
    toast.warn("please fill last name.");
    return false;
  }
  if (form.briefBio === "") {
    toast.warn("please fill brief bio.");
    return false;
  }

  return true;
}
