import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import GoogleSignUpButton from "../components/GoogleSignUpButton";
import Input from "../components/Input";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { GlobalContext } from "../context/GlobalState";

export default function SignupPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { signWithGoogle } = useContext(GlobalContext);
  const [signupData, setSignupData] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
      .then((userCredential) => {
        navigate("/welcome");
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setSignupData({ email: "", password: "" });
  }

  return (
    <FormContainer onSubmit={onSubmit}>
      <h3 className="text-center text-2xl font-medium">Join Scream-One</h3>
      <GoogleSignUpButton onClick={signWithGoogle} />
      <p className="text-center">or</p>
      <Input
        label={"Email"}
        name="email"
        value={signupData.email}
        onChange={handleChange}
      />
      <Input
        type={"password"}
        placeholder="Min 8 Characters"
        name="password"
        value={signupData.password}
        onChange={handleChange}
        label={"Password"}
      />
      <div className="text-center">
        <Button type="success" size="medium">
          Join Scream-One
        </Button>
      </div>
      <p className="text-center text-xs">
        By clicking "Join Scream-One" you agree to our Code of Conduct, Terms of
        Service and Privacy Policy.
      </p>
      <p className="text-center">
        Already have an Account?{" "}
        <Link to={"/login"}>
          <span className="text-green hover:underline cursor-pointer">
            Login
          </span>
        </Link>
      </p>
    </FormContainer>
  );
}
