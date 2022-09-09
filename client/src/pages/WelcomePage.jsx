import React from "react";
import { useState } from "react";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";

export default function WelcomePage() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    briefBio: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
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
