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
import { isUserExists, signWithGoogle } from "../utils/firebaseFunctions";

export default function LoginPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [showDummy, setShowDummy] = useState(false);
  const [loader, setLoader] = useState(false);

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
    setLoader(true);

    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then(async (user) => {
        const isValidUser = await isUserExists(user?.user?.uid);

        if (isValidUser) {
          navigate("/home");
          return;
        }

        navigate("/welcome");
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setLoader(false);
  }

  async function handleSignWithGoogle() {
    const user = await signWithGoogle();

    if (user) {
      navigate("/home");
      return;
    }

    navigate("/welcome");
    return;
  }

  return (
    <FormContainer onSubmit={onSubmit}>
      <div className="flex items-center justify-center">
        <h3 className="text-2xl font-medium">Login to Scream-One</h3>
        <FcLock size={"1.5rem"} />
      </div>
      <GoogleSignUpButton onClick={handleSignWithGoogle} />
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
        <Button type="success" size="medium" isLoading={loader}>
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
        <p
          className="font-medium cursor-pointer"
          onClick={() => setShowDummy((prev) => !prev)}
        >
          {showDummy ? "hide" : "click here for"} dummy credentials
        </p>
        {showDummy ? (
          <p>email:howoha9353@fandsend.com pass: Password123</p>
        ) : null}
        {showDummy ? (
          <p>email:soyed50743@cdeter.com pass: Password123</p>
        ) : null}
      </p>
    </FormContainer>
  );
}
