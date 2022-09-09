import React from "react";

export default function FormContainer({ children, onSubmit }) {
  return (
    <section className="h-screen bg-dark_white flex items-center">
      <section className="container max-w-screen-sm mx-auto h-4/5 p-[1%] sm:px-[5%]">
        <form
          className="flex flex-col gap-8 border-solid border-2 border-black p-8 rounded bg-white"
          onSubmit={onSubmit}
        >
          {children}
        </form>
      </section>
    </section>
  );
}

FormContainer.defaultProps = {
  onSubmit: (e) => {},
};
