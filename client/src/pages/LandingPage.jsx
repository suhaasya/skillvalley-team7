import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import GoogleSignUpButton from "../components/GoogleSignUpButton";
import Logo from "../components/Logo";
import { GlobalContext } from "../context/GlobalState";

export default function LandingPage() {
  const { signWithGoogle } = useContext(GlobalContext);

  return (
    <section className="px-[2%] md:px-[5%] py-[0.5%] lg:px-[12%] bg-dark_yellow h-screen">
      <nav className="flex items-center">
        <Link to={"/"}>
          <Logo />
        </Link>
        <div className="flex gap-4 ml-auto">
          <Link to={"/login"}>
            <Button size={"medium"}>Login</Button>
          </Link>
          <Link to={"signup"}>
            <Button size={"medium"} type="success">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>
      <section className="flex flex-col items-center justify-center h-4/5 gap-8 text-center">
        <h1 className="text-6xl">The Learning Network</h1>
        <h3 className="text-2xl">for people in tech and students.</h3>
        <GoogleSignUpButton type="secondary" onClick={signWithGoogle} />
        <span>or</span>
        <Link to="signup">
          <span className="border-solid border-b-2 border-green font-medium hover:border-dark_green">
            Signup w/ Email
          </span>
        </Link>
      </section>
    </section>
  );
}
