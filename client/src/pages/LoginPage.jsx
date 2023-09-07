import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { FcLock } from "react-icons/fc";
import GoogleSignUpButton from "../components/GoogleSignUpButton";
import FormContainer from "../components/FormContainer";
import { useState } from "react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { toast } from "react-toastify";

export default function LoginPage() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <FormContainer onSubmit={onSubmit}>
      <div className="flex items-center justify-center">
        <h3 className="text-2xl font-medium">Login to Scream-One</h3>
        <FcLock size={"1.5rem"} />
      </div>
      <GoogleSignUpButton onClick={() => {}} />
      <p className="text-center">or</p>
      <Input
        label="Email"
        name="email"
        value={loginData.email}
        onChange={handleChange}
      />
      <Input
        label="Password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        type="password"
      />
      <div className="flex justify-between mt-4">
        <Link to="/forgot-password">
          <span className="text-green hover:underline cursor-pointer">
            Forgot Password
          </span>
        </Link>
        <Button type="success" size="medium">
          Login
        </Button>
      </div>
      <p className="text-center">
        Don’t have an account?{" "}
        <Link to={"/signup"}>
          <span className="text-green hover:underline cursor-pointer">
            SignUp
          </span>
        </Link>
      </p>
    </FormContainer>
  );
}
