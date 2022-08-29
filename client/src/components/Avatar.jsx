import React from "react";

export default function Avatar({ name, bgcolor }) {
  const style = {
    backgroundColor: bgcolor,
  };

  return (
    <div className="avatar placeholder">
      <div className={`text-neutral-content rounded-full w-11`} style={style}>
        <span className="text-2xl">{name}</span>
      </div>
    </div>
  );
}

Avatar.defaultProps = {
  name: "Unknown",
  bgcolor: "#212121",
};
