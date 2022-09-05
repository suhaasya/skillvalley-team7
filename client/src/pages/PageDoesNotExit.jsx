import React from "react";

export default function PageDoesNotExit() {
  return (
    <section className="bg-dark_white ">
      <div className="container mx-auto max-w-screen-xl text-center">
        <div className="flex flex-col items-center justify-center min-h-screen ">
          <h1 className="text-8xl text-red">404</h1>
          <h3 className="text-xl font-medium">Sorry, page not found.</h3>
          <p className="text-gray font-light">
            The page you are looking for was moved,
            <br /> removed, renamed or might never existed!
          </p>
        </div>
      </div>
    </section>
  );
}
