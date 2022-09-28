import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function Message({ type, children, message }) {
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [children]);

  return type === "owner" ? (
    <div className="flex flex-row-reverse" ref={ref}>
      <div className="w-4/5 p-2 text-right">
        <div className={"bg-light_green p-3 rounded-l-2xl rounded-tr-2xl"}>
          <p className="">{children}</p>
        </div>
        <p></p>
      </div>
    </div>
  ) : (
    <div className="w-4/5 p-2" ref={ref}>
      <div className={"bg-light_gray p-3 rounded-r-2xl rounded-tl-2xl"}>
        <p className="">{children}</p>
      </div>
      <p></p>
    </div>
  );
}

Message.defaultProps = {
  type: "",
  children: "Lorem ipsum dolor ",
};
