import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";

export default function LandingPage() {
  return (
    <section className="px-[2%] md:px-[5%] py-[0.5%] lg:px-[12%]">
      <nav className="flex items-center">
        <Logo />
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
    </section>
  );
}
