import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import GoogleSignUpButton from "../components/GoogleSignUpButton";
import Input from "../components/Input";

export default function SignupPage() {
  const [signupData, setSignupData] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <FormContainer>
      <h3 className="text-center text-2xl font-medium">Join Scream-One</h3>
      <GoogleSignUpButton />
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
          <span className="text-green">Login</span>
        </Link>
      </p>
    </FormContainer>
  );
}
