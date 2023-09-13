import React from "react";
import Button from "./Button";

export default function SettingsCard({
  title,
  save,
  children,
  onSubmit,
  loading,
}) {
  return (
    <div className="border-solid border-2 border-light_gray rounded-md ">
      <div className="border-solid border-b-2 p-4 border-light_gray bg-dark_white font-semibold">
        {title}
      </div>
      <form className="p-4" onSubmit={(e) => onSubmit(e)}>
        {children}
        {save && (
          <div className="border-solid border-t-2 border-light_gray mt-3">
            <Button isLoading={loading}>Save</Button>
          </div>
        )}
      </form>
    </div>
  );
}

SettingsCard.defaultProps = {
  title: "",
  save: true,
  onSubmit: (e) => {
    e.preventDefault();
  },
};
