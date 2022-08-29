import React from "react";

export default function Avatar({ name, bgcolor }) {
  const style = {
    backgroundColor: bgcolor,
  };

  return (
    <div class="avatar placeholder">
      <div class={`text-neutral-content rounded-full w-11`} style={style}>
        <span class="text-2xl">{name}</span>
      </div>
    </div>
  );
}
