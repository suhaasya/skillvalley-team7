import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignUpButton({ onClick }) {
  return (
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
};
