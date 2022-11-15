import React from "react";

export default function Avatar({ name, bgcolor, type, imgSrc, onClick, id }) {
  const style = {
    backgroundColor: bgcolor,
  };

  return (
    <div
      className={`text-neutral-content rounded-full ${
        type === "secondary" ? "w-44 h-44" : "w-11 h-11"
      } flex items-center justify-center p-6`}
      style={style}
      onClick={() => onClick(id)}
    >
      {imgSrc ? (
        <img src={imgSrc} alt="Profile" className="rounded-full"></img>
      ) : (
        <span className={`${type === "secondary" ? "text-8xl" : "text-2xl"} `}>
          {name}
        </span>
      )}
    </div>
  );
}

Avatar.defaultProps = {
  name: "UU",
  bgcolor: "#212121",
  type: "primary",
};
