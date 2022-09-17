import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import GoogleSignUpButton from "../components/GoogleSignUpButton";
import Input from "../components/Input";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";

export default function SignupPage() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({ email: "", password: "" });

  useEffect(() => {
    async function fetchData() {
      // User Post Data
      const usersSnap = await getDocs(collection(db, "users"));
      const users = [];
      usersSnap.forEach((doc) => {
        users.push({ _id: doc.id, ...doc.data() });
      });
      setUsers(users);
    }
    fetchData();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();

    setSignupData({ email: "", password: "" });

    createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
      .then((userCredential) => {
        navigate("/welcome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode} ${errorMessage}`);
      });
  }

  function signWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userId = result.user.uid;

        if (users.some((user) => user._id === userId)) {
          navigate("/home");
        } else {
          navigate("/welcome");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode} ${errorMessage}`);
      });
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
          <span className="text-green">Login</span>
        </Link>
      </p>
    </FormContainer>
  );
}
