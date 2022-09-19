import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignUpButton({ onClick, type }) {
  return type === "secondary" ? (
    <div
      className="flex gap-2 items-center justify-center rounded border-solid border-2 border-black py-2 cursor-pointer w-1/5 bg-black hover:rounded-lg"
      onClick={onClick}
    >
      <FcGoogle size={"1.5rem"} />
      <p className="font-medium text-white">Continue w/ Google</p>
    </div>
  ) : (
    <div
      className="flex gap-2 items-center justify-center rounded border-solid border-2 border-black py-2 w-full cursor-pointer"
      onClick={onClick}
    >
      <FcGoogle size={"1.5rem"} />
      <p className="font-medium">Continue with Google</p>
    </div>
  );
}

GoogleSignUpButton.defaultProps = {
  onClick: () => {},
  type: "primary",
};
