import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  function handleChange(e) {
    setEmail(e.target.value);
  }
  function sendMail(e) {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then((res) => {
        toast.success("Password reset email sent! Please check.");
        setEmail("");
      })
      .catch((error) => {
        toast.error(error.message);
        setEmail("");
      });
  }
  return (
    <FormContainer onSubmit={sendMail}>
      <h3 className="text-2xl font-medium text-center">Forgot Password</h3>
      <p className="text-sm">
        We will send an email. If you don’t see it, please check your spam
        folder.
      </p>
      <Input label="Email" name="email" value={email} onChange={handleChange} />

      <div className="flex justify-between mt-4">
        <Link to="/login">
          <p>
            Remember password?{" "}
            <span className="text-green hover:underline cursor-pointer">
              Log in
            </span>
          </p>
        </Link>
        <Button type="success" size="medium">
          Continue
        </Button>
      </div>
    </FormContainer>
  );
}
