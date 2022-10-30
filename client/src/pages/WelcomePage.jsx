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

export default function WelcomePage() {
  const auth = getAuth();
  const navigate = useNavigate();

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

    if (
      userData.firstName === "" ||
      userData.lastName === "" ||
      userData.briefBio === ""
    ) {
      toast.error("please fill all the data");
    } else {
      try {
        updateProfile(auth.currentUser, {
          displayName: `${userData.firstName}${userData.lastName}`,
        });

        const userDataCopy = {
          ...userData,
          bookmarks: [],
          email: auth.currentUser.email,
        };

        await setDoc(doc(db, "users", auth.currentUser.uid), userDataCopy);
        await setDoc(doc(db, "userChats", auth.currentUser.uid), {});
        setUserData({
          firstName: "",
          lastName: "",
          briefBio: "",
        });

        navigate("/login");
        toast.success("Account create successfully please login");
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
        <Button size={"medium"} type={"success"}>
          Continue
        </Button>
      </div>
    </FormContainer>
  );
}
