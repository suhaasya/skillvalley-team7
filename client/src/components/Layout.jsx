import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({
  children,
  home,
  bookmarks,
  messages,
  profile,
}) {
  return (
    <section className="">
      <Navbar />
      <main className="flex md:px-[5%] lg:px-[11%] bg-dark_white h-[90.7vh]">
        <Sidebar
          home={home}
          bookmarks={bookmarks}
          messages={messages}
          profile={profile}
        />
        <section className="bg-white w-full lg:w-4/5 border-solid border-x-2 border-light_gray overflow-y-scroll">
          {children}
        </section>
      </main>
      <Footer
        home={home}
        bookmarks={bookmarks}
        messages={messages}
        profile={profile}
      />
    </section>
  );
}
