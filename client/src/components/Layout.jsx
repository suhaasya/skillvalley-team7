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
      <main className="flex md:px-[5%] lg:px-[12%] bg-[#F6F8FA] h-[91.5vh]">
        <Sidebar
          home={home}
          bookmarks={bookmarks}
          messages={messages}
          profile={profile}
        />
        <section className="bg-[#FAFBFC] w-full px-[2%] lg:w-4/5 border-solid border-x-2 border-[#E1E4E8] overflow-y-scroll">
          {children}
        </section>
      </main>
      <Footer />
    </section>
  );
}
