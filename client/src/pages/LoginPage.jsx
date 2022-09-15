import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { FcLock } from "react-icons/fc";
import GoogleSignUpButton from "../components/GoogleSignUpButton";
import FormContainer from "../components/FormContainer";
import { useState } from "react";

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";

export default function LoginPage() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [users, setUsers] = useState(null);

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
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        navigate("/home");
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
      <div className="flex items-center justify-center">
        <h3 className="text-2xl font-medium">Login to Scream-One</h3>
        <FcLock size={"1.5rem"} />
      </div>
      <GoogleSignUpButton onClick={signWithGoogle} />
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
        <p>Forgot Password</p>
        <Button type="success" size="medium">
          Login
        </Button>
      </div>
      <p className="text-center">
        Don’t have an account?{" "}
        <Link to={"/signup"}>
          <span className="text-green">SignUp</span>
        </Link>
      </p>
    </FormContainer>
  );
}
